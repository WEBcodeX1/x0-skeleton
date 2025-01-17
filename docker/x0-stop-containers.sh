#!/bin/sh

docker stop your-app
docker stop your-app-db

docker container prune -f
