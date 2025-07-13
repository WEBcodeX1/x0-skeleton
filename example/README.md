# x0-Application Examples

This directory contains examples that demonstrate advanced **x0-realtime-features**.

## Included Examples

- `01-forms-microesb`
- `02-list-calculateable`

Each example contains its own `README.md` with detailed information.

## Videos

The most relevant examples have been recorded as videos. 
You can find them in the *x0-base-system* repository under the `example` subdirectory.

>[!NOTE]
> Check section 2 of the main `/README.md` for information about dependencies and system compatibility.

>[!NOTE]
> Clone this repository to a local subfolder before proceeding.

## 1. Base Docker Images

The latest x0-system Docker images from `ghcr.io/webcodex1/` are referenced in the example Dockerfiles.

## 2. Activating / Building

Each example provides an `activate.sh` shell script.

To build and run an example (from the example's main directory):

```bash
# build and run example 1
cd ./01-forms-microesb
./activate.sh
```

This script executes the following tasks in order:

1. Copies the x0-metadata and backend scripts from the example content to `../www`.
2. Builds a Debian metadata package, used for Docker container creation.
3. Builds the Docker container `your-app`, including the x0-application.
4. Builds the Docker container your-db, including all databases.
5. Starts both containers and sets up the local Docker network.

>[!WARNING]
> Activating an example will delete and overwrite the current `../www` content!

>[!NOTE]
> Internet access is required to download external Docker images and Python `pip3` packages.

## 3. Starting / Viewing An Example

- Add the hostname `x0-skeleton-test.x0.localnet` with IPv4 address `172.20.0.10` to your `/etc/hosts` file.
- Open `http://x0-skeleton-test.x0.localnet/python/Index.py` in your local browser.

>[!NOTE]
> On older systems, application startup time may be longer. If the application isn’t
> fully started, you might see a 500 Internal Server Error.
