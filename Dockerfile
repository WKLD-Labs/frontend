FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM alpine:3.17

# Install Lighttpd and required packages
RUN apk add --no-cache lighttpd

# Create directory for Lighttpd configuration
RUN mkdir -p /etc/lighttpd

# Copy Lighttpd configuration file
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf

# Copy built artifacts
WORKDIR /var/www/localhost/htdocs
COPY --from=build-stage /app/dist .

# Expose port and start Lighttpd
EXPOSE 8080
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]