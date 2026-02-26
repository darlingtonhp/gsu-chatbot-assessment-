# GSU SmartAssist

GSU SmartAssist is an intelligent university chatbot designed for Gwanda State University (GSU). It helps students, staff, and applicants with admissions, fee inquiries, support, and general information.

## Tech Stack
- **Backend**: Laravel 11
- **Frontend**: React + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **AI**: OpenAI GPT-3.5 Turbo
- **WhatsApp**: Evolution API (Unverified Bridge)

## Features
- 🚀 **Context-Aware Chat**: Session-aware responses with FAQ-first matching and AI fallback.
- 🔐 **Admin Security**: Admin-only middleware for dashboard pages and admin API endpoints.
- 🧭 **Responsive UI Suite**: Redesigned public chat, FAQ discovery, and admin management screens.

## Repository Structure
This project uses a modern **monolith architecture** with Laravel and Inertia.js.
- `/app`, `/routes`, `/database`: Laravel Backend.
- `/resources/js`: React Frontend (Inertia.js components).
- `/docs`: Project documentation and architecture diagrams.
- `/public`: Compiled assets and entry point.

## Architecture
GSU SmartAssist uses a **Service-Layer Pattern** on the backend to separate business logic from controllers. The frontend is built with **React + Inertia.js**, providing a seamless SPA experience with Laravel's robust routing.

See [Architecture Documentation](docs/architecture-diagram.md) for details.

## API Documentation
Full API details are available in the [API Documentation](docs/api-documentation.md).

## Setup Instructions

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & NPM
- MySQL

### Steps
1. **Clone & Install Dependencies**:
   ```bash
   composer install
   npm install
   ```
2. **Environment Configuration**:
   - Copy `.env.example` to `.env`.
   - Configure `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.
   - (Optional) Add `OPENAI_API_KEY` for AI features.
3. **Database Setup**:
   - Create the database specified in `.env`.
   - Run migrations and seed the database:
     ```bash
     php artisan migrate --seed
     ```
4. **Build Assets**:
   ```bash
   npm run dev
   ```
5. **Run the App**:
   ```bash
   php artisan serve
   ```

### 🚢 Deployment
For production deployment instructions, please see the [Deployment Guide](docs/deployment.md).

### 🐳 Docker (Local Development)
To run the project locally using Docker, follow the [Docker Setup Guide](docs/docker-setup.md).

### 🤖 OpenAI Setup
To use the AI fallback features:
1. **Get an API Key**: Sign up at [OpenAI Platform](https://platform.openai.com/) and create a new API key.
2. **Add Credits**: OpenAI is a paid service. Ensure you have an active billing method or remaining trial credits.
3. **Configure .env**: Add your key to the `.env` file:
   ```bash
   OPENAI_API_KEY=your_key_here
   ```

## Admin Access
- **URL**: `/login`
- **Email**: `admin@gsu.ac.zw`
- **Password**: `admin123!`

## Assessment Requirement Alignment
- **Chat API**: `POST /api/chat` with validation and rate limiting.
- **FAQ API**: `GET /api/faqs` and admin CRUD endpoints under `/api/admin/faqs`.
- **Chat Logging**: Admin access to `GET /api/admin/chat-logs`.
- **Context Handling**: Chat service uses session history + weighted FAQ matching before AI fallback.
- **Security**: Admin-only middleware applied to `/dashboard`, `/admin/*`, and `/api/admin/*`.
- **Frontend Requirements**: Responsive chat interface, FAQ page, admin login, and admin dashboard workflows.

## Documentation
- [Architecture Diagram](docs/architecture-diagram.md)
- [API Documentation](docs/api-documentation.md)

## Challenges Faced
1. **Context Management**: Ensuring the AI stays within the bounds of university information while being helpful.
2. **Security/UX Balance**: Implementing rate limiting to protect the API while ensuring a smooth experience for legitimate users.

## Future Improvements
- 🌍 **Multilingual Support**: Add Ndebele and Shona language detection and translation.
- 📊 **Analytics Dashboard**: Add visual charts for popular questions and AI performance metrics.
- 📱 **Mobile App**: Develop a lightweight Flutter companion.
- 🛡️ **Advanced NLP**: Implement Vector Search (Pinecone/Milvus) for better semantic matching in the knowledge base.
