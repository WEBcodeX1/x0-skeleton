#!/bin/sh

/root/start-postgresql.sh &

sleep 10

BASEDIR="/var/lib/x0"
DB_SU_PWD=$(${BASEDIR}/sys/get-pg-pass.py su)
psql -U postgres -c "ALTER ROLE postgres WITH ENCRYPTED PASSWORD '${DB_SU_PWD}' LOGIN"

/var/lib/x0/app-setup/bin/create-sys-db.sh yourdb 127.0.0.1
/var/lib/x0/app-setup/bin/init-app-db.sh yourdb 127.0.0.1
