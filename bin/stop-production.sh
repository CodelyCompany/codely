#!/bin/bash
kubectl delete -f ../kubernetes/production/ingresses
kubectl delete -f ../kubernetes/production/deployments/
kubectl delete -f ../kubernetes/production/volumeclaims/
kubectl delete -f ../kubernetes/production/volumes/
kubectl delete -f ../kubernetes/production/services/
kubectl delete -f ../kubernetes/production/configmaps/
kubectl delete --namespace production secret/tls-secret
kubectl delete -f ../kubernetes/production/production-namespace.yaml