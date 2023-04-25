FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk update && \
    apk add bash
COPY docker/entrypoint.sh /opt/
COPY docker/nginx-default-template.conf /app/
COPY --from=builder /app/out /app/html-template
ENV NEXT_PUBLIC_XMTP_API_URL=PLACEHOLDER_XMTP_API_URL
CMD ["/opt/entrypoint.sh"]
