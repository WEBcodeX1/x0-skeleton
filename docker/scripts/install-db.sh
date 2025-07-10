#!/bin/sh

/root/start-postgresql.sh &

sleep 20

BASEDIR="/var/lib/x0"
DB_SU_PWD=$(${BASEDIR}/sys/get-pg-pass.py su)
psql -U postgres -c "ALTER ROLE postgres WITH ENCRYPTED PASSWORD '${DB_SU_PWD}' LOGIN"

# create system database
/var/lib/x0/app-setup/bin/create-sys-db.sh yourdb 127.0.0.1

# copy webui text from x0 to new db
psql -U postgres -d yourdb -c "DELETE FROM webui.text;"
pg_dump -a -t webui.text -U postgres -d x0 | psql -U postgres -d yourdb

# execute sql scripts
var/lib/x0/app-setup/bin/init-app-db.sh yourdb 127.0.0.1
