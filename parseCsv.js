const fs = require("fs");
const csv = require("csv-parser");
const nano = require("nano");

const dbName = "contacts";
const inputFilePath = "./assets/contacts.csv";

// Connect to the CouchDB database
const dbUrl = "http://admin:123poi@127.0.0.1:5984";
const db = nano(dbUrl).use(dbName);

// Read the CSV file and insert documents into CouchDB
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", async (row) => {
    try {
      const response = await db.insert(row);
      console.log(`Inserted document with ID: ${response.id}`);
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  })
  .on("end", () => {
    console.log("CSV import complete");
  });
