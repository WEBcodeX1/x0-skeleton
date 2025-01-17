#!/bin/bash

workdir="$(echo $PWD)"

. ./scripts/get-env.sh

cd ../../
docker build -t your-app ${CMDLINE_ADD_HOST} --file ./x0-skeleton/docker/app.dockerfile .
cd ${workdir}
