#!/bin/sh

docker stop your-app
docker stop your-db

docker container prune -f
