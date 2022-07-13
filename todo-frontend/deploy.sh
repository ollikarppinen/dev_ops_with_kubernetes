#!/bin/bash

docker buildx build --push --tag gcr.io/dev-ops-with-kubernetes/todo-frontend --platform linux/arm/v7,linux/arm64/v8,linux/amd64 .

kubectl apply -k .
