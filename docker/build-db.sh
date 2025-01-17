#!/bin/bash

workdir="$(echo $PWD)"

. ./scripts/get-env.sh

cd ../../
docker build -t x0app-db ${CMDLINE_ADD_HOST} --file ./x0-skeleton/docker/db.dockerfile .
cd ${workdir}
