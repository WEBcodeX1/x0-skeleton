# x0-skeleton

x0 JS Framework Application Skeleton Repository.

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
# load images to local registry
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

## 5. Start Application

```bash
# build docker container
cd ./docker && x0-start-containers.sh
```
