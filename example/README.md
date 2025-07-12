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

The latest *x0-system* docker images from `ghcr.io/webcodex1/` will be referenced
inside example dockerfiles.

The next step describes the build process in detail.

## 2. Activating / Building

Each example provides the `activate.sh` shell script.

```bash
# build and run example (from example main path)
cd ./01-forms-microesb
./activate.sh
```

The following tasks will be executed in serial order:

1. Copy the *x0-metadata* and Backend Scripts from Example Content to `../www`
2. Build Debian Metadata Package used for next step Docker Container build
3. Build Docker Container "your-app" including the *x0-application*
4. Build Docker Container "your-db" including all Databases
5. Start "your-app" and "your-db" Docker Containers including local Docker Network Setup

>[!WARNING]
> Activating an example deletes / overwrites current ../www content completely!

>[!NOTE]
> You need internet access for external Docker Images / Python pip3 Packages!

## 3. Starting / Viewing Example

- Add `x0-skeleton-test.x0.localnet` hostname / IPv4 address `172.20.0.10` to `/etc/hosts`
- Open `http://x0-skeleton-test.x0.localnet/python/Index.py` in a local Internet Browser

>[!NOTE]
> On older systems application startup time could be impacted. If the application is not
> up 100%, an 500 Internal Server Error will be raised.
