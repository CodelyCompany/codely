#!/bin/bash

containers=(bash c cpp java javascript python r)

cd ../

for item in ${containers[*]}
do
    docker build --tag mtx22/codely-$item containers/$item/
    docker push mtx22/codely-$item
done


docker build --tag mtx22/codely-backend backend/
docker push mtx22/codely-backend

docker build --tag mtx22/codely-frontend frontend/
docker push mtx22/codely-frontend

docker build --tag mtx22/codely-backend-containers backend_containers/
docker push mtx22/codely-backend-containers