#!/bin/bash

if [ -z "$BUILD" ]
then
  echo "Skipping build..."
else
  echo "Building..."
  # docker buildx build --push --tag ollikarppinen/todo-frontend --platform linux/arm/v7,linux/arm64/v8,linux/amd64 .
  docker build --tag todo-frontend .
  docker tag todo-frontend ollikarppinen/todo-frontend
  docker push ollikarppinen/todo-frontend
fi

kubectl apply -k .
