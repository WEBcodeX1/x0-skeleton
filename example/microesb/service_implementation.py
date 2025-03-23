import psycopg2

from microesb import microesb


class User(microesb.ClassHandler):

    def __init__(self):
        super().__init__()
        self.DB_user_id = None

    def init(self):
        crs = self.dbcon.cursor()
        crs.execute("""
            SELECT id
                FROM sys_core."user"
            WHERE
                "name" = %s""",
            (self.name,)
        )
        row = crs.fetchone()
        self.DB_user_id = row[0]


class Domain(microesb.ClassHandler):

    def __init__(self):
        super().__init__()
        self.DB_domain_id = None

    def add(self):

        self.DB_user_id = self.parent_object.DB_user_id
        self.dbcon = self.parent_object.dbcon

        crs = self.dbcon.cursor()
        crs.execute(
            """
            SELECT id
                FROM sys_core."domain"
            WHERE
                creator_user_id = %s AND "name" = %s AND ending = %s""",
            (self.DB_user_id, self.name, self.ending,)
        )

        row = crs.fetchone()
        self.DB_domain_id = row[0]


class Host(microesb.MultiClassHandler):

    def __init__(self):
        super().__init__()
        self.name = None
        self.priority = None
        self.ttl = None

    def add(self):
        self.dbcon = self.parent_object.dbcon
        self.DB_user_id = self.parent_object.DB_user_id
        self.DB_domain_id = self.parent_object.DB_domain_id

        with open("/tmp/esb-debug-host", 'w') as fh:
            fh.write("User id:{} Domain id:{} hostname:{} type:{} value:{} ttl:{} prio:{}".format(
                self.DB_user_id,
                self.DB_domain_id,
                self.name,
                self.type,
                self.value,
                self.ttl,
                self.priority
            ))

        if len(self.ttl) == 0:
            self.ttl = 0
        if len(self.priority) == 0:
            self.priority = 0

        crs = self.dbcon.cursor()
        crs.execute(
            """
            INSERT INTO sys_dns.dnsrecord
                (domain_id, "name", "type", content, ttl, prio)
            VALUES
                (%s, %s, %s, %s, %s, %s)""",
            (
                self.DB_domain_id,
                self.name,
                self.type,
                self.value,
                self.ttl,
                self.priority,
            )
        )

