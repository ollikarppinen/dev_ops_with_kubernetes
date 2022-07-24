#!/bin/bash

kubectl create namespace todo

kubectl apply -f manifests/todo-pv.yaml
kubectl apply -f manifests/todo-pv-claim.yaml
kubectl apply -f manifests/todo-analysistemplate.yaml
kubectl apply -f manifests/todo-ingress.yaml

# (cd todo-backend && . deploy.sh)
# (cd todo-frontend && . deploy.sh)
