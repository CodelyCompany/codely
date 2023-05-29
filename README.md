# Codely

## Build and push project

To build and push project to Dockerhub run (all components):

`./bin/build-and-push.sh`

To build and push selected component to Dockerhub run (available components: bash, c, cpp, java, javascript, python, r,
backend, backend_containers, frontend):

`./bin/build-and-push.sh [component_names]`

For example:

`./bin/build-and-push.sh frontend`

`./bin/build-and-push.sh backend backend_containers python`

## Development version

#### Start

Before running the project in the development version, you need to install dependencies in the frontend, backend and
backend_containers folders using `npm install` or `yarn install`

To start development version run:

`./bin/start-development.sh`

#### Stop

To stop development version run:

`./bin/stop-development.sh`

## Production version

#### Start

To start production version run:

`./bin/start-production.sh`

#### Stop

To stop production version run:

`./bin/stop-production.sh`

## Tests

Before running the tests, you need to run the development version of the project using the above scripts. Additionally
you need to install dependencies in tests folder with `npm install` or `yarn install`.

To run all tests run this command:

`./bin/run-tests.sh`

To run tests from selected suite run this command (available suites Login, Exercises, Editor):

`./bin/run-tests.sh --suite [suite]`

For example:

`./bin/run-tests.sh --suite Login`

`./bin/run-tests.sh --suite Exercises --suite Editor`

To run tests from selected file run this command:

`./bin/run-tests.sh --spec [path_to_file]`

For example:

`./bin/run-tests.sh --spec ./test/specs/login.js`

You can also run tests with yarn. To run the following tests you must be in the tests folder

For example:

`yarn test`

`yarn test --suite Login`

`yarn test --suite Exercises --suite Editor`

`yarn test --spec ./test/specs/login.js`

## Kubernetes Dashboard and Kubernetes Metrics-server

[Instruction to start Kubernetes Dashboard and Kubernetes Metrics-server](https://github.com/alannadolny/codely/blob/main/kubernetes/production/README.md)
