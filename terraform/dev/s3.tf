# used to hide the development website from search engines / users
# variable "website_allowed_ip_range" {
#   description = "The CIDR range allowed to view the website. Use 0.0.0.0/0 for prod."
# }

resource "aws_s3_bucket" "www" {
    bucket = "${var.website_subdomain}.forgotpw.com"
    acl = "public-read"

#     policy = <<POLICY
# {
#   "Version":"2012-10-17",
#   "Statement": [
#     {
#       "Sid": "PublicReadForGetBucketObjects",
#       "Effect": "Allow",
#       "Principal": "*",
#       "Action": [
#         "s3:GetObject"
#       ],
#       "Resource": "arn:aws:s3:::${var.website_subdomain}.forgotpw.com/*",
#       "Condition": {
#          "IpAddress": { "aws:SourceIp": "${var.website_allowed_ip_range}" }
#       }
#     }
#   ]
# }
# POLICY

policy = <<POLICY
{
  "Version":"2008-10-17",
  "Statement":[{
    "Sid":"AllowPublicRead",
    "Effect":"Allow",
    "Principal": {"AWS": "*"},
    "Action":["s3:GetObject"],
    "Resource":["arn:aws:s3:::${var.website_subdomain}.forgotpw.com/*"]
  }]
}
POLICY

    website {
        index_document = "index.html"
        error_document = "404.html"
#         routing_rules = <<EOF
# [{
#     "Condition": {
#         "HttpErrorCodeReturnedEquals": "404"
#     },
#     "Redirect": {
#         "HostName": "${var.website_subdomain}.forgotpw.com",
#         "Protocol": "https",
#         "ReplaceKeyPrefixWith": "#/"
#     }
# }]
# EOF
    }

}
