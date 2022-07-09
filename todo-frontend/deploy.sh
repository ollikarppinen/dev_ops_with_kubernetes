#!/bin/bash

# docker build --tag todo-frontend .
# docker tag todo-frontend ollikarppinen/todo-frontend
# docker push ollikarppinen/todo-frontend

docker buildx build --push --tag ollikarppinen/todo-frontend --platform linux/arm/v7,linux/arm64/v8,linux/amd64 .

# kubectl delete deployments.apps/todo-frontend-dep
kubectl apply -f manifests/
# kubectl logs deployments/todo-frontend-dep -f