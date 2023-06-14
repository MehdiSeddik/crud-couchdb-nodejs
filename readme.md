# CouchDB CRUD with Node.js, Express, and TypeScript

This project demonstrates a simple CRUD (Create, Read, Update, Delete) application using Node.js, Express, TypeScript, and CouchDB. It includes a script to import data from a CSV file into CouchDB.

## Prerequisites

Before running this application, ensure you have the following prerequisites installed:

- Node.js (v12 or higher): [Download Node.js](https://nodejs.org)
- Npm: [Install Npm](https://www.npmjs.com/get-npm)
- Yarn: [Install Yarn](https://classic.yarnpkg.com/en/docs/install) ( you can easily install it with `npm install -g yarn` )
- CouchDB: [Install CouchDB](https://couchdb.apache.org/#download)
- Git: [Install Git](https://git-scm.com/downloads)
  (eventually you can config git with `git config --global user.name "Your Name"` and `git config --global user.email ")

## Installation

First, you need instance of couchdb on your pc, you can download it [here](https://couchdb.apache.org/#download)
make sure to check the line `install windows service` when installing couchdb (you can uninstall it later)

Follow these steps to install and run the application:

1. Clone this repository:

   ```bash
   git clone https://github.com/MehdiSeddik/crud-couchdb-nodejs.git
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Setup database

   Before running the application, you need to configure the CouchDB connection settings.
   in the .env file, edit the couchdb url and port according to your couchdb configuration.

   To create the databases, head on to http://localhost:5984/_utils/, login with the admin credentials you created
   when installing couchdb, and create two new databases with the following names: contacts and gadm

4. Data import

   to import the csv data into the couchDB instance, you can run the following command

   ```bash
   yarn imp
   ```

   it will run a script that parse the csv file and insert the data into the database specified in the .env file

### Usage

To start the application, run the following command:

```bash
yarn dev
```

The application will be accessible at http://localhost:[PORT].

API Endpoints
The following API endpoints are available:

| Method | Endpoint     | Description                     |
| ------ | ------------ | ------------------------------- |
| GET    | /contacts    | Retrieve all items.             |
| GET    | /contact/:id | Retrieve a specific item by ID. |
| POST   | /contact     | Create a new item.              |
| PUT    | /contact/:id | Update an existing item.        |
| DELETE | /contact/:id | Delete an item.                 |

A postman collection is available in the assets folder
