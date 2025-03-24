# x0-skeleton

x0 JS Framework Application Skeleton Repository.

Contains skeleton data to run your x0-application in minutes
(Docker / Google Kubernetes Engine).

>[!WARNING]
> This repository is a "template repository", see
> https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
> You should create your own repository from this template before you start modeling
> your x0-app / make changes.

Base x0 Repository: https://github.com/WEBcodeX1/x0.

## 1. Dependencies

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

## 2. Docker Images

>[!NOTE]
> Currently we do not provide a docker registry, images must be loaded manually
> after downloading.

https://docker.webcodex.de/x0/docker.x0-app.tar<br>
https://docker.webcodex.de/x0/docker.x0-db.tar<br>
https://docker.webcodex.de/x0/docker.x0-db-install.tar (optional kubernetes / minikube)

```bash
# load docker images
docker load < docker.x0-app.tar
docker load < docker.x0-db.tar
```

## 3. Build Base Debian Packages

```bash
# build debian packages
cd ./debian && debuild
```

## 4. Build Docker Container

```bash
# build docker container
cd ./docker && build-app.sh && build-db.sh
```

## 5. IP Setup / DNS

The following IP setup  is used (addresses / hostnames).

| CONTAINER           | IP ADDRESS         | DNS / HOSTNAME               |
| ------------------- | ------------------ | ---------------------------- |
| <img width="300px"> | <img width="300">  | <img width="420">            |
| your-app            | 172.20.0.10        | x0-skeleton-test.x0.localnet |
| your-db             | 172.20.0.20        | mypostgres                   |

>[!NOTE]
> Add `172.20.0.10` / `x0-skeleton-test.x0.localnet` to hosts file or dns server.

## 6. Start Base Application

Run the following to test if everything is working correctly.

```bash
# build docker container
cd ./docker && x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py`, a `Hello World.`
text should be displayed.

## 7. Short Interception

The next chapters will cope with setting up a full working 3-tier application
including a small postgresql database.

Our `microesb` software has been used to abstract the relevant backend processes
(see https://github.com/clauspruefer/python-micro-esb).

>[!NOTE]
> Security and scaling aspects have been ommitted. The *x0-system* is not mandatory
> limited to a single backend application / database. All systems returning the
> correct JSON schema are usable. See *x0-documentation* for JSON definition / schemes.

It is also possible to test and run your x0-app on GKM / Minikube (google kubernetes engine).

## 8. Add Database

1. First remove all sql data from `rm ./database/*`.
2. *Move* the contents of `mv ./example/database/* ./database/*`.
3. Build `your-db` docker image by `cd ./docker && build-db.sh`.

Now your docker database image is ready. `cd ./docker && x0-start-containers.sh` will
start `your-db` and `your-app` containers later.

>[!NOTE]
> Database image build does **not** require the debian `debuild` process.

## 9. Model Your Application

Now its time to checkout a more advanced application setup.

A modified example *nr.5* from *x0-system* is used with working backend services /
database. Also `microesb` product is used to abstract OOP based *webservice call data*.

### 9.1 Example Content Explained

The `./example` subdir contains the following content.

| SUBDIR              | DESCRIPTION                                           |
| ------------------- | ----------------------------------------------------- |
| <img width="500px"> | <img width="520">                                     |
| database            | PostgreSQL Database Definition                        |
| docker              | Modified Dockerfile (add Python pip3 and microesb)    |
| microesb            | Microesb Config and Service Implementation            |
| x0-backend          | Python Backend Scripts                                |
| x0-config           | x0 Frontend Objects Definition                        |

### 9.2 Build Dir Explained

The `./www` subdir used by docker to build the x0 app contains the following
content.

| SUBDIR              | DESCRIPTION                                           |
| ------------------- | ----------------------------------------------------- |
| <img width="500px"> | <img width="520">                                     |
| python              | Python Backend Scripts                                |
| static              | x0 Frontend Objects Definition / CSS                  |
| x0                  | x0 User Functions                                     |

### 9.3 Get Application Ready

1. Remove all x0 objects definition (`rm ./www/static/*.json`)
2. Move x0 objects definition to build dir (`mv ./x0-config/* ./www/static/`)
3. Move Python backend scripts to build dir (`mv ./x0-backend/* ./www/python/`)
4. Move microesb config and service implementation to build dir (`mv ./microesb/* ./www/backend/`)
4. Replace dockerfile in docker dir (`mv ./docker/app.dockerfile ./docker/app.dockerfile`)

## 10. Rebuild / Deploy

Now rebuild debian package, docker container and start the application.

```bash
# build debian package
cd ./debian && debuild

# build docker container
cd ./docker && build-app.sh && build-db.sh

# start application
./x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py`.

## 11. Developing x0

If you need to implement new (enhanced) base x0 objects:

1. Clone the x0 repository
2. Model / add your sysObjNewObject.js
3. Build x0 docker containers
4. Import as `clickit/x0-app:latest`
5. Rebuild local your-app

>[!NOTE]
> Get fame by proposing your object to be implemented into official x0-system.
