### Uruchomienie dashboardu

`kubectl proxy`

### Wygenerowanie tokena dla admina do dashboardu

`kubectl -n production create token admin-user`

### Dashboard jest dostępny na stronie

`http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/`
