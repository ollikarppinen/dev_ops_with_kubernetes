#!/bin/bash

docker build --tag log-output .
docker tag log-output ollikarppinen/log-output
docker push ollikarppinen/log-output

kubectl delete deployments.apps/log-output
kubectl apply -f manifests/
kubectl logs deployments.apps/log-output -f
