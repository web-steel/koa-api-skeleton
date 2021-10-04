const path = require('path');
const pkginfo = require('../../../package.json');

import swaggerJSDoc from 'swagger-jsdoc';

const info = {
  title: 'Koa API Skeleton',
  description: pkginfo.description,
  version: pkginfo.version,
  contact: pkginfo.author,
  termsOfService: ''
};
const servers: Array<string> = [];

// Swagger definitions
const definition = {
  openapi: '3.0.0',
  info,
  servers
};

// Options for the swagger specification
const options = {
  definition,
  // Path to the API specs
  apis: [
    path.join(__dirname, './tags.yaml'),
    path.join(__dirname, '../../app/controller/**/*.ts'),
    path.join(__dirname, '../../app/controller/**/*.js'),
    path.join(__dirname, './template/schemas.yaml'),
    path.join(__dirname, './template/headers.yaml'),
    path.join(__dirname, './template/parameters.yaml'),
    path.join(__dirname, './template/responses.yaml')
  ]
};

export default swaggerJSDoc(options);
