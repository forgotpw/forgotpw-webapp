#!/bin/bash

set -e

# This script intended to be run inside Docker with AWS credentials passed
# in from iam-docker-run.  See README.md for example deployment usage.

if [ -z "$AWS_ENV" ]; then
    echo "Must provide AWS_ENV environment variable"
    exit 1
fi

if [ "$AWS_ENV" == "prod" ]; then
  ng build  --prod --configuration=production
  export SUBDOMAIN="app"
else
  ng build
  export SUBDOMAIN="app-dev"
fi

aws s3 cp \
  ./dist/forgotpw-webapp/ \
  s3://$SUBDOMAIN.forgotpw.com/ \
  --recursive
