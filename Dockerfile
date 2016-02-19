###########################################################
#
# Dockerfile for pdftemplater-webservice-docker
#
###########################################################

# Setting the base to nodejs 4.2.4
FROM node:4.2.4-slim

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs unoconv
RUN \
	apt-get update && \
	DEBIAN_FRONTEND=noninteractive \
		apt-get install -y \
			unoconv \
	&& \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install

# Env variables
ENV SERVER_PORT 3000

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 && node standalone.js