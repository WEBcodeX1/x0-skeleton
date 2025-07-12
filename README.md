# x0 JS Framework - Application Skeleton Repository

This repository contains the skeleton setup required to run your *x0-application*
within minutes using a **local Docker Environment** or **Google Kubernetes Engine (GKE)**.

>[!WARNING]
> This repository is a "template repository." For more details, refer to:
> [Github - Creating A Repository From A Template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).
> You should create your own repository from this template before starting to model your *x0-app* or making any changes.

- [Detailed x0 Online Documentation](https://github.com/WEBcodeX1/x0)
- [Howto Model A Basic *x0-application*](./BUILD-HOWTO.md)

## 1. Quick Setup / Examples

To see what the *x0-system* is capable of, build one of the dockerized examples
documented at: [./example/README.md](./example/README.md).

## 2. Dependencies / Package Installation

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

## 3. Docker Permissions

As the **root** user, add your current user to the Docker UNIX group:

```bash
# add user to docker group
usermod -aG docker your-user
```

>[!NOTE]
> A restart of your current shell, desktop session, or even computer may be
> required for the changes to take effect.

## 4. Clone Repository

```bash
# clone x0-skeleton / your-x0-app-repo
mkdir ~/src && cd ~/src
git clone https://github.com/WEBcodeX1/x0-skeleton.git
```

## 5. Docker Images

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

## 6. Build Base Debian Packages

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

## 7. Build Docker Containers

```bash
# build docker containers
cd ./docker && build-app.sh && build-db.sh
```

## 8. IP Setup / DNS

The following IP setup is used for container addresses and hostnames:

| CONTAINER           | IP ADDRESS         | DNS / HOSTNAME               |
| ------------------- | ------------------ | ---------------------------- |
| <img width="300px"> | <img width="300">  | <img width="420">            |
| your-app            | 172.20.0.10        | x0-skeleton-test.x0.localnet |
| your-db             | 172.20.0.20        | mypostgres                   |

>[!NOTE]
> Add `172.20.0.10` / `x0-skeleton-test.x0.localnet` to your hosts file or
> dns zone.

## 9. Start Base Application

Run the following command to test if everything is working correctly:

```bash
# build docker container
cd ./docker && x0-start-containers.sh
```

Open `http://x0-skeleton-test.x0.localnet/python/Index.py` in your browser.
A `Hello World.` text should be displayed.

## 10. Kubernetes Minikube

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

### 10.1. IP Setup / DNS

```bash
# get minikube main ip address
minikube ip
```

Returns the current Minikube ingress IP Address (e.g. 192.168.49.2).

```bash
# get minikube ingress
kubectl get ingress -n x0-skeleton-test
```

Returns ingress configuration for the x0-skeleton namespace.
Add the data from column `HOST` and `ADDRESS` to `/etc/hosts` or DNS zone file.

>[!NOTE]
> Change IP address if already used in Docker context.

### 10.2. Check Pod Status

Finally check pod status.

```bash
# get pods status
kubectl get pods -n x0-skeleton-test
```

```bash
NAME                                        READY   STATUS
mypostgres-1-0                              1/1     Running
mypostgres-2-0                              1/1     Running
your-app-test-db-install                    0/1     Completed
your-app-test-deployment-6cb48779f9-cq2sb   1/1     Running
your-app-test-deployment-6cb48779f9-d5sf9   1/1     Running
```

### 10.3. Check Application

Open http://x0-skeleton-test.x0.localnet/python/Index.py in your browser.
A `Hello World.` text should be displayed.
