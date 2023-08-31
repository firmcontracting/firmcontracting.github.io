FROM --platform=linux/amd64 node:17.7.2

# Setup Linux environment
RUN apt-get update
RUN apt-get install -y curl
RUN dpkg --add-architecture amd64
RUN apt-get update

# Install Hugo specific version
ARG HUGO_VERSION="0.116.1"
RUN curl -L "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb" -o hugo.deb
RUN apt-get install ./hugo.deb
