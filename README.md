[![Build Status](https://travis-ci.org/telemark/pdftemplater-webservice-docker.svg?branch=master)](https://travis-ci.org/telemark/pdftemplater-webservice-docker)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# pdftemplater-webservice-docker
Upload .docx-template and data. Get formatted pdf in return


```sh
curl \
  -F "title=This is my title" \
  -F "description=Love my description" \
  -F "body=My body is beautiful" \
  -F "file=@test/data/testdoc.docx" \
  http://192.168.99.100 > converted.pdf
```

returns [converted.pdf](test/data/converted.pdf)

## Docker

Build the image

```sh
$ docker build -t pdftemplater .
```

Run the image

```sh
$ docker run -d -p 80:3000 --name pdf pdftemplater
```

or use the prebuilt from [hub.docker.com](https://hub.docker.com/r/telemark/pdftemplater-webservice-docker)

```sh
$ docker pull telemark/pdftemplater-webservice-docker
```

and the run the image

```sh
$ docker run -d -p 80:3000 --name pdf telemark/pdftemplater-webservice-docker
```