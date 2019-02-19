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
export AWS_ENV="dev" && export PROFILE="fpw$AWS_ENV"

docker build -t forgotpw/forgotpw-webapp:latest .

# pip install iam-docker-run
iam-docker-run \
  --image forgotpw/forgotpw-webapp:latest \
  --profile $PROFILE \
  -e AWS_ENV=$AWS_ENV \
  --full-entrypoint "bash /app/deploy.sh"
```

## Deploy - Prod

```shell
export AWS_ENV="prod" && export PROFILE="fpw$AWS_ENV"

docker build -t forgotpw/forgotpw-webapp:latest .

# pip install iam-docker-run
iam-docker-run \
  --image forgotpw/forgotpw-webapp:latest \
  --profile $PROFILE \
  -e AWS_ENV=$AWS_ENV \
  --full-entrypoint "bash /app/deploy.sh"
```
