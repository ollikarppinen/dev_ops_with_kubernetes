#!/bin/bash

docker build --tag todo-frontend .
docker tag todo-frontend ollikarppinen/todo-frontend
docker push ollikarppinen/todo-frontend

kubectl delete deployments.apps/todo-frontend-dep
kubectl apply -f manifests/
kubectl logs deployments/todo-frontend-dep -f