import psycopg2

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
            'autocommit': False,
        }
    }
}

dbpool.pool.Connection.init(config)

sys.path.append('/var/www/vhosts/x0-skeleton/python/')

from microesb import microesb


class_reference = {
    'User': {
        'property_ref': 'User',
        'children': {
            'Domain': {
                'property_ref': 'Domain',
                'children': {
                    'Host': {
                        'property_ref': 'Host'
                    }
                }
            }
        }
    }
}

class_mapping = {
    'User': 'User',
    'Domain': 'Domain',
    'Host': 'Host'
}

service_properties = {
    'User': {
        'properties': {
            'name': {
                'type': 'str',
                'default': None,
                'required': True,
                'description': 'Textual UserID'
            },
            'dbcon': {
                'type': 'classref',
                'default': None,
                'required': True,
                'description': 'Database Connection Ref'
            }
        },
        'methods': ['init']
    },
    'Domain': {
        'properties': {
            'name': {
                'type': 'str',
                'default': None,
                'required': True,
                'description': 'Domain Name'
            },
            'ending': {
                'type': 'str',
                'default': None,
                'required': True,
                'description': 'Domain Ending'
            }
        },
        'methods': ['add', 'delete']
    },
    'Host': {
        'properties': {
            'name': {
                'type': 'str',
                'default': None,
                'required': False,
                'description': 'DNS Name'
            },
            'type': {
                'type': 'str',
                'default': None,
                'required': True,
                'description': 'DNS Type'
            },
            'value': {
                'type': 'str',
                'default': None,
                'required': True,
                'description': 'DNS Value'
            },
            'ttl': {
                'type': 'int',
                'default': 3600,
                'required': False,
                'description': 'DNS Time To Live'
            },
            'priority': {
                'type': 'int',
                'default': None,
                'required': False,
                'description': 'MX Type Priority'
            }
        },
        'methods': ['add', 'update', 'delete']
    }
}

class_mapper = microesb.ClassMapper(
    class_references=class_reference,
    class_mappings=class_mapping,
    class_properties=service_properties
)


def application(environ, start_response):

    start_response('200 OK', [('Content-Type', 'application/json; charset=UTF-8')])

    if environ['REQUEST_METHOD'].upper() == 'POST':

        result = {}

        service_json = json.loads(POSTData.Environment.getPOSTData(environ))
        data_req = service_json['RequestData']

        with dbpool.Handler('hosting') as dbcon:

            service_metadata = {
                'SYSServiceID': 'insertUserDomain',
                'data': [
                    {
                        'User':
                        {
                            'SYSServiceMethod': 'init',
                            'name': data_req['HostingNewHostsSelectedUser']['UserID']
                        }
                    }
                ]
            }

            domain_full = data_req['HostingNewHostsSelectedDomain']['DomainPulldown']
            domain_split = domain_full.split('.')

            service_metadata['data'][0]['User']['dbcon'] = dbcon
            service_metadata['data'][0]['User']['Domain'] = {}

            service_metadata['data'][0]['User']['Domain']['SYSServiceMethod'] = 'add'
            service_metadata['data'][0]['User']['Domain']['name'] = domain_split[0]
            service_metadata['data'][0]['User']['Domain']['ending'] = domain_split[1]

            service_metadata['data'][0]['User']['Domain']['Host'] = []

            for rec in data_req['HostingNewHostsList']:

                HostItem = {}
                HostItem['SYSServiceMethod'] = 'add'
                HostItem['name'] = rec['RecordName']
                HostItem['type'] = rec['RecordType']
                HostItem['value'] = rec['RecordValue']
                HostItem['ttl'] = rec['RecordTTL']
                HostItem['priority'] = rec['RecordPriority']

                service_metadata['data'][0]['User']['Domain']['Host'].append(HostItem)

            microesb.ServiceExecuter().execute(
                class_mapper=class_mapper,
                service_data=service_metadata
            )

            dbcon.commit()

        yield bytes(json.dumps(result), 'utf-8')
