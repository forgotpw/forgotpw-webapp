# Forgotpw Webapp

Angular front-end for forgotpw.com.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Build within Docker

```shell
docker build -t forgotpw/forgotpw-webapp:latest .
docker run -it -p 4430:443 forgotpw/forgotpw-webapp:latest
```

## Develop within Docker

```shell
docker build -t forgotpw/forgotpw-webapp:latest .
docker run -it -p 4200:4200 -v $(pwd):/src --entrypoint npm forgotpw/forgotpw-webapp:latest start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy - Dev

```shell
ng build
export AWS_ENV="dev" && export PROFILE="fpw$AWS_ENV"
export SUBDOMAIN="www-dev"
aws s3 cp \
  ./dist/forgotpw-webapp/ \
  s3://$SUBDOMAIN.forgotpw.com/ \
  --recursive \
  --profile $PROFILE
```

## Deploy - Prod

```shell
ng build --prod --configuration=production
export AWS_ENV="prod" && export PROFILE="fpw$AWS_ENV"
export SUBDOMAIN="www"
aws s3 cp \
  ./dist/forgotpw-webapp/ \
  s3://$SUBDOMAIN.forgotpw.com/ \
  --recursive \
  --profile $PROFILE
```
