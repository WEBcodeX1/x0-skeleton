#!/bin/sh

docker stop x0-app
docker stop x0-app-db

docker container prune -f
