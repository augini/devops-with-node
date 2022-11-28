# docker-compose down && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml docker-node