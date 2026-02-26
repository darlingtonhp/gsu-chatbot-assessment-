# GSU SmartAssist API Documentation

This document describes the API endpoints for the GSU SmartAssist university chatbot.

## Authentication
Admin endpoints require token-based authentication (Laravel Sanctum). Use the `/login` web interface to obtain a session or provide a `Bearer` token in the `Authorization` header.

## Public Endpoints

### Chat API
**POST** `/api/chat`

Handles incoming chat messages from users.

- **Request Body:**
  ```json
  {
    "message": "What are the admission requirements?",
    "session_id": "unique-session-guid"
  }
  ```
- **Response:**
  ```json
  {
    "response": "The admission requirements for undergraduate programmes at GSU...",
    "session_id": "unique-session-guid"
  }
  ```
- **Security:** Rate limited to 60 requests per minute.

### FAQ API
**GET** `/api/faqs`

Returns a list of all publicly available FAQs.

- **Response:**
  ```json
  [
    {
      "id": 1,
      "category": "Admissions",
      "question": "How do I apply?",
      "answer": "You can apply online via the GSU portal...",
      "keywords": "apply, admission, portal"
    }
  ]
  ```

## Admin Endpoints
(Require `auth:sanctum` middleware)

### Manage FAQs
- **GET** `/api/admin/faqs`: List all FAQs.
- **POST** `/api/admin/faqs`: Create a new FAQ.
- **GET** `/api/admin/faqs/{id}`: View a specific FAQ.
- **PUT** `/api/admin/faqs/{id}`: Update an FAQ.
- **DELETE** `/api/admin/faqs/{id}`: Delete an FAQ.

### Chat Logs
**GET** `/api/admin/chat-logs`

Returns a list of all chat sessions and logs for review by administrators.
