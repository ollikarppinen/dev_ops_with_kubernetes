#!/bin/bash

docker build --tag dummysite-controller .
docker tag dummysite-controller ollikarppinen/dummysite-controller
docker push
