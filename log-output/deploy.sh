#!/bin/bash

kubectl create namespace log

docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --tag ollikarppinen/log-output .

kubectl apply -f manifests/
