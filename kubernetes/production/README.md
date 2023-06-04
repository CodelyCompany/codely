## Kubernetes Dashboard

#### Start Kubernetes Dashboard

`kubectl proxy`

#### Generate admin token for Dashboard

`kubectl -n production create token admin-user`

#### Dashboard website

[http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)

## Kubernetes Metrics-server

#### Metrics-server installation

`kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`

#### Metrics-server deployment edit

`kubectl -n kube-system edit deploy metrics-server`

In deployment metrics-server configuration you have to add this entry (command):

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

#### List all Kubernetes system pods

`kubectl -n kube-system get pods`

#### List resource usage for specific pods

`kubectl top pod -n <namespace>`
