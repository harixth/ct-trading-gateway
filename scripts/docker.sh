docker build . -t ct-trading-gateway
docker tag ct-trading-gateway:latest asia.gcr.io/wealthbee/ct-trading-gateway:latest
docker push asia.gcr.io/wealthbee/ct-trading-gateway:latest

docker run -d -p 3000:3000 -p 3080:3080 ct-trading-gateway