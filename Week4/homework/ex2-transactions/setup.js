const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URL;
const dbName = "moneydb";
const collectionName = "transactions";

async function setup() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to Mongodb");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.deleteMany({});
    const accounts = [
      {
        account_number: 101,
        balance: 1000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 2000,
        account_changes: [],
      },
    ];
    await collection.insertMany(accounts);
    console.log("Data inserted");
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
    console.log("Connection closed");
  }
}

module.exports = { setup };
