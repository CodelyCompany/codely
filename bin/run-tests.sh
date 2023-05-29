#!/bin/bash

if docker-compose ls | grep -q 'dev'; then
  echo "Docker Compose development is running."
  echo "Run tests"
  cd ../tests/ || (echo "Directory 'tests' doesn't exist. Exiting." && exit)
  yarn test "$@"
else
  echo "Docker Compose development is not running."
  echo "You need to run docker compose development first."
  echo "You can do this by running start-development.sh (./start-development.sh)"
  exit
fi
