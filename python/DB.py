import os
import time
import json

from datetime import datetime


DBName = 'yourdb'
DBUser = 'x0'
DBHost = 'mypostgres'
DBPass = os.environ['PSQL_x0_PWD']

config = {
    'db': {
        'host': DBHost,
        'name': DBName,
        'user': DBUser,
        'pass': DBPass,
        'ssl': 'disable',
        'connect_timeout': 4,
        'connection_retry_sleep': 1,
        'query_timeout': 5000,
        'session_tmp_buffer': 128
    },
    'groups': {
        'x0': {
            'connection_count': 2,
            'autocommit': True,
        },
        'clickit': {
            'connection_count': 3,
            'autocommit': True,
        }
    }
}

config_ac_disabled = {
    'db': {
        'host': DBHost,
        'name': DBName,
        'user': DBUser,
        'pass': DBPass,
        'ssl': 'disable',
        'connect_timeout': 4,
        'connection_retry_sleep': 1,
        'query_timeout': 5000,
        'session_tmp_buffer': 128
    },
    'groups': {
        'x0noac': {
            'connection_count': 2,
            'autocommit': True,
        },
        'clickitnoac': {
            'connection_count': 3,
            'autocommit': False,
        }
    }
}
