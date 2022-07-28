#!/bin/bash

docker build --tag dummysite-controller .
docker tag dummysite-controller ollikarppinen/dummysite-controller
docker push ollikarppinen/dummysite-controller

kubectl delete deployments.apps dummysite-controller-dep
kubectl apply -f ../manifests/deployment.yaml
