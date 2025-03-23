\connect "hosting-example"

INSERT INTO sys_core."user" ("name") VALUES ('testuser1');

INSERT INTO sys_core.domain ("name", ending, creator_user_id) VALUES ('testdomain1', 'com', 1);
INSERT INTO sys_core.domain ("name", ending, creator_user_id) VALUES ('testdomain2', 'de', 1);
INSERT INTO sys_core.domain ("name", ending, creator_user_id) VALUES ('testdomain3', 'net', 1);
INSERT INTO sys_core.domain ("name", ending, creator_user_id) VALUES ('testdomain4', 'org', 1);

