## 1. Howto Build x0-Applications (Example)

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

## 2. Add Database

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

## 3. Model Your Application

Now it's time to explore an advanced application setup.

An example (modified example #5) from the *x0-system* is used, with working backend
services and a database. The `microesb` product abstracts OOP-based *webservice call data*.

### 3.1 Example Content Explained

The ./example subdirectory contains the following:

| SUBDIR              | DESCRIPTION                                           |
| ------------------- | ----------------------------------------------------- |
| <img width="500px"> | <img width="520">                                     |
| database            | PostgreSQL Database Definition                        |
| docker              | Modified Dockerfile (add Python pip3 and microesb)    |
| microesb            | Microesb Config and Service Implementation            |
| x0-backend          | Python Backend Scripts                                |
| x0-config           | x0 Frontend Objects Definition                        |

### 3.2 Build Dir Explained

The ./www subdirectory, used by Docker to build the *x0-app*, contains:

| SUBDIR              | DESCRIPTION                                           |
| ------------------- | ----------------------------------------------------- |
| <img width="500px"> | <img width="520">                                     |
| python              | Python Backend Scripts                                |
| static              | x0 Frontend Objects Definition / CSS                  |
| x0                  | x0 User Functions                                     |

### 3.3 Get Application Ready

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

## 4. Rebuild / Deploy

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

## 5. Be An x0-Developer

If you need to implement new (or enhanced) base *x0-objects*:

1. Clone the x0 repository.
2. Model / add your `sysObjNewObject.js`.
3. Build x0 Docker containers.
4. Rebuild your app locally.

>[!NOTE]
> Get recognition by proposing your object for inclusion in the official *x0-system*.
