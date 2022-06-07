#!/bin/bash

docker build --tag log-output .
docker tag log-output ollikarppinen/log-output
docker push ollikarppinen/log-output

kubectl apply -f manifests/
