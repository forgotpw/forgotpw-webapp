provider "aws" {
  region  = "${var.aws["region"]}"
  profile = "${var.aws["profile"]}"
  version = "~> 1.28.0"
}

variable "aws" {
  default = {
    region  = "us-east-1"
    profile = "fpwdev-terraform"
  }
}

variable "environment" {
  default = "dev"
}

variable "aws_account_id" {
  default = "478543871670"
}

variable "region" {
  default = "us-east-1"
}

variable "apigateway_subdomain" {
  default = "api-dev"
}

variable "webapp_subdomain" {
  default = "app-dev"
}

variable "website_subdomain" {
  default = "www-dev"
}
