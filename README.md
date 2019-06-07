# Forgotpw Webapp

**NOTE: Rosa (www.rosa.bot) is the new name for ForgotPW**

Angular front-end for forgotpw.com.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Setup

Install local dependencies needed for performing deployments and tests

```shell
pip install iam-starter iam-docker-run ssm-starter
```

## Build within Docker

```shell
docker build -t forgotpw/forgotpw-webapp:latest .
docker run -it -p 4430:443 forgotpw/forgotpw-webapp:latest
```

## Develop within Docker

```shell
docker build -t forgotpw/forgotpw-webapp:latest .
docker run -it -p 4200:4200 -v $(pwd)/src:/app/src --entrypoint npm forgotpw/forgotpw-webapp:latest start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy - Dev

Apply Terraform, then execute deployment script:

```shell
export AWS_ENV="dev" && export PROFILE="fpw$AWS_ENV"

docker build -t forgotpw/forgotpw-webapp:latest .

iam-docker-run \
  --image forgotpw/forgotpw-webapp:latest \
  --profile $PROFILE \
  -e AWS_ENV=$AWS_ENV \
  --full-entrypoint "bash /app/deploy.sh"
```

## Deploy - Prod

Apply Terraform, then execute deployment script:

```shell
export AWS_ENV="prod" && export PROFILE="fpw$AWS_ENV"

docker build -t forgotpw/forgotpw-webapp:latest .

iam-docker-run \
  --image forgotpw/forgotpw-webapp:latest \
  --profile $PROFILE \
  -e AWS_ENV=$AWS_ENV \
  --full-entrypoint "bash /app/deploy.sh"
```

## Mock an Authorized Request for testing the store and retrieve forms

Use the mockAuthorizedRequest function from the forgotpw-restapi-lambda git repo to generate a valid arid to use for testing the forms which rely on this existing.  Normally this would be created by the forgotpw-lex-handler-lambda service from interacting with the Store Password intent with the Lex bot, which generates a hyperlink to this web app with the arid on the querystring.

*NOTE: mockAuthorizedRequest.js is in the `forgotpw-restapi-lambda` git repo.  Clone that repo and run the below command from that path.*

```shell
export AWS_REGION="us-east-1"
export AWS_ENV="dev" && export PROFILE="fpw$AWS_ENV"
AWS_ENV= iam-starter \
    --role role-ops-devops \
    --profile $PROFILE \
    --command ssm-starter \
    --ssm-name /fpw/ \
    --command node mockAuthorizedRequest.js abc999 609-555-1212 testapp 0
```
