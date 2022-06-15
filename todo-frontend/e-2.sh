#!/bin/bash

docker build --tag todo-frontend .
docker tag todo-frontend ollikarppinen/todo-frontend
docker push ollikarppinen/todo-frontend

kubectl create deployment todo-frontend --image=ollikarppinen/todo-frontend

sleep 20
kubectl logs deployment/todo-frontend >> e-2-logs.txt
kubectl get pods >> e-2-pods.txt

kubectl delete deployment todo-frontend
