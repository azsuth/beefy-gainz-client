kubectl apply -f k8s.yml
kubectl set image deployments/client-deployment client=azsuth/beefy-gainz-client:$SHA