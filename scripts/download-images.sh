#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images/products public/images/editorial

ua="auto=format&fit=crop&w=900&h=1200&q=80"   # product portrait
ue="auto=format&fit=crop&w=1400&h=1700&q=80"  # editorial / hero

dl() { # url  dest
  echo "→ $2"
  curl -fsSL "$1" -o "$2"
}

# Products (filename = product slug)
dl "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?$ua" public/images/products/boxy-heavyweight-tee.jpg
dl "https://images.unsplash.com/photo-1511629091441-ee46146481b6?$ua" public/images/products/garment-dyed-hoodie.jpg
dl "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?$ua" public/images/products/wide-pleated-trouser.jpg
dl "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?$ua" public/images/products/wool-blend-overshirt.jpg
dl "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?$ua" public/images/products/technical-cargo-pant.jpg
dl "https://images.unsplash.com/photo-1469334031218-e382a71b716b?$ua" public/images/products/ribbed-merino-crew.jpg
dl "https://images.unsplash.com/photo-1548126032-079a0fb0099d?$ua" public/images/products/cropped-bomber-jacket.jpg
dl "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?$ua" public/images/products/relaxed-oxford-shirt.jpg
dl "https://images.unsplash.com/photo-1614786269829-d24616faf56d?$ua" public/images/products/chunky-cardigan.jpg
dl "https://images.unsplash.com/photo-1495385794356-15371f348c31?$ua" public/images/products/wool-topcoat.jpg
# photo-1501979376754-7ff2d6b6e8ba 404'd at download time; substituted a similar knit beanie
dl "https://images.unsplash.com/photo-1576566588028-4147f3842f27?$ua" public/images/products/lambswool-beanie.jpg
# photo-1582418702059-97ebba76f3b5 404'd at download time; substituted a similar denim shot
dl "https://images.unsplash.com/photo-1542272604-787c3835535d?$ua" public/images/products/straight-leg-denim.jpg

# Editorial / hero / nav previews / account / pdp detail
dl "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?$ue" public/images/editorial/hero.jpg
dl "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?$ue" public/images/editorial/making.jpg
dl "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?$ue" public/images/editorial/lookbook-hero.jpg
dl "https://images.unsplash.com/photo-1516257984-b1b4d707412e?$ue" public/images/editorial/lookbook-2.jpg
dl "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?$ue" public/images/editorial/account.jpg
dl "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&h=700&q=80" public/images/editorial/pdp-detail-1.jpg
dl "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&h=700&q=80" public/images/editorial/pdp-detail-2.jpg

echo "Done."
