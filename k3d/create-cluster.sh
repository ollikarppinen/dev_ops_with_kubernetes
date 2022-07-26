#!/bin/bash

k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2

# docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube/todo
# docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube/log

# . k3d/deploy-prometheus.sh

# kubectl create namespace argo-rollouts
# kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
