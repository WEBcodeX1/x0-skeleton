# Build Basic x0-Applications

The following describes building simple *x0-apps* which do not rely on external
/ advanced object includes on a *Local Docker Environment*.

An advanced build howto can be found in the *x0-online-documentation*
 (chapters 26 https://docs.webcodex.de/x0/v1.0/dev-object-modeling.html and 27 https://docs.webcodex.de/x0/v1.0/dev-porting.html).

## 1. Basics

The *x0-skeleton* Docker dockerfiles rely on *x0-base-system* (include) Docker
Images containing the *x0-runtime* and *x0-system-database*.

Only your Application Program Code, Database and Configuration Files / System
Metadata must be updated / packaged on top to produce a working *x0-application*.

The following subsections describe the most important configurable data.

- ./debian/control
- ./debian/x0-skeleton-data.install
- ./debian/x0-skeleton-db.install
- ./docker/app.dockerfile
- ./docker/db.dockerfile

## 2. Debian Metadata Packages

The Debian Package Building Subsystem (debuild / apt) is used by *x0-system* to
easily maintain external packages with minimal effort.

If your *x0-app* needs apt package dependencies (e.g. python3-package-xyz), then
you should modify the `./debian/control` file.

```bash
Package: x0-skeleton-data
Section: utils
Architecture: all
Depends: python3-package-xyz (>=2.3), ${misc:Depends}
Description: Your application (www) data.
```

## 2.1. Debian Data Packages

Additionally the Debian Metadata Packages are used to provide Docker Container
with *x0-app* content.

The `./debian/x0-skeleton-data.install` file defines which data will be used
inside the docker image "your-app".

The default definition in `./debian/x0-skeleton-data.install` copies this data:

- x0 Application Metadata JSON (app-config.json)
- x0 Object Metadata (menu.json, skeleton.json, object.json)
- x0 System Python Backend Scripts
- Your System JavaScript Code
- Your Application Frontend JavaScript Code
- Your Application Backend Python Scripts (Apache2 WSGI)

>[!WARNING]
> Do not forget that building Debian Packages needs correct gpg signing to be
> set up (see [/README.md](/README.md).

## 3. Docker Configuration

If you need to install Python pip3 Packages, that should be defined

```bash
RUN pip3 install microesb
```

See Example #1 dockerfile which uses `microesb` pip3 Package.

## 4. Database / Table Definition

Database definitions will be placed inside `./database/` sub-folder.
They must be prefixed by a number to ensure serial ordered processing.

Mime type must be `.sql`.

- 01-x0-webui.txt.sql
- 02-x0-app-config.sql

>[!NOTE]
> You are not limited to the x0 sytem database only, multiple databases
> can be defined, so not forget to adjust authentication.

>[!WARNING]
> Database definitions in *Local Docker Environment* will **not** use
> Debian Packaging. The copy process is defined inside dockerfile `./docker/db.dockerfile`.

>[!WARNING]
> Database definitions in *Kubernetes Environment* **are using**
Debian Packaging. The copy process is defined inside `./debian/x0-skeleton-db-install.install`.

## 5. x0 Metadata / Object Modeling

`./www/static` sub-folder contains *x0-object* definitions and relations.

- menu.json
- skeleton.json
- object.json

The default contains a very limited "Hello World" output with minimal a
object count.

Check out the example sub-folder and the *x0-base* examples to get more
experience in modeling *x0-objects*.

## 6. Debian / Docker Image / Container Build

First build the Debian Packages.

```bash
cd ./debian
debuild
```

The following commands start the Docker image build process "your-app" and "your-db".

```bash
cd ./docker
./build-app.sh
./build-db.sh
```

Afterwards (re)start the Docker Container "your-app" and "your-db".

```bash
cd ./docker && x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py`.
