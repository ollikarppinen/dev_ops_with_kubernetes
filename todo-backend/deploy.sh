#!/bin/bash

docker build --tag todo-backend .
docker tag todo-backend ollikarppinen/todo-backend
docker push ollikarppinen/todo-backend

kubectl delete deployments.apps/todo-backend-dep
kubectl apply -f manifests/
kubectl logs deployments/todo-backend-dep -f
