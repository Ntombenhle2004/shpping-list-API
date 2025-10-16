# 🛒 Shopping List API

This is a **Node.js + TypeScript** backend API designed to manage shopping list items.  
It allows users to create, read, update, and delete items in their shopping lists.  
The project uses **Nodemon** for automatic server restarts during development and **ts-node** to run TypeScript directly.

---

## 🚀 Features

- Create and manage shopping list items  
- View all existing items in the list  
- Update item details easily  
- Delete items when no longer needed  
- Built with **TypeScript** for reliability and scalability  

---

## 🧩 Tech Stack

- **Node.js** – Server-side JavaScript runtime  
- **TypeScript** – Strongly typed programming language  
- **Nodemon** – Restarts server automatically when files change  
- **ts-node** – Runs TypeScript without needing manual compilation  

---

## ⚙️ Installation

1. Clone the repository using:
   ```bash
   git clone https://github.com/Ntombenhle2004/shpping-list-API.git
   ```

2. Move into the project directory:
   ```bash
   cd shpping-list-API
   ```

3. Install all dependencies:
   ```bash
   npm install
   ```

---

## 🏃‍♀️ Run the Application

Start the development server with:
```bash
npm run dev
```

This command runs the server using **Nodemon** and **ts-node**, automatically reloading whenever changes are made.

---

## 📁 Project Structure

The project may include the following files and directories:

- **src/server.ts** → The main entry point of the API  
- **src/routes/** → Contains route definitions for the API endpoints  
- **src/controllers/** → Handles the logic for each route  
- **src/models/** → Defines data models for storing items  
- **package.json** → Manages dependencies and scripts  
- **tsconfig.json** → TypeScript configuration file  

---

## 🧠 Example API Endpoints

You can interact with the API through different HTTP requests:

- To **get all shopping list items**, send a `GET` request to `/items`.  
- To **add a new item**, send a `POST` request to `/items` with item details.  
- To **update an existing item**, send a `PUT` request to `/items/:id`.  
- To **delete an item**, send a `DELETE` request to `/items/:id`.  

---

## 🧪 Development Notes

- Any time you save changes in your TypeScript files, the app automatically restarts.  
- If needed, you can manually compile TypeScript to JavaScript with:
  ```bash
  npx tsc
  ```

---


## 📜 License

This project is licensed under the **ISC License**.

---
