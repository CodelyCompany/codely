#!/bin/bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml
sleep 2
kubectl apply -f ../kubernetes/production/production-namespace.yaml
kubectl apply -f ../kubernetes/production/network-policy-containers.yaml
kubectl apply -f ../kubernetes/production/secrets/
kubectl apply -f ../kubernetes/production/configmaps/
kubectl apply -f ../kubernetes/production/services/
kubectl apply -f ../kubernetes/production/volumes/
kubectl apply -f ../kubernetes/production/dashboard-config/
sleep 5
kubectl apply -f ../kubernetes/production/volumeclaims/
kubectl apply -f ../kubernetes/production/deployments/
kubectl apply -f ../kubernetes/production/ingress.yaml