#!/bin/bash

gcloud container clusters create dev-ops-with-kubernetes-cluster --zone=europe-north1-b --cluster-version=1.22
kubectl create namespace todo
kubectl create namespace log