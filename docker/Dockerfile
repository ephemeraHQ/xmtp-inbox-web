FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_INFURA_ID
ENV VITE_INFURA_ID=${VITE_INFURA_ID}
RUN npm run build

FROM nginx:alpine
RUN apk update && \
    apk add bash
COPY docker/entrypoint.sh /opt/
COPY docker/nginx-default-template.conf /app/
COPY --from=builder /app/out /app/html-template
ENV VITE_XMTP_API_URL=PLACEHOLDER_XMTP_API_URL
CMD ["/opt/entrypoint.sh"]
