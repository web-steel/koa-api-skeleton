<div align="center">
    <a href="https://github.com/web-steel/koa.api.skeleton" title="Koa API Skeleton">
        <img alt="Koa API Skeleton" src="https://miro.medium.com/max/1140/1*KV5Uyy1RYBh4TKvivBUAgQ.jpeg" height="150px" />
    </a>     
    <h1>Koa API Skeleton</h1>
    <p>The main purpose of this repository is to build a good project setup and workflow for writing a node REST API in TypeScript using Koa2 and TypeORM.</p>
    <a href="https://www.typescriptlang.org/">
        <img alt="TypeScript LOVE" src="https://img.shields.io/npm/types/typescript?style=flat-square">
    </a>
    <a href="https://raw.githubusercontent.com/web-steel/koa.api.skeleton/master/LICENSE">
        <img alt="MIT Licence" src="https://img.shields.io/github/license/web-steel/koa.api.skeleton?style=flat-square">
    </a>
    <a href="https://github.com/ellerbrock/open-source-badge/">
        <img alt="Open Source Love" src="https://img.shields.io/badge/Open%20Source-YES-brightgreen?style=flat-square" />
    </a>

</div>
<br/>

#### AVAILABLE ENDPOINTS

| method             | resource         | description                                                                                    |
|:-------------------|:-----------------|:-----------------------------------------------------------------------------------------------|
| `GET`              | `/`              | Simple welcome response                                                                        |
| `GET`              | `/swagger`       | Swagger documentation                                                                                               |    

