#!/bin/bash

docker build --tag ping-pong .
docker tag ping-pong ollikarppinen/ping-pong
docker push ollikarppinen/ping-pong

kubectl apply -f manifests/
