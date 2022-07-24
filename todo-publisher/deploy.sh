#!/bin/bash

if [ -z "$BUILD" ]
then
  echo "Skipping build..."
else
  echo "Building..."
  docker build --tag todo-publisher .
  docker tag todo-publisher ollikarppinen/todo-publisher
  image=ollikarppinen/todo-publisher:"$(git rev-parse --short HEAD)"
  docker tag todo-publisher "$image"
  docker push "$image"
  kustomize edit set image PROJECT/IMAGE="$image"
fi

export SOPS_AGE_KEY_FILE=../key.txt
# sops --encrypt --age agePUBLIC_KEY manifests/secret.yaml > manifests/secret.enc.yaml
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -

kubectl apply -k .
