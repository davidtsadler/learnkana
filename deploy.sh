#!/usr/bin/env bash

# Build site
grunt build:dist

# CSS (Cache: expire in 1 week)
s3cmd sync --acl-public --exclude '*.*' --include '*.css' --add-header="Cache-Control: max-age=604800"  dist/css/ s3://learnkana.net/css/

# Javascript (Cache: expire in 1 week)
s3cmd sync --acl-public --exclude '*.*' --include '*.js' --add-header="Cache-Control: max-age=604800"  dist/js/ s3://learnkana.net/js/

# HTML (Cache: 1 week)
s3cmd sync --acl-public --exclude '*.*' --include  '*.html' --add-header="Cache-Control: max-age=604800, must-revalidate" dist/ s3://learnkana.net/

# Robots.txt (Cache: expire in 10weeks)
s3cmd sync --acl-public --exclude '*.*' --include 'robots.txt' --add-header="Expires: Sat, 21 Nov 2020 00:00:00 GMT" --add-header="Cache-Control: max-age=6048000"  dist/ s3://learnkana.net/

# Sync: remaining files & delete removed
s3cmd sync --acl-public --delete-removed  dist/ s3://learnkana.net/
