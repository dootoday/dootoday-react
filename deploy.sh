#!/bin/sh

aws s3 sync build/ s3://doo.today --delete --acl public-read
aws cloudfront create-invalidation --distribution-id E1YMUM1O0DK7CN --paths "/*"