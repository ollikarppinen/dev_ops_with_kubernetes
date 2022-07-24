#!/bin/bash

if [ -z "$BUILD" ]
then
  echo "Skipping build..."
else
  echo "Building..."
  # docker buildx build --push --tag ollikarppinen/todo-frontend --platform linux/arm/v7,linux/arm64/v8,linux/amd64 .
  docker build --tag todo-frontend .
  docker tag todo-frontend ollikarppinen/todo-frontend
  image=ollikarppinen/todo-frontend:"$(git rev-parse --short HEAD)"
  docker tag todo-backend "$image"
  docker push "$image"
  kustomize edit set image PROJECT/IMAGE="$image"
fi

kubectl apply -k .
