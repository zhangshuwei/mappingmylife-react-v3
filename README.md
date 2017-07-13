# Mapping My Life

Mapping My Life is a web application based on [Cozy Cloud](https://cozy.io/fr/).

## Overview

This application allows users to visualise their displacement data more easily. The displacement data includes the geolocation data and other communications data like SMS, phone calls...

Main feature:
* **Map:** The application presente an interface with a map which displays numbers of different type markers depending on your data.
* **Timeline:** The application includes a timeline which allows you to select a certain period data. The data displayed will be changed depending on the period.
* **Favorite place:** You can mark a place as your favorite place(like your home, your work place, the market...)
* **Itinerary:** The application shows also an itinerary depending on the day you choose. This route will make you know intuitively the itinerary of your day.

## Installation

You can install the application by using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com)

```sh
$ git clone https://github.com/zhangshuwei/mappingmylife-react-v3.git
$ cd mappingmylife-react-v3
$ npm install
# or
$ yarn install
```
## Running the app

#### Run it inside the VM
You can easily run this application by using [cozy-stack docker image](https://github.com/cozy/cozy-stack/blob/master/docs/client-app-dev.md#with-docker):

```sh
# in a terminal, run the app in watch mode
$ yarn run watch
```

```sh
# in another terminal, run the docker container
$ cd mappingmylife-react-v3
$ docker run --rm -it -p 8080:8080 -p 5984:5984 -v "$(pwd)/build":/data/cozy-app -v "$HOME/db":/usr/local/couchdb/data -v "$HOME/storage":/data/cozy-storage --name=cozydev cozy/cozy-app-dev
```
Your app is available at http://app.cozy.tools:8080.

You can check your data on CoucheDB at http://localhost:5984

## Build the app

Build the app for production mode to the `build` folder.

```sh
$ npm run build
# or
$ yarn build
```
## Deploy the app


You will find all the files needed to be deployed in `build` folder.

In order to deploy the app on Cozy you need to copy all the files in `build` folder to another git branch named 'build'.

First, stay on master branch, copy the files in `build` folder to some place. And then go to build branch with the command below:

``` sh
$ git branch build #if you don't have 'build' branch
$ git checkout build

```
Copy the files here and then push to remote git branch.

## License
