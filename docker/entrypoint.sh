#!/bin/bash
PORT="${PORT:-3000}"
XMTP_API_URL="${XMTP_API_URL:-http://localhost}"
find .next -type f -print0 | xargs -0 sed -i -e "s|PLACEHOLDER_XMTP_API_URL|${XMTP_API_URL}|g"
npm run start -- -p "${PORT}"
