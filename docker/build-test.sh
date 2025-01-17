#!/bin/bash

workdir="$(echo $PWD)"

. ./scripts/get-env.sh

cd ../../
docker build -t x0app-test ${CMDLINE_ADD_HOST} --file ./x0-skeleton/docker/test.dockerfile .
cd ${workdir}
