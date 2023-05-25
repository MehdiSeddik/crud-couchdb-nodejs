import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  getAll,
  getById,
  create,
  update,
  deleteById,
} from "./database";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Get all contacts
app.get("/contacts", async (req, res) => {
  const items = await getAll();
  res.json(items);
});

// Get a single item
app.get("/contact/:id", async (req, res) => {
  const { id } = req.params;
  const item = await getById(id);
  res.json(item);
});

// Create an item
app.post("/contact", async (req, res) => {
  const newItem = req.body;
  const createdItem = await create(newItem);
  res.json(createdItem);
});

// Update an item
app.put("/contact/:id", async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  const result = await update(id, updatedItem);
  res.json(result);
});

// Delete an item
app.delete("/contact/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteById(id);
  res.json(result);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
