FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    libpq-dev \
    zip \
    unzip
    
# Install PHP extensions
RUN docker-php-ext-install pdo_pgsql


# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www
