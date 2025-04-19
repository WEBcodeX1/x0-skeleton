# x0-skeleton

x0 JS Framework Application Skeleton Repository.

This repository contains the skeleton setup required to run your *x0-application*
within minutes using Docker or Google Kubernetes Engine (GKE).

>[!WARNING]
> This repository is a "template repository." For more details, see:
> https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
> You should create your own repository from this template before starting to model
> your *x0-app* or making any changes.

For the base x0 repository and detailed documentation, visit: https://github.com/WEBcodeX1/x0.

## 1. Dependencies / Package Installation

### Supported OS:

Ubuntu 22.04, 24.04

```bash
# install debian package builder / gnu gpg
apt-get -y install debuild gnupg docker.io
```

Devuan

```bash
# install debian package builder / gnu gpg
apt-get install devscripts pbuilder gnupg docker.io
```

## 2. Docker Permissions

As the **root** user, add your current user to the Docker UNIX group:

```bash
# add user to docker group
usermod -aG docker your-user
```

>[!NOTE]
> A restart of your current shell, desktop session, or even computer may be
> required for the changes to take effect.

## 3. Docker Images

>[!NOTE]
> Currently, we do not provide a Docker registry.
> Images must be loaded manually after downloading.

Available Docker images:

- https://docker.webcodex.de/x0/docker.x0-app.tar<br>
- https://docker.webcodex.de/x0/docker.x0-db.tar<br>
- https://docker.webcodex.de/x0/docker.x0-db-install.tar (optional for Kubernetes / Minikube)<br>
- https://docker.webcodex.de/x0/docker.x0-msg-server.tar (optional for net-messaging)

To load the Docker images:

```bash
# load docker images
docker load < docker.x0-app.tar
docker load < docker.x0-db.tar
```

## 4. Build Base Debian Packages

Install the required tools and set up GPG before building Debian packages.
See: https://github.com/WEBcodeX1/x0/blob/main/debian/README.md.

Provide the following details for default package signing:

- `Real Name`: Your Name
- `Email address`: you@domain.online
- `Comment`: YourPosition
  
```bash
# build debian packages
cd ./debian && debuild
```

## 5. Build Docker Containers

```bash
# build docker containers
cd ./docker && build-app.sh && build-db.sh
```

## 6. IP Setup / DNS

The following IP setup is used for container addresses and hostnames:

| CONTAINER           | IP ADDRESS         | DNS / HOSTNAME               |
| ------------------- | ------------------ | ---------------------------- |
| <img width="300px"> | <img width="300">  | <img width="420">            |
| your-app            | 172.20.0.10        | x0-skeleton-test.x0.localnet |
| your-db             | 172.20.0.20        | mypostgres                   |

>[!NOTE]
> Add `172.20.0.10` / `x0-skeleton-test.x0.localnet` to your hosts file or
> dns zone.

## 7. Start Base Application

Run the following command to test if everything is working correctly:

```bash
# build docker container
cd ./docker && x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py` in your browser.
A `Hello World.` text should be displayed.

## 8. Short Interception

The next chapters will guide you through setting up a fully functional 3-tier
application, including a small PostgreSQL database.

Our `microesb` software abstracts the relevant backend processes.
See: https://github.com/clauspruefer/python-micro-esb.

>[!NOTE]
> Security and scaling considerations have been omitted. The *x0-system* is not
> limited to a single backend application or database. Any system returning the
> correct JSON schema is usable. Refer to the *x0-documentation* for JSON definitions
> and schemas.

You can also test and run your *x0-app* on GKE / Minikube (Google Kubernetes Engine).

## 9. Add Database

1. Remove all SQL data:
```bash
rm ./database/*
```
2. Move example database contents:
```bash
mv ./example/database/* ./database/*
```
3. Build the `your-db` Docker image:
```bash
cd ./docker && build-db.sh
```

Now your Docker database image is ready. Later, run:

```bash
cd ./docker && x0-start-containers.sh
```

This will start the `your-db` and `your-app` containers.

>[!NOTE]
> Building the database image does **not** require the Debian `debuild` process.

## 10. Model Your Application

Now it's time to explore an advanced application setup.

An example (modified example #5) from the *x0-system* is used, with working backend
services and a database. The `microesb` product abstracts OOP-based *webservice call data*.

### 10.1 Example Content Explained

The ./example subdirectory contains the following:

| SUBDIR              | DESCRIPTION                                           |
| ------------------- | ----------------------------------------------------- |
| <img width="500px"> | <img width="520">                                     |
| database            | PostgreSQL Database Definition                        |
| docker              | Modified Dockerfile (add Python pip3 and microesb)    |
| microesb            | Microesb Config and Service Implementation            |
| x0-backend          | Python Backend Scripts                                |
| x0-config           | x0 Frontend Objects Definition                        |

### 10.2 Build Dir Explained

The ./www subdirectory, used by Docker to build the *x0-app*, contains:

| SUBDIR              | DESCRIPTION                                           |
| ------------------- | ----------------------------------------------------- |
| <img width="500px"> | <img width="520">                                     |
| python              | Python Backend Scripts                                |
| static              | x0 Frontend Objects Definition / CSS                  |
| x0                  | x0 User Functions                                     |

### 10.3 Get Application Ready

1. Remove all x0 object definitions:
```bash
rm ./www/static/*.json
```
2. Move x0 objects definition to build dir
```bash
mv ./x0-config/* ./www/static/
```
3. Move Python backend scripts to build dir
```bash
mv ./x0-backend/* ./www/python/
```
4. Move microesb config and service implementation to build dir
```bash
   mv ./microesb/* ./www/backend/
```
5. Replace the Dockerfile:
```bash
mv ./docker/app.dockerfile ./docker/app.dockerfile`
```

## 11. Rebuild / Deploy

Rebuild the Debian package, Docker container, and start the application:

```bash
# build debian package
cd ./debian && debuild

# build docker containers
cd ./docker && build-app.sh && build-db.sh

# start the application
./x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py`.

## 12. Developing x0

If you need to implement new (or enhanced) base *x0-objects*:

1. Clone the x0 repository.
2. Model / add your `sysObjNewObject.js`.
3. Build x0 Docker containers.
4. Rebuild your app locally.

>[!NOTE]
> Get recognition by proposing your object for inclusion in the official *x0-system*.
