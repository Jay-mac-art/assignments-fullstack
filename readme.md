# Interview Generator Full-Stack Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Dev-green)]()

A modern interview question generator that leverages user profiles and AI to produce tailored technical questions. Built with a **React + Vite** frontend and a **NestJS + TypeORM** backend, integrating with OpenRouter LLM for smart question generation.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Environment Variables](#environment-variables)
   * [Backend Setup](#backend-setup)
   * [Frontend Setup](#frontend-setup)
5. [Usage](#usage)

   * [Authentication Flow](#authentication-flow)
   * [Profile Management](#profile-management)
   * [Generating Questions](#generating-questions)
6. [API Endpoints](#api-endpoints)
7. [License](#license)

---

## Features

* 🔒 JWT-based authentication (login, register, logout)
* 📝 Editable user profile (skills, technologies, bio)
* 🤖 AI-driven question generation with configurable count, skills, and experience level
* 🎨 Sleek UI with animations (Framer Motion, TailwindCSS)
* 🌐 CORS-enabled NestJS API with global `/api` prefix

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Frontend   | React, Vite, TypeScript |
| Styling    | TailwindCSS             |
| Animations | Framer Motion           |
| Backend    | NestJS, TypeScript      |
| ORM        | TypeORM (PostgreSQL)    |
| AI         | OpenRouter LLM          |
| Auth       | JWT                     |

---

## Project Structure

```
/                  # Root
├── client/        # Frontend (Vite + React)
│   ├── .env       # VITE_BE_API_URL
│   ├── src/
│   │   ├── assets/           # Static files (images)
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # AuthContext
│   │   ├── pages/            # Page-level views
│   │   ├── store/            # Zustand store (optional)
│   │   └── types/            # TypeScript types
│   ├── index.html            # HTML template
│   └── vite.config.ts        # Vite configuration
│
├── server/        # Backend (NestJS)
│   ├── .env       # DB & service keys
│   ├── src/
│   │   ├── entities/         # TypeORM entities
│   │   ├── guard/            # Guards (JWT, Roles)
│   │   ├── decorator/        # Custom decorators
│   │   ├── module/
│   │   │   ├── auth/         # Auth module (controller, service, DTOs)
│   │   │   └── generate_interviews/  # Question generation module
│   │   ├── app.module.ts     # Root module
│   │   └── main.ts           # Bootstrap & CORS
│   └── nest-cli.json         # Nest CLI config
│
├── test/           # E2E & unit tests
│
└── README.md       # Project README
```

---

## Getting Started

### Prerequisites

* Node.js ≥ 22.x
* npm ≥ 10.7.0.x
* PostgreSQL database

### Environment Variables

Create a `.env` based on `sample.env` in **both** `/server` and `/client`:

#### Server (`/server/.env`)

```env
DB_PORT=5432
DB_DATABASE=interview_db
DB_USERNAME=postgres
DB_PASSWORD=secret

JWT_SECRET_SERVICE=supersecretkey
OPENROUTER_API_KEY=your_openrouter_key
PORT=3000
```

#### Client (`/client/.env`)

```env
VITE_BE_API_URL=http://localhost:3000
```

### Backend Setup

```bash
cd server
npm install
npm run start:dev   # starts NestJS with live reload
```

Logs will show CORS enabled and API available at `http://localhost:3000/api`.

### Frontend Setup

```bash
cd client
npm install
npm run dev        # starts Vite dev server
```

Frontend runs at `http://localhost:5173` by default.

---

## Usage

### Authentication Flow

1. **Register** via `/register` page: stores user and issues JWT.
2. **Login** via `/login` page: saves `access_token` in `localStorage`.
3. Navbar adapts to show Profile / Generate / Update links when token exists.

### Profile Management

* Navigate to **Update Profile**. Form loads existing data.
* Edit **skills**, **technologies** via tag inputs, update **bio**, **password**.
* On save, client merges old/new tags, sends PATCH to `/api/auth/update`, then shows toast.

### Generating Questions

1. Go to **Generate** page.
2. Adjust **number of questions**, **skills**, **technologies**, **experience level**.
3. Click **Generate Questions**: loader appears, then cards animate in.
4. Scroll or click **Edit** button to return to form.

---

## API Endpoints

| Method | Route                        | Description                         |
| ------ | ---------------------------- | ----------------------------------- |
| POST   | `/api/auth/register`         | Create a new user                   |
| POST   | `/api/auth/login`            | Authenticate & return JWT           |
| GET    | `/api/auth/user`             | Return current user profile         |
| PATCH  | `/api/auth/update`           | Update profile fields               |
| POST   | `/api/ai/generate-questions` | Generate interview questions via AI |

---

## License

This project is MIT licensed. See [LICENSE](LICENSE) for details.
