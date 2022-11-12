#!/bin/bash
kubectl apply -f ../kubernetes/production/production-namespace.yaml
kubectl apply -f ../kubernetes/production/secrets/
kubectl apply -f ../kubernetes/production/configmaps/
kubectl apply -f ../kubernetes/production/services/
kubectl apply -f ../kubernetes/production/volumes/
sleep 10
kubectl apply -f ../kubernetes/production/volumeclaims/
kubectl apply -f ../kubernetes/production/deployments/
kubectl apply -f ../kubernetes/production/ingress.yaml