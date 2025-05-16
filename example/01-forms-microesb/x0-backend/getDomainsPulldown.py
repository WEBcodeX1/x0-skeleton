import sys
import json

import DB
import dbpool.pool

import POSTData

config = {
    'db': {
        'host': 'mypostgres',
        'name': 'hosting-example',
        'user': 'postgres',
        'pass': 'changeme',
        'ssl': 'disable',
        'connect_timeout': 30,
        'connection_retry_sleep': 1,
        'query_timeout': 30000,
        'session_tmp_buffer': 128
    },
    'groups': {
        'hosting': {
            'connection_count': 3,
            'autoommit': True,
        }
    }
}

dbpool.pool.Connection.init(config)


def application(environ, start_response):

    start_response('200 OK', [('Content-Type', 'application/json; charset=UTF-8')])

    if environ['REQUEST_METHOD'].upper() == 'POST':

        Result = []

        sql = """SELECT "name" || '.' || ending AS domain_name FROM sys_core.domain ORDER BY "name" ASC"""
        sql_params = {}
        with dbpool.pool.Handler('hosting') as db:
            for Record in db.query(sql, sql_params):
                Row = {}
                Row['Display'] = Record['domain_name']
                Row['Value'] = Record['domain_name']
                Result.append(Row)

        yield bytes(json.dumps(Result), 'utf-8')
