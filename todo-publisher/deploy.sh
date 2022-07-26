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
# sops --encrypt --age age1k6608d8pzlhz0ffh8tlnax4mj0g7q4f3wggd68el69ruyhaegv0s9f5e9n manifests/secret.yaml > manifests/secret.enc.yaml
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -

kubectl apply -k .
