# Deployment Guide

This guide provides step-by-step instructions for deploying GSU SmartAssist to a production server (Ubuntu/Nginx).

## 1. Server Requirements
- PHP 8.2+ with necessary extensions (bcmath, ctype, fileinfo, json, mbstring, openssl, pdo, tokenizer, xml)
- MySQL 8.0+
- Nginx or Apache
- Composer
- Node.js & NPM (for building assets)

## 2. Server Setup
1. **Clone the repository**:
   ```bash
   git clone <repository-url> /var/www/gsu-chatbot
   ```
2. **Install Dependencies**:
   ```bash
   composer install --optimize-autoloader --no-dev
   npm install
   npm run build
   ```
3. **Configure Permissions**:
   ```bash
   chown -R www-data:www-data /var/www/gsu-chatbot/storage
   chown -R www-data:www-data /var/www/gsu-chatbot/bootstrap/cache
   ```

## 3. Environment Configuration
Create a `.env` file and set:
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://yourdomain.com`
- `DB_DATABASE=gsu_chatbot`
- `DB_USERNAME=your_db_user`
- `DB_PASSWORD=your_db_password`
- `OPENAI_API_KEY=your_openai_key`

## 4. Optimization
Run these commands to speed up your production app:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

## 5. Nginx Configuration (Example)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/gsu-chatbot/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```
