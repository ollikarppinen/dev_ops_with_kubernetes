#!/bin/bash

docker build --tag dummysite --build-arg DUMMY_SITE_URL="${DUMMY_SITE_URL}" .
docker tag dummysite ollikarppinen/dummysite

docker run -p 3000:3000 dummysite
