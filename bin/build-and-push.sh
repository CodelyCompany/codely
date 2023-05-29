#!/bin/bash

containers=(bash c cpp java javascript python r)

possible_args=(bash c cpp java javascript python r backend backend_containers frontend)

cd ../

# shellcheck disable=SC2206
args=($@)

buildAndPushBackendContainers() {
  docker build --tag mtx22/codely-backend-containers backend_containers/
  docker push mtx22/codely-backend-containers
}

if [ $# -eq 0 ]; then
  for item in ${containers[*]}; do
    docker build --tag mtx22/codely-"$item" containers/"$item"/
    docker push mtx22/codely-"$item"
  done

  docker build --tag mtx22/codely-backend backend/
  docker push mtx22/codely-backend

  docker build --tag mtx22/codely-frontend frontend/
  docker push mtx22/codely-frontend

  buildAndPushBackendContainers
else
  for item in ${args[*]}; do
    # shellcheck disable=SC2076
    if [[ ! " ${possible_args[*]} " =~ " ${item} " ]]; then
      echo Wrong container name \""$item"\"
      exit 1
    fi
  done
  for item in ${args[*]}; do
    # shellcheck disable=SC2076
    if [[ " ${containers[*]} " =~ " ${item} " ]]; then
      # shellcheck disable=SC2086
      docker build --tag mtx22/codely-$item containers/"$item"/
      docker push mtx22/codely-"$item"
    else
      # shellcheck disable=SC2053
      if [[ "backend_containers" == ${item} ]]; then
        buildAndPushBackendContainers
      else
        docker build --tag mtx22/codely-"$item" "$item"/
        docker push mtx22/codely-"$item"
      fi
    fi
  done
fi
