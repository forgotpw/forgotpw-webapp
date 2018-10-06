resource "aws_s3_bucket" "www" {
    bucket = "${var.website_subdomain}.forgotpw.com"
    acl = "public-read"

    policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::${var.website_subdomain}.forgotpw.com/*",
      "Condition": {
         "IpAddress": { "aws:SourceIp": "${var.website_allowed_ip_range}" }
      }
    }
  ]
}
POLICY

    website {
        index_document = "index.html"
        error_document = "404.html"
    }

}
