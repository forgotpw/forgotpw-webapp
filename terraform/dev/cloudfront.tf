resource "aws_cloudfront_distribution" "cdn" {
  origin {
    origin_id   = "${var.website_subdomain}.forgotpw.com"
    domain_name = "${var.website_subdomain}.forgotpw.com.s3.amazonaws.com"
  }

  # If using route53 aliases for DNS we need to declare it here too, otherwise we'll get 403s.
  aliases = ["${var.website_subdomain}.forgotpw.com"]

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    # allow all methods for CORS
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.website_subdomain}.forgotpw.com"

    forwarded_values {
      query_string = true
      headers = ["Access-Control-*", "Origin"]
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300  # 3600
    max_ttl                = 3600 # 86400
    compress               = true
  }

  # The cheapest priceclass
  price_class = "PriceClass_100"

  # This is required to be specified even if it's not used.
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.www.arn}"
    minimum_protocol_version = "TLSv1"
    ssl_support_method = "sni-only"
  }
}

data "aws_acm_certificate" "www" {
  domain   = "*.${var.website_subdomain}.forgotpw.com"
  statuses = ["ISSUED"]
}
