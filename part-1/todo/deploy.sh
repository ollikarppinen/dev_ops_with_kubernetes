#!/bin/bash

docker build --tag todo .
docker tag todo ollikarppinen/todo
docker push ollikarppinen/todo

kubectl apply -f manifests/deployment.yaml
