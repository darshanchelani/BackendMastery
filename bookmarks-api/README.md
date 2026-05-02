# Bookmarks API

A production-skeleton REST API for managing personal bookmarks, built with TypeScript, Express, and strict layered architecture.

## Overview

This service demonstrates engineering habits designed for long-term backend growth:

- Input validation at the API boundary with Zod
- Predictable, unified response envelopes
- Layered architecture with clean separation of concerns
- Centralized error handling with operational error taxonomy
- Environment-first configuration with schema validation
- Structured logging and graceful process shutdown

## Tech Stack

- Node.js 18+
- TypeScript
- Express
- Zod
- UUID generation via crypto.randomUUID
- In-memory repository abstraction with Map

## Project Structure

```text
src/
  app.ts
  server.ts
  config/
    env.ts
  errors/
    AppError.ts
  middlewares/
    validate.ts
    errorHandler.ts
  modules/
    bookmarks/
      bookmark.schema.ts
      bookmark.types.ts
      bookmarks.routes.ts
      bookmarks.controller.ts
      bookmarks.service.ts
      bookmarks.repository.interface.ts
      bookmarks.inmemory.repository.ts
  types/
    api.ts
  utils/
    logger.ts
    response.ts
```

Architecture flow:

```text
Routes -> Controllers -> Services -> Repository Interface -> InMemory Repository
```

## Data Model

Bookmark resource:

- id: string (UUID, auto-generated)
- url: string (required, valid URL)
- title: string (required, 1 to 200 chars)
- tags: string[] (optional, non-empty strings)
- createdAt: string (ISO timestamp, auto-generated)

## Environment Configuration

Environment variables are validated in src/config/env.ts using Zod.

Create your local file from the template:

```bash
cp .env.example .env
```

Default variables:

```env
PORT=3000
NODE_ENV=development
```

## Local Development

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run production build:

```bash
npm start
```

## Docker

Build image:

```bash
docker build -t bookmarks-api:latest .
```

Run container:

```bash
docker run --rm -p 3000:3000 --env-file .env bookmarks-api:latest
```

Health check:

```bash
curl http://localhost:3000/health
```

## API Endpoints

Base URL: http://localhost:3000

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /health            | Service health check |
| GET    | /api/bookmarks     | List all bookmarks   |
| GET    | /api/bookmarks/:id | Get bookmark by id   |
| POST   | /api/bookmarks     | Create a bookmark    |
| PUT    | /api/bookmarks/:id | Update a bookmark    |
| DELETE | /api/bookmarks/:id | Delete a bookmark    |

## Response Envelope

Every response uses this shape:

```json
{
  "success": true,
  "message": "string",
  "data": {},
  "timestamp": "2026-05-02T00:00:00.000Z"
}
```

Error responses include an error object:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "url",
        "message": "url must be a valid URL"
      }
    ]
  },
  "data": null,
  "timestamp": "2026-05-02T00:00:00.000Z"
}
```

## Example Requests

Create bookmark:

```bash
curl -X POST http://localhost:3000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "title": "Example",
    "tags": ["docs", "reference"]
  }'
```

Update bookmark:

```bash
curl -X PUT http://localhost:3000/api/bookmarks/<bookmark-id> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "tags": ["updated"]
  }'
```

Delete bookmark:

```bash
curl -X DELETE http://localhost:3000/api/bookmarks/<bookmark-id>
```

## Operational Notes

- Validation happens before controller execution.
- Services are framework-agnostic and do not depend on Express request/response objects.
- Global error middleware standardizes all error outputs.
- SIGINT and SIGTERM trigger graceful HTTP shutdown.
- unhandledRejection and uncaughtException are logged and trigger shutdown.
