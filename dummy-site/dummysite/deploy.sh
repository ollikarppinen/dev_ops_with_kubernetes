#!/bin/bash

docker build --tag dummysite .
docker tag dummysite ollikarppinen/dummysite

docker run -p 3000:3000 dummysite
