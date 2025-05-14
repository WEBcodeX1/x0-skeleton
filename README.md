# x0-skeleton

**x0 JS Framework Application Skeleton Repository**.

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

Ubuntu 22.04

```bash
# install debian package builder / gnu gpg
apt-get -y install debuild gnupg docker.io
```

Ubuntu 24.04 / Devuan 

```bash
# install debian package builder / gnu gpg
apt-get install devscripts debhelper pbuilder gnupg docker.io
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

## 3. Clone Repository

```bash
# clone x0-skeleton / your-x0-app-repo
mkdir ~/src && cd ~/src
git clone https://github.com/WEBcodeX1/x0-skeleton.git
```

## 4. Docker Images

```bash
# pull docker images
docker pull ghcr.io/webcodex1/x0-app
docker pull ghcr.io/webcodex1/x0-db
```

-- or --

Download Docker images manually:

- https://docker.webcodex.de/x0/docker.x0-app.tar<br>
- https://docker.webcodex.de/x0/docker.x0-db.tar<br>

To load the Docker images:

```bash
# load docker images
docker load < docker.x0-app.tar
docker load < docker.x0-db.tar
```

## 5. Build Base Debian Packages

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

## 6. Build Docker Containers

```bash
# build docker containers
cd ./docker && build-app.sh && build-db.sh
```

## 7. IP Setup / DNS

The following IP setup is used for container addresses and hostnames:

| CONTAINER           | IP ADDRESS         | DNS / HOSTNAME               |
| ------------------- | ------------------ | ---------------------------- |
| <img width="300px"> | <img width="300">  | <img width="420">            |
| your-app            | 172.20.0.10        | x0-skeleton-test.x0.localnet |
| your-db             | 172.20.0.20        | mypostgres                   |

>[!NOTE]
> Add `172.20.0.10` / `x0-skeleton-test.x0.localnet` to your hosts file or
> dns zone.

## 8. Start Base Application

Run the following command to test if everything is working correctly:

```bash
# build docker container
cd ./docker && x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py` in your browser.
A `Hello World.` text should be displayed.

## 9. Kubernetes Minikube

By starting the kubernetes installer (`Setup.py`) using the unmodified
`./config/app-config.json` metadata, the following Minikube infrastructure on
Linux will be built.

- 2 x0 Application Pods
- 2 Database (replicating) Pods (Kubegres)
- Ingress LoadBalancing (nginx)

```bash
# setup minikube environment
cd ./kubernetes/setup/
python3 ./Setup.py
```

>[!NOTE]
> The IP setup including DNS differs from the Docker setup and **must** be changed
> according to the next steps.

