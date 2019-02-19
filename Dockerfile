# FROM ubuntu:18.04
FROM node:8.15.0-jessie

RUN apt-get update && \
    apt-get install -y \
        python-pip \
        python-dev \
        build-essential \
        libyaml-dev \
        nginx

RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx

RUN mkdir -p /etc/nginx/conf.d/certs && \
	openssl req -x509 -newkey rsa:2048 \
	-keyout /etc/nginx/conf.d/certs/server.key \
	-out /etc/nginx/conf.d/certs/server.cer \
	-days 1460 -nodes -subj "/C=US/ST=New Jersey/L=Princeton/O=CommerceSong/CN=forgotpw.com"

WORKDIR /app

COPY ./package.json .

RUN npm install -g @angular/cli

# aws cli used to copy files to s3 in deploy mode
RUN pip install awscli

COPY . .

#RUN ng build  --prod --configuration=production
RUN ng build

RUN cp -r /app/dist/forgotpw-webapp/* /usr/share/nginx/html

EXPOSE 4200
EXPOSE 443

ENTRYPOINT nginx -g 'daemon off;'
