#!/bin/sh

RANDOM_STRING=$(uuidgen)

while :
do
  echo "$(TZ=GMT date +"%Y-%m-%dT%H:%M:%SZ"): $RANDOM_STRING"
  sleep 5
done
