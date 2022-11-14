#!/bin/bash

if  [ ! -d "/home/${USER}/mongodb/database" ]; then 
    mkdir -p /home/${USER}/mongodb/database
    echo Created required /home/${USER}/mongodb/database folder
fi

docker compose --file ../docker/dev/docker-compose.yml up --build 