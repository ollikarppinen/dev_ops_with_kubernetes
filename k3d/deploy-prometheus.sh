#!/bin/bash

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable

kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus

# kubectl -n prometheus port-forward statefulsets/prometheus-kube-prometheus-stack-1658-prometheus 9090:9090
