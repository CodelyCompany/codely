#!/bin/bash

kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml
kubectl delete -f ../kubernetes/production --recursive