# firmcontracting.com

Professional website of Firm Contracting. Statically built using [Hugo](https://gohugo.io/) and
[portio](https://github.com/StaticMania/portio-hugo). Deployed using [GitHub Actions](https://github.com/features/actions) and
[GitHub Pages](https://pages.github.com/) in a Dockerized environment.

## Docker

The Dockerfile in the root of the repository builds a docker image with the exact dependencies needed to generate the
static website. The GitHub Actions automation which builds and deploys the website is built using the same docker image.

### Setup

We first build the docker image:

```
docker build . -t firmcontracting.com
```

Next we initialize the git submodule which will clone the Hugo theme:

```
git submodule init
git submodule update
```

Next we need to install the theme dependencies by mounting the current repository inside the docker container:

```
docker run -v $PWD:/$PWD -w $PWD/themes/portio -it firmcontracting.com npm install
```

### Build

To build the site we need to first invoke the Tailwind CSS JIT compiler to parse the website and theme contents and
generate the CSS file from a union set of all CSS classes used. Following the CSS generation we invoke the Hugo build
system to generate the static website.

We can use the same script that is used by the automation to accomplish this:

```
docker run -v $PWD:/$PWD -w $PWD -it firmcontracting.com .github/actions/hugo-build/action.sh
```

The static website is generated in the `./public` directory.

### Watch

When making changes to the website it is inconvenient to have to build and serve the website after each change. Instead
we can launch a process in our docker container which will watch for any changes to our website and automatically
rebuild and serve the content. We can use a terminal shell to invoke the following command:

```
docker run -v $PWD:/$PWD -w $PWD -p 8000:8000 -it firmcontracting.com npm run hugo-watch
```
