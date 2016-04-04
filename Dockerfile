FROM node:slim
EXPOSE 8008

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY package.json /usr/src/server/
RUN npm install

COPY ./server/src/**.js /usr/src/server

CMD [ "npm", "start" ]
