#!/bin/bash

docker build --tag todo-backend .
docker tag todo-backend ollikarppinen/todo-backend
docker push ollikarppinen/todo-backend

kubectl delete -n todo deployments.apps/todo-backend-dep

kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/postgres-svc.yaml
kubectl apply -f manifests/postgres-statefulset.yaml
kubectl apply -f manifests/service.yaml

export SOPS_AGE_KEY_FILE=../key.txt
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -