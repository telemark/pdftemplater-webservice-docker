# Setting the base to nodejs 4.8.2
FROM node:8.11.4-slim

# Maintainer
MAINTAINER PanJ

#### Begin setup ####

# Installs git and unoconv
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y git unoconv && apt-get clean

# Bundle app source
COPY . /src
COPY ./fonts /usr/share/fonts/truetype

RUN fc-cache -f -v

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000

# Expose 3000
EXPOSE 3000

# Startup
CMD /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 & node standalone.js