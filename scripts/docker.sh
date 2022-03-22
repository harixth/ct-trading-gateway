docker build . -t ct-trading-gateway
docker run -d -p 3000:3000 -p 3080:3080 ct-trading-gateway