# Node app
Build Image locally

```
docker build -t local/spike-prometheus-grafana .
```

apply the config
```
kubectl apply -f ./deployments/prometheus/deployment.yml
```