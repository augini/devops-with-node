# docker commands

## Running containers

Run a docker container with volume mapped to current dir

```shell
docker run -p 3000:3000 -v $(pwd):/app -d --name=node-api node-api
```

The above command bind mounts the current dir in host machine to /app dir inside container
However, we might not want to keep node_modules in host machine and use the one inside container
To avoid the first bind mound from overriding the node_modules inside container, we can create another volume

```shell
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules -d --name=node-api node-api
```

Binding is a two way street. When we bind our local machine to docker container, any changes made inside the container
also gets reflected. It is fine when you want those changes to be displayed in local machine but for the most part, we do not want this as this creates a security issue.
To counter this, we can make bind mounts read only (ro) so that container can read the changes in host machine but can not change them.

```shell
docker run -p 3000:3000 -v $(pwd):/app:ro -v /app/node_modules -d --name=node-api node-api
```

## Passing env variables

```shell
docker run -p 3000:3000 -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000 -d --name=node-api node-api
```

As a file

```shell
docker run -p 3000:3000 -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -d --name=node-api node-api
```

## Removing volumes together with the container

```shell
docker rm node-app -fv
```

## Get details about a container

```shell
docker inspect container-name
```

## Scale the server

```shell
docker-compsoe -f docker-compose.yml --scale api-server=${number_of_instances}
```

## Push an image to DockerHub

Rename the image to the one created in Docker Hub

```
docker image tag docker-previous-image docker-new-image-name(from docker hub)
```

Build and push the image to Docker Hub

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-api
```

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push augini/docker-node-app
```

Pull the image in production server

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
```

Start the services in production server

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
