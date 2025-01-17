#!/bin/sh

docker stop spxcomserver-app
docker stop spxcomserver-db

docker stop x0-app
docker stop x0-db

docker container prune -f
