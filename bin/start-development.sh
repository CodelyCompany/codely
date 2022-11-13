#!/bin/bash

if  [ ! -d "/tmp/mongodb/database" ]; then 
    mkdir -p /tmp/mongodb/database
    echo Created required /tmp/mongodb/database folder
fi

docker compose --file ../docker/dev/docker-compose.yml up --build 