#!/bin/sh

# stop containers, clean up
./x0-stop-containers.sh

# start x0-db container
docker run -d --name your-app-db --net x0-connect --ip 172.20.0.20 -p 5432:5432 your-app-db

# start your-app container
docker run -d -\
-name your-app \
--add-host=mypostgres:172.20.0.20 \
--net x0-connect \
--ip 172.20.0.10 \
-p 80:80 -p 443:443 your-app
