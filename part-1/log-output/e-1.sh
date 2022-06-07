#!/bin/bash

docker build --tag log-output .
docker tag log-output ollikarppinen/log-output
docker push ollikarppinen/log-output

kubectl create deployment log-output --image=ollikarppinen/log-output
sleep 30
kubectl logs deployment/log-output >> e-1.txt
kubectl delete deployment log-output
