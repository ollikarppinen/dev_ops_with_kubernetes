#!/bin/bash

kubectl apply -f manifests/deployment.yaml
sleep 10
kubectl logs deployment/todo >> e-4-logs.txt
kubectl get pods >> e-4-pods.txt
kubectl delete deployment todo
