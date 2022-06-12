#!/bin/bash

kubectl apply -f manifests/deployment.yaml
sleep 30
kubectl logs deployment/log-output >> e-3.txt
kubectl delete deployment log-output
