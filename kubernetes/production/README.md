## Kubernetes Dashboard

#### Uruchomienie dashboardu

`kubectl proxy`

#### Wygenerowanie tokena dla admina do dashboardu

`kubectl -n production create token admin-user`

#### Dashboard jest dostępny na stronie

[http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)

## Kuberenets Metrics-server

#### Instalacja Metrics-server

`kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`

#### Edycja deploymentu metrics-server

`kubectl -n kube-system edit deploy metrics-server`

W konfiguracji deploymentu metrics-server należy dodać poniższy wpis (comand):

```
      containers:
      - args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        command:
        - /metrics-server
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP
```

#### Wypisanie podów systemowych kubernetesa

`kubectl -n kube-system get pods`

#### Wypisanie zużycia zasobów danych podów

`kubectl top pod -n <namespace>`
