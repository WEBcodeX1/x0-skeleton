# x0-skeleton

x0 JS Framework Application Skeleton Repository.

Contains skeleton data to run your x0-application in minutes
(Docker / Google Kubernetes Engine).

>[!WARNING]
> This repository is a "template repository", see
> https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
> You should create your own repository from this template before you start modeling your x0-app / make changes. 

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

## 7. Model Your Application

## 8. Add Database

## 9. Rebuild / Deploy
