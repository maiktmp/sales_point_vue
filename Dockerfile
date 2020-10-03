# base image
FROM node:10.15.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
# start app


#sales_point_vue]$ docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3503:8080 sales_point_2CMD ["npm", "run", "serve"]