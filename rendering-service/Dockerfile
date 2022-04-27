FROM node:14-buster

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    wget \
    locales \
    #wkhtmltopdf dependenсies
    libxrender1 \
    xfonts-75dpi \
    xfonts-base \
    && \
    mkdir /temp && \
    wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb -O /temp/wkhtmltox.deb && \
    dpkg -i /temp/wkhtmltox.deb && \
    rm -rf /temp

RUN localedef --inputfile ru_RU --force --charmap UTF-8 --alias-file /usr/share/locale/locale.alias ru_RU.UTF-8
ENV LANG ru_RU.utf8

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 8000

CMD ["node", "dist/main"]
