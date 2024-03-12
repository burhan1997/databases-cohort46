const { MongoClient } = require("mongodb");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

const uri = process.env.MONGODB_URL;
const dbName = "databaseWeek4";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("population_data");

  
    await collection.drop();

    // Stream the CSV file and insert each row as a document into the collection
    const results = [];
    fs.createReadStream(
      "/Users/burhanelaldi/databases-cohort46/Week4/homework/ex1-aggregation/population_pyramid_1950-2022.csv"
    )
      .pipe(csv())
      .on("data", async (row) => {
        results.push(row);
      })
      .on("end", async () => {
        await collection.insertMany(results);
        console.log("CSV file successfully imported into MongoDB.");
        await client.close(); 
      });
  } catch (err) {
    console.error("Error: ", err);
  }
}

main();
