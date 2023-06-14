const fs = require("fs");
const csv = require("csv-parser");
const nano = require("nano");
const dotenv = require("dotenv");
dotenv.config();

// import contact.csv

const contacts_csv = "./assets/contacts.csv";

// Connect to the CouchDB database
const dbUrl = process.env.DB_URL ?? "http://admin:123poi@127.0.0.1:5984";
const contacts_db = nano(dbUrl).use("contacts");

// Read the CSV file and insert documents into CouchDB
console.log("Importing contacts.csv data into CouchDB");

fs.createReadStream(contacts_csv)
  .pipe(csv())
  .on("data", async (row) => {
    try {
      const response = await contacts_db.insert(row);
      console.log(`Inserted document with ID: ${response.id}`);
    } catch (error) {
      console.error("Error inserting document:", error);
    }
  })
  .on("end", () => {
    console.log("CSV import complete");
  });

// import gadm.json
console.log("Importing gadm.json data into CouchDB");
const gadm_json = "./assets/gadm.json";
const gadm_db = nano(dbUrl).use("gadm");
const jsonData = fs.readFileSync(gadm_json);
const data = JSON.parse(jsonData);

data.features.forEach((feature) => {
  const doc = {
    _id: feature._id,
    ...feature,
  };

  gadm_db.insert(doc, (err, body) => {
    if (err) {
      console.log("Error importing data:", err);
    } else {
      console.log("Data imported successfully");
    }
  });
});
