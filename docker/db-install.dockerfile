FROM ghcr.io/webcodex1/x0-db-install-tpl:latest
MAINTAINER Your Name

ARG APP_DEB_FILE=x0-skeleton-db-install_0.1_all.deb

COPY ./x0-skeleton/docker/tmp/apt-sources.list /etc/apt/sources.list
COPY ./x0-skeleton/docker/tmp/environment-db.sh ./environment.sh

COPY ./$APP_DEB_FILE ./

RUN apt-get update -y

RUN apt-get -qq install -y ./$APP_DEB_FILE
