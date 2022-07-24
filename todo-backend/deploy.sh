#!/bin/bash

if [ -z "$BUILD" ]
then
  echo "Skipping build..."
else
  echo "Building..."
  docker buildx build --push --tag ollikarppinen/todo-backend --platform linux/arm/v7,linux/arm64/v8,linux/amd64 .
fi

export SOPS_AGE_KEY_FILE=../key.txt
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -

kubectl apply -f manifests/postgres-svc.yaml
kubectl apply -f manifests/postgres-statefulset.yaml

kubectl exec -it -n todo statefulsets/postgres-ss -- psql -U postgres -d postgres -c "CREATE TABLE todos (created_at TIMESTAMP NOT NULL, description TEXT NOT NULL)"

kubectl apply -k .
