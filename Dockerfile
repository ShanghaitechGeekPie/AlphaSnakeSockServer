FROM node

MAINTAINER ericdiao @ Geek Pie Association

EXPOSE 3000

RUN mkdir /sockserver
COPY . /sockserver

RUN cd /sockserver \
  && npm install

WORKDIR /sockserver

CMD [ "node", "/sockserver/index.js" ]
