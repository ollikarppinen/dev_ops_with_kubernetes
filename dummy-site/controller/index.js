const k8s = require("@kubernetes/client-node");
const fs = require("fs").promises;

const MYCUSTOMRESOURCE_GROUP = "foo.bar";
const MYCUSTOMRESOURCE_VERSION = "v1";
const MYCUSTOMRESOURCE_PLURAL = "dummysites";
const NAMESPACE = "default";

const kc = new k8s.KubeConfig();
process.env.NODE_ENV === "development"
  ? kc.loadFromDefault()
  : kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

const watch = new k8s.Watch(kc);

const getDeploymentObject = async (obj) => {
  const deploymentTemplate = await fs.readFile("deployment.json", "utf-8");
  const newDeployment = JSON.parse(deploymentTemplate);

  newDeployment.metadata.name = `${obj.metadata.name}-deployment`;
  newDeployment.metadata.namespace = obj.metadata.namespace;
  newDeployment.spec.selector.matchLabels["app"] = obj.metadata.name;
  newDeployment.spec.template.metadata.labels["app"] = obj.metadata.name;
  newDeployment.spec.template.spec.containers[0]["name"] = obj.metadata.name;
  newDeployment.spec.template.spec.containers[0].env[0]["value"] =
    obj.spec.website_url;

  return newDeployment;
};

const createDeployment = async (obj) => {
  const deployment = await getDeploymentObject(obj);
  console.log("Creating deployment:", deployment);
  k8sApi.createNamespacedDeployment(NAMESPACE, deployment);
};

const deleteResource = (obj) => {
  console.log(`Deleted ${obj.metadata.name}`);
  return k8sApi.deleteNamespacedDeployment(
    `${obj.metadata.name}-deployment`,
    NAMESPACE
  );
};

const handleEvent = async (type, apiObj) => {
  console.log(`Received event in type ${type}.`);
  console.log(apiObj);
  if (type == "ADDED") {
    await createDeployment(apiObj);
  } else if (type == "DELETED") {
    await deleteResource(apiObj);
  } else {
    console.log(`Unknown event type: ${type}`);
  }
};

const onDone = (err) => {
  console.log(`Connection closed. ${err}`);
  watchResource();
};

const watchResource = async () => {
  console.log("Watching resource");
  return watch.watch(
    `/apis/${MYCUSTOMRESOURCE_GROUP}/${MYCUSTOMRESOURCE_VERSION}/namespaces/${NAMESPACE}/${MYCUSTOMRESOURCE_PLURAL}`,
    {},
    handleEvent,
    onDone
  );
};

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

const main = async () => await watchResource();

main();
