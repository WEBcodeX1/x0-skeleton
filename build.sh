#/bin/sh

cd ./debian && debuild
cd ../docker && ./build-all.sh
./x0-start-containers.sh

