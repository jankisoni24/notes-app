import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import notesRoutes from "./routes/notes.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/notes",
  notesRoutes
);
console.log("Routes Loaded");

app.get("/", (req, res) => {
  res.send("Server working");
});

const PORT =
  process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});