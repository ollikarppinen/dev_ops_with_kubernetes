#!/bin/bash

kubectl create namespace log

if [ -z "$BUILD" ]
then
  echo "Skipping build..."
else
  docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --tag ollikarppinen/ping-pong .
fi


kubectl apply -f ../manifests/log-pv.yaml
kubectl apply -f ../manifests/log-pv-claim.yaml

export SOPS_AGE_KEY_FILE=../key.txt
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -
kubectl apply -f manifests/postgres-statefulset.yaml
kubectl apply -f manifests/postgres-svc.yaml
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml

kubectl exec -it -n log statefulsets/postgres-ss -- psql -U postgres -d postgres -c "CREATE TABLE IF NOT EXISTS pingpongs (created_at TIMESTAMP NOT NULL)"
