# Forgotpw Webapp

Angular front-end for forgotpw.com.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy - Dev

```shell
ng build
SUBDOMAIN="www-dev" \
aws s3 cp \
  ./dist/forgotpw-webapp/ \
  s3://$SUBDOMAIN.forgotpw.com/ \
  --recursive
```

## Deploy - Prod

```shell
ng build --prod --configuration=prod
SUBDOMAIN="www" \
aws s3 cp \
  ./dist/forgotpw-webapp/ \
  s3://$SUBDOMAIN.forgotpw.com/ \
  --recursive
```
