FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG INFURA_ID
ENV INFURA_ID=${INFURA_ID}
RUN npm run build

FROM nginx:alpine
RUN apk update && \
    apk add bash
COPY docker/entrypoint.sh /opt/
COPY docker/nginx-default-template.conf /app/
COPY --from=builder /app/out /app/html-template
ENV XMTP_API_URL=PLACEHOLDER_XMTP_API_URL
CMD ["/opt/entrypoint.sh"]
