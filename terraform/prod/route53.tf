# route53 zone created in forgotpw-infrastructure git repo
data "aws_route53_zone" "www" {
  name         = "${var.website_subdomain}.forgotpw.com"
  private_zone = false
}

resource "aws_route53_record" "www" {
  zone_id = "${data.aws_route53_zone.www.zone_id}"
  name    = "${var.website_subdomain}.forgotpw.com"
  type    = "A"

  # alias {
  #   name = "${aws_s3_bucket.www.website_domain}"
  #   zone_id = "${aws_s3_bucket.www.hosted_zone_id}"
  #   evaluate_target_health = false
  # }
  alias {
    name = "${aws_cloudfront_distribution.cdn.domain_name}"
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-ipv6" {
  zone_id = "${data.aws_route53_zone.www.zone_id}"
  name    = "${var.website_subdomain}.forgotpw.com"
  type    = "AAAA"

  # alias {
  #   name = "${aws_s3_bucket.www.website_domain}"
  #   zone_id = "${aws_s3_bucket.www.hosted_zone_id}"
  #   evaluate_target_health = false
  # }
  alias {
    name = "${aws_cloudfront_distribution.cdn.domain_name}"
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}
