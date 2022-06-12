#!/bin/bash

docker build --tag todo .
docker tag todo ollikarppinen/todo
docker push ollikarppinen/todo

kubectl delete deployments.apps/todo-dep
kubectl apply -f manifests/
kubectl logs deployments/todo-dep -f