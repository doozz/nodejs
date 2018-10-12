# docker filel

相关软件版本：  
>PHP 7.2  
 MySQL 5.7  
 Nginx 1.12  
 Redis 3.2

PHP 拓展：
>redis 3.1.4  
Phalcon 3.3.1


## 目录
```shell
- logs 
--|-- mysql
--|-- nginx
--|-- php
--|-- redis 
- service 
--|-- docker-compose.yml
--|-- mysql
----|-- Dockerfile
--|-- nginx
----|-- conf.d
----|-- Dockerfile
--|-- php
----|-- Dockerfile
--|-- redis
----|-- Dockerfile
```
## docker-compose.yml

<!-- add docs here for user -->

Docker Compose 是一个用来定义和运行复杂应用的Docker工具。一个使用Docker容器的应用，通常由多个容器组成。使用Docker Compose不再需要使用shell脚本来启动容器,可以是用 .yml 或 .yaml 作为文件扩展名。


```bash
version: '3.4' #docker版本
services:	
  nginx:
  	container_name: nginx
    build: ./nginx
    depends_on:
      - php-fpm
    links:
      - php-fpm:php-fpm
    volumes:
      - ../www:/data/www:rw
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ../logs/nginx:/var/log/nginx
    ports:
      - "8080:8080"
    restart: always
    command: nginx -g 'daemon off;'

  php-fpm:
  	container_name: php
    build: ./php
    ports:
      - "9000:9000"
    links:
      - mysql-db:mysql-db
      - redis-db:redis-db
    volumes:
      - ../www:/data/www:rw
      - ./php/php.ini:/usr/local/etc/php/php.ini:ro # 当前php配置文件；可以拷贝修改php-dev.ini为想要的配置
      - ./php/php-fpm.conf:/usr/local/etc/php-fpm.conf:ro
      - ../logs/php-fpm:/var/log/php-fpm:rw
    restart: always
    command: php-fpm
    
  mysql-db:
  	  container_name: mysql_db
      build: ./mysql
      ports:
        - "3306:3306"
      volumes:
        - ../data/mysql:/var/lib/mysql:rw
        - ../logs/mysql:/var/lib/mysql-logs:rw
        - ./mysql/conf.d:/etc/mysql/conf.d:ro
      environment:
        MYSQL_ROOT_PASSWORD: 123456
        MYSQL_USER: test
        MYSQL_PASSWORD: 123456
      restart: always
      command: "--character-set-server=utf8"

  redis-db:
  	   container_name: redis_db
      build: ./redis
      ports:
        - "6379:6379"
      volumes:
        - ../data/redis:/data
      restart: always
    
```
  
### Nginx

```bash
FROM nginx:1.12

#  set timezome
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


```

### Php
```bash
FROM php:7.2-fpm
MAINTAINER doozz 

#  设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#  更新安装依赖包和PHP核心拓展
RUN apt-get update && apt-get install -y \
        git \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libmagickwand-dev \
        libmagickcore-dev \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
        && docker-php-ext-install zip \
        && docker-php-ext-install pdo_mysql \
        && docker-php-ext-install opcache \
        && docker-php-ext-install mysqli \
        && rm -r /var/lib/apt/lists/*

# 安装yaf,redis扩长
RUN curl -fsSL 'http://pecl.php.net/get/yaf-3.0.5.tgz' -o yaf-3.0.5.tgz \
    && mkdir -p /tmp/yaf \
    && tar -zxvf yaf-3.0.5.tgz -C /tmp/yaf --strip-components=1 \
    && rm yaf-3.0.5.tgz \
    && docker-php-ext-configure /tmp/yaf --enable-yaf \
    && docker-php-ext-install /tmp/yaf \
    && rm -r /tmp/yaf \
    
    && curl -fsSL 'http://pecl.php.net/get/yac-2.0.2.tgz' -o yac-2.0.2.tgz \
    && mkdir -p /tmp/yac \
    && tar -zxvf yac-2.0.2.tgz -C /tmp/yac --strip-components=1 \
    && rm yac-2.0.2.tgz \
    && docker-php-ext-configure /tmp/yac --enable-yac \
    && docker-php-ext-install /tmp/yac \
    && rm -r /tmp/yac \
    
    && curl -fsSL 'http://pecl.php.net/get/redis-3.1.4.tgz' -o redis-3.1.4.tgz \
    && mkdir -p /tmp/redis \
    && tar -zxvf redis-3.1.4.tgz -C /tmp/redis --strip-components=1 \
    && rm redis-3.1.4.tgz \
    && docker-php-ext-configure /tmp/redis --enable-redis \
    && docker-php-ext-install /tmp/redis \
    && rm -r /tmp/redis \



```

### Mysql
```bash
FROM mysql:5.7

#  set timezome
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


```

### Redis
```bash
FROM redis:3.2

#  set timezome
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


```
