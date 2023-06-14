import nano from "nano";
import fs from "fs";
const dbUrl = process.env.DB_URL ?? "http://admin:123poi@127.0.0.1:5984";
export const filterCityName = async () => {
  const gadm_db = nano(dbUrl).use("gadm");
  const contacts_db = nano(dbUrl).use("contacts");
  const contacts = await contacts_db.list({ include_docs: true, limit: 100 });
  const allCities = await gadm_db.list({ include_docs: true });
  let jsonFileToBeWritten = [];
  for await (const contact of contacts.rows) {
    for (const city of allCities.rows) {
      if (!city.doc || !contact.doc) {
        return;
      }
      if (
        // @ts-ignore
        contact.doc.name
          .toLowerCase()
          // @ts-ignore
          .includes(city.doc.properties.NAME_4.toLowerCase())
      ) {
        // @ts-ignore
        console.log("current city:", city.doc.properties.NAME_4);
        // @ts-ignore
        console.log("current contact:", contact.doc.name);
        console.log(
          "replaced:",
          // @ts-ignore
          contact.doc.name
            .toLowerCase()
            // @ts-ignore
            .replace(city.doc.properties.NAME_4.toLowerCase(), "")
        );
        console.log("document", contact.doc);
        const updatedContact = {
          ...contact.doc,
          // @ts-ignore
          name: contact.doc.name
            .toLowerCase()
            // @ts-ignore
            .replace(city.doc.properties.NAME_4.toLowerCase(), ""),
        };
        jsonFileToBeWritten.push(updatedContact);
      }
    }
  }
  let jsonData = JSON.stringify(jsonFileToBeWritten);
  fs.writeFileSync("assets/gadm_filtered.json", jsonData);
};

filterCityName();
