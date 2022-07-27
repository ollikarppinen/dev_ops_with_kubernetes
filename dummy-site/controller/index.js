const k8s = require("@kubernetes/client-node");
const mustache = require("mustache");
const request = require("request");
const JSONStream = require("json-stream");
const fs = require("fs").promises;

const kc = new k8s.KubeConfig();

process.env.NODE_ENV === "development"
  ? kc.loadFromDefault()
  : kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const sendRequestToApi = async (api, method = "get", options = {}) =>
  new Promise((resolve, reject) =>
    request[method](
      `${kc.getCurrentCluster().server}${api}`,
      { ...opts, ...options, headers: { ...options.headers, ...opts.headers } },
      (err, res) => (err ? reject(err) : resolve(JSON.parse(res.body)))
    )
  );

const fieldsFromDummySite = (object) => ({
  dummysite_name: object.metadata.name,
  container_name: object.metadata.name,
  deployment_name: `${object.metadata.name}-deployment`,
  namespace: object.metadata.namespace,
  website_url: object.spec.website_url,
});

const renderDeploymentYaml = async (fields) => {
  const deploymentTemplate = await fs.readFile("deployment.mustache", "utf-8");
  return mustache.render(deploymentTemplate, fields);
};

// const exampleFields = {
//   dummysite_name: "dummysite-hs",
//   container_name: "dummysite-hs",
//   deployment_name: `dummysite-hs-deployment`,
//   namespace: "default",
//   website_url: "https://hs.fi",
// };

// renderDeploymentYaml(exampleFields);

// const fieldsFromDeployment = (object) => ({
//   dummysite_name: object.metadata.labels.app,
//   container_name: object.metadata.labels.app,
//   deployment_name: `${object.metadata.labels.app}-deployment`,
//   namespace: object.metadata.namespace,
// });

const opts = {};
// kc.applyToRequest(opts);

const createDeployment = async (fields) => {
  console.log(
    "Creating new deployment for website: ",
    fields.length,
    "to namespace",
    fields.namespace
  );

  const yaml = await getJobYAML(fields);

  return sendRequestToApi(
    `/apis/batch/v1/namespaces/${fields.namespace}/jobs`,
    "post",
    {
      headers: {
        "Content-Type": "application/yaml",
      },
      body: yaml,
    }
  );
};

const removeJob = async ({ namespace, job_name }) => {
  const pods = await sendRequestToApi(`/api/v1/namespaces/${namespace}/pods/`);
  pods.items
    .filter((pod) => pod.metadata.labels["job-name"] === job_name)
    .forEach((pod) => removePod({ namespace, pod_name: pod.metadata.name }));

  return sendRequestToApi(
    `/apis/batch/v1/namespaces/${namespace}/jobs/${job_name}`,
    "delete"
  );
};

const removeCountdown = ({ namespace, countdown_name }) =>
  sendRequestToApi(
    `/apis/stable.dwk/v1/namespaces/${namespace}/countdowns/${countdown_name}`,
    "delete"
  );

const removePod = ({ namespace, pod_name }) =>
  sendRequestToApi(
    `/api/v1/namespaces/${namespace}/pods/${pod_name}`,
    "delete"
  );

const run = async () => {
  // (await client.listPodForAllNamespaces()).body; // A bug in the client(?) was fixed by sending a request and not caring about response

  /**
   * Watch Countdowns
   */

  const dummySiteStream = new JSONStream();

  dummySiteStream.on("data", async ({ type, object }) => {
    console.log("dummySiteStream received data");
    console.log(type, object);
    const fields = fieldsFromDummySite(object);
    console.log(fields);

    if (type === "ADDED") {
      console.log("Create deployment");
      // if (await jobForCountdownAlreadyExists(fields)) return; // Restarting application would create new 0th jobs without this check
      // createJob(fields);
    }
    if (type === "DELETED") {
      console.log("Delete deployment");
      // cleanupForCountdown(fields);
    }
  });

  request
    .get(
      `${
        kc.getCurrentCluster().server
      }/apis/stable.dwk/v1/dummysites?watch=true`,
      opts
    )
    .pipe(dummySiteStream);

  /**
   * Watch Jobs
   */

  // const deploymentStream = new JSONStream();

  // deploymentStream.on("data", async ({ type, object }) => {
  //   console.log("deploymentStream received data");
  //   console.log(type, object);

  //   if (!object.metadata.labels.website_url) return;
  //   if (type === "DELETED" || object.metadata.deletionTimestamp) return;
  //   if (!object?.status?.succeeded) return;

  //   rescheduleJob(object);
  // });

  // request
  //   .get(
  //     `${kc.getCurrentCluster().server}/apis/batch/v1/deployments?watch=true`,
  //     opts
  //   )
  //   .pipe(deploymentStream);
};

run();
