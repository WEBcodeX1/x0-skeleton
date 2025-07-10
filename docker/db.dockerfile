FROM ghcr.io/webcodex1/x0-db:latest
MAINTAINER Your Name

COPY ./x0-skeleton/docker/tmp/environment-db.sh ./environment.sh
COPY ./x0-skeleton/docker/scripts/start-postgresql.sh ./root/
COPY ./x0-skeleton/docker/scripts/install-db.sh ./root/
COPY ./x0-skeleton/database/*.sql /var/lib/x0/app-setup/database/
COPY ./x0-skeleton/config/app-config.json /var/lib/x0/config/
COPY ./x0-skeleton/config/postgresql/pg_hba.conf /var/lib/postgresql/16/main/pg_hba.conf

RUN /root/install-db.sh
