#!/bin/bash

kubectl create namespace log

docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --tag ollikarppinen/ping-pong .


kubectl apply -f ../manifests/log-pv.yaml
kubectl apply -f ../manifests/log-pv-claim.yaml

export SOPS_AGE_KEY_FILE=../key.txt
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -
kubectl apply -f manifests/postgres-statefulset.yaml
kubectl apply -f manifests/postgres-svc.yaml
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
