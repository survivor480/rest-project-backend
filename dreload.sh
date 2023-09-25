sudo docker-compose down

sudo docker build .

sudo docker images rm rest-project-emis

sudo docker-compose up -d

sudo docker logs -f rest_api_server