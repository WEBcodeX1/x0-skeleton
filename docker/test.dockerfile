FROM ubuntu:22.04

MAINTAINER Your Name

ARG DEBIAN_FRONTEND=noninteractive

ARG APP_DEB_FILE=your-app-test_0.1_all.deb

COPY ./x0-skeleton/docker/tmp/apt-sources.list /etc/apt/sources.list

COPY ./$APP_DEB_FILE ./

RUN rm /var/lock
RUN mkdir -p /var/lock/

RUN apt-get update -y

RUN TZ="Europe/Berlin" apt-get -qq install -y tzdata locales

RUN apt-get -qq install -y ./$APP_DEB_FILE

CMD /var/lib/x0/test/run-pytest.sh
