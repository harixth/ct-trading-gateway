docker build . -t ct-trading-gateway
docker tag ct-trading-gateway:latest asia.gcr.io/wealthbee/ct-trading-gateway:latest
docker push asia.gcr.io/wealthbee/ct-trading-gateway:latest

docker run -d -p 4100:4100 -p 3080:3080 ct-trading-gateway