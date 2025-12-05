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
Note: Must place .env file in backend folder for backend to successfully run
```
## Tests
```
For Frontend: 
cd frontend
npx ts-node --esm utils/saveGoogleSession.ts
npx playwright test
npm run cucumber

For Backend:
npx jest
```
## ✅ Your local environment should now be running!
```
You can open the frontend in your browser and interact with the full system.
```

## Models
### Class Diagram
<img width="791" height="924" alt="ClubFindr-camilla-ClassDiagram drawio" src="https://github.com/user-attachments/assets/0e2b2254-18e8-4723-b043-a49c475f9086" />

### Sequence Diagrams for Common Interactions (summary provided for all)
<img width="915" height="732" alt="ClubFindr-Login drawio" src="https://github.com/user-attachments/assets/013a31a8-cc3a-4518-aa17-092dadbc842b" />
<img width="819" height="733" alt="ClubFindr-ExploreClubs drawio" src="https://github.com/user-attachments/assets/d7b31fbc-6951-4664-a91f-4245c1adf672" />
<img width="819" height="1088" alt="ClubFindr-PostStatuses drawio" src="https://github.com/user-attachments/assets/f1874420-b0ab-4fe3-9d37-ffe9ae3f24cd" />
<img width="915" height="732" alt="ClubFindr-Logout drawio" src="https://github.com/user-attachments/assets/0b1d1900-e2ef-4661-9d86-1ae885b0da73" />





