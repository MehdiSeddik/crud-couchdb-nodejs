import nano, { DocumentScope } from "nano";
import dotenv from "dotenv";
dotenv.config();

const server = nano(
  process.env.DB_URL ?? "http://admin:123poi@127.0.0.1:5984"
);
const dbName = process.env.DB_NAME ?? "contacts";

// Connect to the CouchDB database
const db: DocumentScope<any> = server.use(dbName);

// Get all items
export const getAll = async () => {
  const response = await db.list({ include_docs: true });
  return response.rows.map((row: any) => row.doc);
};

// Get a single item by ID
export const getById = async (id: string) => {
  const response = await db.get(id);
  return response;
};

// Create an item
export const create = async (item: any) => {
  const response = await db.insert(item);
  return response;
};

// Update an item
export const update = async (id: string, updatedItem: any) => {
  const item = await getById(id);
  const updatedDoc = { ...item, ...updatedItem };
  const response = await db.insert(updatedDoc);
  return response;
};

// Delete an item
export const deleteById = async (id: string) => {
  const item = await getById(id);
  const response = await db.destroy(item._id, item._rev);
  return response;
};
