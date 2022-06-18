#!/bin/bash

docker build --tag ping-pong .
docker tag ping-pong ollikarppinen/ping-pong
docker push ollikarppinen/ping-pong

kubectl delete -n log deployments.apps/ping-pong-dep
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml

export SOPS_AGE_KEY_FILE=../key.txt
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -