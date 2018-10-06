# used to hide the development website from search engines / users
variable "website_allowed_ip_range" {
  description = "The CIDR range allowed to view the website. Use 0.0.0.0/0 for prod."
}
