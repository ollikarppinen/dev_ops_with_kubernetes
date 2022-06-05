#!/bin/bash

docker build --tag todo .
docker tag todo ollikarppinen/todo
docker push ollikarppinen/todo

kubectl create deployment todo --image=ollikarppinen/todo

sleep 20
kubectl logs deployment/todo >> e-2-logs.txt
kubectl get pods >> e-2-pods.txt

kubectl delete deployment todo
