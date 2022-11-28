#!/bin/bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
sleep 2
kubectl apply -f ../kubernetes/production/production-namespace.yaml
# kubectl create secret tls tls-secret --key="../kubernetes/.cert/codely.io.key" --cert="../kubernetes/.cert/codely.io.crt" --namespace production
kubectl apply -f ../kubernetes/production/secrets/
kubectl apply -f ../kubernetes/production/configmaps/
kubectl apply -f ../kubernetes/production/services/
kubectl apply -f ../kubernetes/production/volumes/
sleep 5
kubectl apply -f ../kubernetes/production/volumeclaims/
kubectl apply -f ../kubernetes/production/deployments/
kubectl apply -f ../kubernetes/production/ingresses