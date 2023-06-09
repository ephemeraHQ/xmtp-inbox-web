#!/bin/bash

# Render /etc/nginx/conf.d/default.conf from template.
export PORT="${PORT:-3000}"
envsubst '$PORT' < /app/nginx-default-template.conf > /etc/nginx/conf.d/default.conf

# Render /usr/share/nginx/html from template.
XMTP_API_URL="${XMTP_API_URL:-http://localhost}"
template_dir="/app/html-template"
out_dir="/usr/share/nginx/html"
rm -rf "${out_dir}"
cp -r "${template_dir}" "${out_dir}"
find "${out_dir}" -type f -print0 | xargs -0 sed -i -e "s|PLACEHOLDER_XMTP_API_URL|${XMTP_API_URL}|g"

# Start nginx.
nginx -g "daemon off;"
