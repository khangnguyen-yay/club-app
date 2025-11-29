# clubfindr — Local Development Guide

This guide explains how to locally host and run the **Clubfindr** application, including the frontend, backend, and database.

## 🖥️ Prerequisites

Before getting started, ensure you have the following installed:

* **Node.js** (v18+ recommended)
* **npm**
* **Docker Desktop**
* **Git** (optional, for cloning the repo)

## 🚀 How to Locally Host Clubfindr

Follow the steps below in order.

## 1. Start the Frontend

```bash
cd frontend
npm run dev
```

This will launch the frontend on its default development port **(http://localhost:5173)**.

## 2. Start the Database (Docker)

1. Open **Docker Desktop**.
2. In a terminal, navigate to the backend directory:

   ```bash
   cd backend
   docker compose up --build
   ```

This builds and starts the database container defined in your `docker-compose.yml` file.

## 3. Start the Backend

Open a new terminal window and run:

```bash
cd backend
npm run dev
```

This will start the backend server (commonly on **(http://localhost:3000)**).

## 🧩 Summary of Commands

### Frontend

```
cd frontend
npm run dev
```

### Database (Docker)

```
cd backend
docker compose up --build
```

### Backend

```
cd backend
npm run dev
```

## ✅ Your local environment should now be running!

You can open the frontend in your browser and interact with the full system.

If you need a production-ready README or want badges, images, or formatting improvements, feel free to ask!
