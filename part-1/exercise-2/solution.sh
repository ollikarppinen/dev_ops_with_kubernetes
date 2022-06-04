#!/bin/bash

docker build --tag todo-1 .
docker tag todo-1 ollikarppinen/todo-1
docker push ollikarppinen/todo-1

kubectl create deployment todo-1 --image=ollikarppinen/todo-1

sleep 20
kubectl logs deployment/todo-1 >> logs.txt
kubectl get pods >> pods.txt

kubectl delete deployment todo-1
