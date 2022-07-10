#!/bin/bash

kubectl create namespace todo

kubectl apply -f manifests/todo-pv.yaml
kubectl apply -f manifests/todo-pv-claim.yaml

(cd todo-backend && . deploy.sh)
(cd todo-frontend && . deploy.sh)

kubectl apply -f manifests/todo-ingress.yaml
