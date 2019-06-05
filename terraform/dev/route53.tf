# route53 zone created in forgotpw-infrastructure git repo
data "aws_route53_zone" "app" {
  name         = "${var.webapp_subdomain}.rosa.bot"
  private_zone = false
}

resource "aws_route53_record" "app" {
  zone_id = "${data.aws_route53_zone.app.zone_id}"
  name    = "${var.webapp_subdomain}.rosa.bot"
  type    = "A"

  # alias {
  #   name = "${aws_s3_bucket.app.website_domain}"
  #   zone_id = "${aws_s3_bucket.app.hosted_zone_id}"
  #   evaluate_target_health = false
  # }
  alias {
    name = "${aws_cloudfront_distribution.cdn.domain_name}"
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "app-ipv6" {
  zone_id = "${data.aws_route53_zone.app.zone_id}"
  name    = "${var.webapp_subdomain}.rosa.bot"
  type    = "AAAA"

  # alias {
  #   name = "${aws_s3_bucket.app.website_domain}"
  #   zone_id = "${aws_s3_bucket.app.hosted_zone_id}"
  #   evaluate_target_health = false
  # }
  alias {
    name = "${aws_cloudfront_distribution.cdn.domain_name}"
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}
