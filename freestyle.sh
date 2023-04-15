#!/bin/bash

# change to project directory
cd /Downloads/aws-form-event/src

# install dependencies
npm install

# run development server
npm run start

# build for production
npm run build

# run tests
npm run test
