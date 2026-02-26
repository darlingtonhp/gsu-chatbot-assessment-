# Docker Setup Guide

This guide will help you get GSU SmartAssist running on your local machine using Docker.

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Git](https://git-scm.com/) (optional, if cloning).

## Step-by-Step Instructions

### 1. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Ensure your database settings in `.env` match the ones in `docker-compose.yml` (default for Docker):
```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=gsu_chatbot
DB_USERNAME=gsu_user
DB_PASSWORD=secret
```

### 2. Build and Start Containers
Run the following command in your terminal:
```bash
docker-compose up -d --build
```
This will:
- Build the PHP application image.
- Start the MySQL database.
- Start the Nginx web server.

### 3. Initialize the Application
Once the containers are running, you need to install dependencies and run migrations:
```bash
# Install PHP dependencies
docker-compose exec app composer install

# Generate application key
docker-compose exec app php artisan key:generate

# Run migrations and seeders
docker-compose exec app php artisan migrate --seed

# Install Frontend dependencies and build
docker-compose exec app npm install
docker-compose exec app npm run build
```

### 4. Access the App
Open your browser and navigate to:
[http://localhost:8080](http://localhost:8080)

## Useful Commands
- **Stop containers**: `docker-compose stop`
- **View logs**: `docker-compose logs -f`
- **Run artisan commands**: `docker-compose exec app php artisan <command>`
- **Down/Remove containers**: `docker-compose down`
