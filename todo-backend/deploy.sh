#!/bin/bash

if [ -z "$BUILD" ]
then
  echo "Skipping build..."
else
  echo "Building..."
  docker build --tag todo-backend .
  docker tag todo-backend ollikarppinen/todo-backend
  image=ollikarppinen/todo-backend:"$(git rev-parse --short HEAD)"
  docker tag todo-backend "$image"
  docker push "$image"
  kustomize edit set image PROJECT/IMAGE="$image"
  # docker buildx build --push --tag ollikarppinen/todo-backend --platform linux/arm/v7,linux/arm64/v8,linux/amd64 .
fi

export SOPS_AGE_KEY_FILE=../key.txt
sops --decrypt manifests/secret.enc.yaml | kubectl apply -f -

kubectl apply -f manifests/postgres-svc.yaml
kubectl apply -f manifests/postgres-statefulset.yaml

kubectl exec -it -n todo statefulsets/postgres-ss -- psql -U postgres -d postgres -c "CREATE TABLE todos (id SERIAL PRIMARY KEY, created_at TIMESTAMP NOT NULL, description TEXT NOT NULL, done BOOLEAN DEFAULT FALSE NOT NULL)"
# kubectl exec -it -n todo statefulsets/postgres-ss -- psql -U postgres -d postgres -c "ALTER TABLE todos ADD done BOOLEAN DEFAULT FALSE NOT NULL"

kubectl apply -k .
