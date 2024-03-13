const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const ConInfoByYearAge = async (collection, year, age) => {
  const pipeline = [
    {

      $match: {
        Year: year,
        Age: age,
      },
    },
    {

      $addFields: {
        TotalPopulation: {
          $sum: {
            $add: [{ $toInt: "$F" }, { $toInt: "$M" }],
          },
        },
      },
    },
    {
      $match: {
        Country: {
          $in: [
            "EUROPE",
            "AFRICA",
            "ASIA",
            "AUSTRALIA",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
      },
    },
  ];


  console.log("Pipeline:", JSON.stringify(pipeline));

  const matchResults = await collection.aggregate([pipeline[0]]).toArray();
  console.log("Match Results:", matchResults);

  const addFieldsResults = await collection.aggregate([pipeline[1]]).toArray();
  console.log("Add Fields Results:", addFieldsResults);

  const finalResults = await collection.aggregate([pipeline[2]]).toArray();
  console.log("Final Results:", finalResults);

  const results = await collection.aggregate(pipeline).toArray();
  console.log("Aggregation Results:", results);
};

async function getInfoByYearAge(year, age) {
  console.log("Provided Year:", year);
  console.log("Provided Age:", age);

  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    const db = client.db("databaseWeek4");
    const collection = db.collection("population_data");

    await ConInfoByYearAge(collection, year, age);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

getInfoByYearAge(2020, "100+");
