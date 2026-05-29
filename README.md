# Mini-Twitter-Project

A modern, lightweight fullstack application inspired by Twitter. Built with TypeScript, CSS, and JavaScript.

---

## 🚀 Deployments

- **Frontend Live:** [mini-twitter-sage.vercel.app](https://mini-twitter-sage.vercel.app/) (hosted on Vercel)
- **Backend:** Deployed on [Railway](https://railway.app/) _(replace this with your public Railway endpoint/link, if available)_

---

## Table of Contents

- [Overview](#overview)
- [Deployments](#deployments)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

**Mini-Twitter-Project** is a scalable and maintainable fullstack Twitter clone built to demonstrate solid frontend and backend engineering practices using TypeScript, React, Bun, and ElysiaJS.

## Features

- TypeScript for type safety and maintainability
- Clean, responsive design (CSS)
- Core Twitter-like timeline and post interactions
- Modular, integration-ready architecture
- Complete REST API (Bun + ElysiaJS) with JWT authentication
- Easy Docker/Docker Compose for the backend
- One-click deploys (see below)

## Tech Stack

- **TypeScript** (88.4%)
- **CSS** (9%)
- **JavaScript** (1.4%)
- **Other** (1.2%)
- **Frontend:** React + Vite + TypeScript (see `/mini-twitter-frontend-main`)
- **Backend:** Bun + ElysiaJS (see `/mini-twitter-backend-main`)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Bun](https://bun.sh/) (for backend, optional if using Docker)

---

### Frontend

#### Local Development

```bash
cd mini-twitter-frontend-main
npm install   # or yarn
npm start     # or yarn start
```

Visit [http://localhost:5173](http://localhost:5173)

#### Vercel Deployment

Frontend is deployed at: [mini-twitter-sage.vercel.app](https://mini-twitter-sage.vercel.app/)

To redeploy or fork:
- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/MaironLima/Mini-Twitter-Project/tree/main/mini-twitter-frontend-main)

---

### Backend

#### Docker (Recommended)

```bash
cd mini-twitter-backend-main
docker-compose up -d
```
API available at `http://localhost:3000`

#### Railway Deployment

Backend is deployed on Railway. *(Provide public endpoint link here if available, or edit this line)*.

To redeploy or fork:
- [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template) <!-- Replace with your Railway template or repo link if you have one -->

#### Local (Bun)

```bash
cd mini-twitter-backend-main
bun install
bun run seed
bun run dev
```

API docs: [http://localhost:3000/swagger](http://localhost:3000/swagger)

---

## Project Structure

```
/mini-twitter-frontend-main
/mini-twitter-backend-main
```
See respective READMEs for full details.

---

## Contributing

Contributions are welcome! Please submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to your branch
5. Open a pull request

## License

[MIT](LICENSE) © [MaironLima](https://github.com/MaironLima)