## Pre-reqs
To build and run this app locally you will need:
- Install [Node.js](https://nodejs.org/en/)

## Features:
 * Nodemon - server auto-restarts when code changes
 * Koa v2
 * Sentry
 * TypeORM (SQL DB) with basic CRUD included
 * Class-validator - Decorator based entities validation
 * Node-input-validator - Node Input Validator is a validation library for node.js.
 * Jest - Test framework

## Included middleware:
 * koa-router
 * koa-bodyparser
 * koa-response-time
 * koa-compress
 * koa-static
 * swagger-ui-koa
 * swagger-jsdoc
 * Helmet (security headers)
 * CORS
 * Winston Logger

# Getting Started
- Clone the repository
```
git clone https://github.com/web-steel/koa2.api.skeleton.git {project_name}
```

- Install dependencies
```
cd {project_name}
npm install
```

- Run the project directly in TS
```
npm run dev
```

- Build and run the project in JS
```
npm run build
npm run start
```

- Run tests in the project
```
npm run test
```
- Run tests and coverage in the project
```
npm run coverage
```

## Setting up the Database - ORM
This API is prepared to work with an SQL database, using [TypeORM](https://github.com/typeorm/typeorm). In this case we are using mysql, and that is why in the package.json 'mysql' has been included. If you where to use a different SQL database remember to install the correspondent driver.

In local is being mocked with the docker local postgres as can be seen in ".env.sample"

It is importante to notice that, when serving the project directly with *.ts files using ts-node,the configuration for the ORM should specify the *.ts files path, but once the project is built (transpiled) and run as plain js, it will be needed to change it accordingly to find the built js files:

```
"entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ]
```

## Environment variables
Create a .env file (or just rename the .env.sample) containing all the env variables you want to set, dotenv library will take care of setting them. This project is using three variables at the moment:

 * PORT -> port where the server will be started on. Default: **`3000`**.
 * NODE_ENV -> environment, development value will set the logger as debug level. Possible options: development, test, production. Default: **development**.
 * DATABASE_USER -> Database user. Default: **`root`**.
 * DATABASE_PASS -> Database password. Default: **`root`**.
 * DATABASE_HOST -> Database host. Default: **`localhost`**.
 * DATABASE_PORT -> Database port. Default: **`3306`**.
 * DATABASE_NAME -> Database name. Default: **`default`**.
 
## Project Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/test**             | Contains all test files
| index.ts                 | Entry point to your KOA app                                                                   |
| package.json             | File that contains npm dependencies as well as build scripts                                  |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| .eslintrc.json           | Config settings for ESLint code style checking                                                |
| .env.sample              | Env variables file example to be renamed to .env                                              |

## Configuring TypeScript compilation
TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled. 

```json
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "lib": ["es2017"],
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "noImplicitAny": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "includes": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
```

| `compilerOptions` | Description |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"module": "commonjs"`             | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use            |
| `"target": "es2017"`               | The output language level. Node supports ES2017, so we can target that here                               |
| `"lib": ["dom","es2017","es6"]`    | Needed for TypeORM.                                             |
| `"moduleResolution": "node"`       | TypeScript attempts to mimic Node's module resolution strategy.                            |
| `"sourceMap": true`                | We want source maps to be output along side our JavaScript.     |
| `"outDir": "dist"`                 | Location to output `.js` files after compilation                |
| `"rootDir": "src"`                 | List of root folders whose combined content represents the structure of the project at runtime.                      |
| `"noImplicitAny": true`            | Raise error on expressions and declarations with an implied 'any' type.                                 |   
| `"experimentalDecorators": true`   | Needed for TypeORM. Allows use of @Decorators                   |
| `"emitDecoratorMetadata": true`    | Needed for TypeORM. Allows use of @Decorators                   |

The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context: 
```json
    "include": [
        "src/**/*"
    ]
```
`include` takes an array of glob patterns of files to include in the compilation.
This project is fairly simple and all of our .ts files are under the `src` folder.
For more complex setups, you can include an `exclude` array of glob patterns that removes specific files from the set defined with `include`.
There is also a `files` option which takes an array of individual file names which overrides both `include` and `exclude`.

## Running the build
| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `build`                   | Compiles all source `.ts` files to `.js` files in the `dist` folder                    |
| `clean`                   | Does the same as 'npm run clean:build'.    |
| `start`                   | Runs node on `dist/index.js` which is the apps entry point                                |
| `dev`                     | Nodemon, process restarts if crashes. Continuously watches `.ts` files and re-compiles to `.js`   |
| `lint`                    | Runs ESLint on project files                                                                      |
| `test`                    | Runs all tests in the project    |
| `covarage`                | Runs all tests and coverage in the project |
| `clean:build`             | Removes all `.js` files in the `dist` folder |
| `ci`                      | Runs ESLint and all test in the project | 

# Docker
[Docker](https://www.docker.com/) is an open platform for application development, delivery and operation. Docker was developed for faster uploading your apps. 
With docker, you can separate your application from your infrastructure and treat your infrastructure as a managed application.

## build image
```
docker build -t {image_name} .
```

## run container
In the Docker, you can run any script from the Running the build section
```
docker run -d [-p {your_port}:3000] [-e key=value] [-v {your_app_directory}:/opt/app] -t {image_name} [{script}]
```
| Flag | Description |
| ---------------| --------------------|
| `-v {your_app_directory}:/opt/app` | Mounting your home folder with the code for development |
| `-p {your_port}:3000`              | Port mounting. Default: **`3000`**     |
| `-e key=value`                     | Environment variables |
| `{script}`                         | Run script in container. Default: **`start`** |

# Running TEST
Like the rest of the steps, we use npm scripts to call test.
```
npm run ci       // runs TSLint including all test
npm run test     // runs only test
npm run covarage // runs all test including covarage
```

## Jest configuration
Jest's configuration can be defined in the package.json file of your project:

| Options | Description |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"testEnvironment": "node"`         | The test environment that will be used for testing.  |
| `"moduleFileExtensions": ["js","jsx","json","ts","tsx"]` | An array of file extensions your modules use. |
| `"transform": {"\\.ts$": "ts-jest"}`| A map from regular expressions to paths to transformers. A transformer is a module that provides a synchronous function for transforming source files. |
| `"testRegex"`| The pattern Jest uses to detect test files. |
| `"testPathIgnorePatterns": ["/node_modules/","/dist/","/coverage/"]`| An array of regexp pattern strings that are matched against all test paths before executing the test. If the test path matches any of the patterns, it will be skipped. |

# Dependencies
Dependencies are managed through `package.json`.
In that file you'll find two sections:
## `dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| dotenv                          | Loads environment variables from .env file.                           |
| koa                             | Node.js web framework.                                                |
| koa-bodyparser                  | A bodyparser for koa.                                                 |
| koa-router                      | Router middleware for koa.                                            |
| koa-helmet                      | Wrapper for helmet, important security headers to make app more secure| 
| @koa/cors                       | Cross-Origin Resource Sharing(CORS) for koa                           |
| reflect-metadata                | Used by typeORM to implement decorators.                              |
| typeorm                         | A very cool SQL ORM.                                                  |
| class-validator                 | Decorator based entities validation.                                  |
| koa-response-time               | X-Response-Time middleware for Koa.                                   |
| node-input-validator            | Validation library for node.js                                        |
| uuid                            | Simple, fast generation of RFC4122 UUIDS.                              |

## `devDependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| @types                          | Dependencies in this folder are `.d.ts` files used to provide types   |
| nodemon                         | Utility that automatically restarts node process when it crashes      |
| ts-node                         | Enables directly running TS files. Used to run `copy-static-assets.ts`|
| typescript                      | JavaScript compiler/type checker that boosts JavaScript productivity  |
| jest                            | Jest is a zero configuration test runner that allows you easily write JavaScript tests without setting anything up.|
| supertest                       | Library for testing HTTP servers on node js|
| pre-commit                      | Pre-commit is a pre-commit hook installer for git. It will ensure that your npm test (or other specified scripts) passes before you can commit your changes. This all conveniently configured in your package.json.|
| ts-jest                         | Ts-jest is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

To install or update these dependencies you can use `npm install` or `npm update`.
