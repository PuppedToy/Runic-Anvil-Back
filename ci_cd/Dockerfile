FROM node:12

ARG PORT=8080

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE $PORT
CMD [ "npm", "start" ]