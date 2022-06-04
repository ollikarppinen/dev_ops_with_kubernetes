#!/bin/bash

docker build --tag string-generator .
docker tag string-generator ollikarppinen/string-generator
docker push ollikarppinen/string-generator

kubectl create deployment string-generator --image=ollikarppinen/string-generator
sleep 30
kubectl logs deployment/string-generator >> logs.txt
kubectl delete deployment string-generator
