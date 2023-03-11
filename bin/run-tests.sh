#!/bin/bash

if docker-compose ls | grep -q 'dev'; then
  echo "Docker Compose development is running."
else
  echo "Docker Compose development is not running."
  echo "Docker Compose development is starting... Wait 30 seconds"
  ./start-development.sh &
  sleep 30
fi

echo "Run tests"
cd ../tests/ || echo "Directory 'tests' doesn't exist. Exiting"
yarn test
