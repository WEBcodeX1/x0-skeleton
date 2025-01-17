FROM x0-app:latest
MAINTAINER Your Name

ARG DEB_FILE=x0app-data_0.1_all.deb

COPY ./x0-skeleton/docker/tmp/environment-db.sh ./environment.sh

COPY ./$DEB_FILE ./

RUN apt-get -qq install -y ./$DEB_FILE

RUN /usr/bin/python3 /var/lib/x0/app-setup/bin/ProcessVhosts.py
RUN /var/lib/x0/app-setup/bin/fs-permissions.sh
