FROM node:10-alpine

WORKDIR /app

ENV PATH /app/node_module/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-script@2.1.8 -g --silent

COPY . ./
CMD ["npm", "start"]
