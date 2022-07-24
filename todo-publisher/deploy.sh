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

kubectl apply -k .
