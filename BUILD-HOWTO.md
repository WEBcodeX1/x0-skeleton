# How to Build Basic x0 Applications

This guide describes how to build simple **x0-apps** that do not depend on external
or advanced object includes, using a **local Docker environment**.

For advanced instructions, refer to the official *x0 online documentation*:

- [Chapter 26: Object Modeling](https://docs.webcodex.de/x0/v1.0/dev-object-modeling.html)
- [Chapter 27: Application Porting](https://docs.webcodex.de/x0/v1.0/dev-porting.html)

## 1. Prerequisites & Key Files

The **x0-skeleton** Dockerfiles rely on **x0-base-system** Docker images, which contain the
**x0-runtime** and **x0-system-database**.

To build your **x0-application**, you only need to update and package your application code,
database, configuration files, and system metadata. The key files to configure are:

To build your app, update and package:

- Application code
- Database definitions
- Configuration files
- System metadata

Key files to configure:

- `./debian/control`
- `./debian/x0-skeleton-data.install`
- `./debian/x0-skeleton-db.install`
- `./docker/app.dockerfile`
- `./docker/db.dockerfile`

## 2. Debian Packaging Metadata

The Debian package building subsystem (`debuild` / `apt`) is used by **x0-system**
to manage external packages efficiently.

If your **x0-app** requires additional apt package dependencies (e.g., `python3-package-xyz`),
modify the `./debian/control` file accordingly:

```bash
Package: x0-skeleton-data
Section: utils
Architecture: all
Depends: python3-package-xyz (>=2.3), ${misc:Depends}
Description: Your application (www) data.
```

## 2.1. Data Package Content

Debian metadata packages additionally provide Docker containers with **x0-app** content.

Define which data to include in the Docker image in `./debian/x0-skeleton-data.install`:

- x0 Application Metadata JSON (app-config.json)
- x0 Object Metadata (menu.json, skeleton.json, object.json)
- x0 System Python Backend Scripts
- Your System JavaScript Code
- Your Application Frontend JavaScript Code
- Your Application Backend Python Scripts (Apache2 WSGI)

>[!WARNING]
> Building Debian packages requires proper GPG signing. See [/README.md](/README.md)
> for setup instructions.

## 3. Docker Configuration

To install Python pip3 packages, add to your Dockerfile:

```bash
RUN pip3 install microesb --break-system-packages
```

See Example #1 Dockerfile for using the `microesb` pip3 package.

## 4. Database / Table Definitions

Place your database definitions in the `./database/` folder.
Prefix each file with a number to ensure proper processing order.
Files must use the `.sql` MIME type.

Example:

- 01-x0-webui.txt.sql
- 02-x0-app-config.sql

>[!NOTE]
> You can define multiple databases, not just the x0 system database.
> Adjust authentication settings accordingly.

>[!WARNING]
> In a local Docker environment, database definitions are **not** managed by Debian packaging.
> Copying is handled in `./docker/db.dockerfile`.

>[!WARNING]
> In a Kubernetes environment, database definitions **are** managed by Debian packaging.
> Copying is handled in `./debian/x0-skeleton-db-install.install`.

## 5. x0 Metadata & Object Modeling

The `./www/static` folder contains x0 object definitions and relationships:

- menu.json
- skeleton.json
- object.json

By default, these files provide a minimal "Hello World" output.
Explore the example sub-folder and **x0-base** examples for more advanced object modeling.

## 6. Building & Running

### 6.1. Building Debian Packages

```bash
cd ./debian
debuild
```

Next, build the Docker images for your app (**your-app**) and database (**your-db**):

```bash
cd ./docker
./build-app.sh
./build-db.sh
```

Finally, (re)start the Docker containers for **your-app** and **your-db**:

```bash
cd ./docker && x0-start-containers.sh
```

You can now access your application at:
`http://x0-skeleton-test.x0.localnet/python/Index.py`.
