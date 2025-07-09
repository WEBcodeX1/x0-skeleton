#/bin/sh

PATH_DB="./database"
PATH_DOCKER="./docker"
PATH_METADATA="./x0-config"
PATH_BACKEND="./x0-backend"
PATH_JS="./x0-objects"

PATH_DST_PREFIX="../.."
PATH_DST_METADATA="www/static"
PATH_DST_BACKEND="www/python"
PATH_DST_JS="www/x0"

# remove existing
rm ${PATH_DST_PREFIX}/${PATH_DB}/*.sql
rm ${PATH_DST_PREFIX}/${PATH_DST_METADATA}/*.json
rm ${PATH_DST_PREFIX}/${PATH_DST_BACKEND}/*.py
rm ${PATH_DST_PREFIX}/${PATH_DST_JS}/*.js

# copy / activate from example 
cp ${PATH_DB}/* ${PATH_DST_PREFIX}/${PATH_DB}/
cp ${PATH_METADATA}/* ${PATH_DST_PREFIX}/${PATH_DST_METADATA}/
cp ${PATH_JS}/* ${PATH_DST_PREFIX}/${PATH_DST_JS}/

cp ${PATH_DST_PREFIX}/${PATH_DOCKER}/app.dockerfile.default ${PATH_DST_PREFIX}/${PATH_DOCKER}/app.dockerfile 

# build / run container
cd ../../ && ./build.sh

