#!/bin/bash

kubectl apply -f manifests/deployment.yaml
sleep 30
kubectl logs deployment/string-generator >> e-3.txt
kubectl delete deployment string-generator
