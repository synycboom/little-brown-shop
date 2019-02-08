# Little Brown Shop

###### Demo: https://test.synycboom.com

###### Github: https://github.com/synycboom/little-brown-shop

### Caveat

1. In the website you can see that it has a barcode search box which can be used with a barcode scanner, but the provided api doesn't has a barcode field, so you have to use 'ID' of the book instead of a barcode.

### Project setup for local development

This project requires nodejs and yarn, so please install them first then install dependencies using this command.

```
$ yarn install
```

You can run a development server via this command

```
$ yarn serve
```

### Deployment

Firstly, you have to clone this project to your vm, and install the following requirements.

1. Docker
2. Docker Compose

Create an env file for caddy server and configure a domain name.

```
$ touch .env.caddy
```

For configuration, check out .env.caddy.example. If you don't have a real domain name just leave it as '0.0.0.0:80'

After everything is ready, you should be able to build and run the application via this command.

```
$ docker-compose -f docker-compose.yml up -d
```
