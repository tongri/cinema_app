FROM node:17.9


WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force

# add app
COPY . ./

# start app
CMD ["npm", "start"]
