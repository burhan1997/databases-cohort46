const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function getTotalPopulationByCountry(db, country) {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: {
            $add: [
              { $toInt: "$M" }, // Convert field M to integer
              { $toInt: "$F" }, // Convert field F to integer
            ],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const result = await db
    .collection("population_data")
    .aggregate(pipeline)
    .toArray();

  return result;
}

async function main() {
  const uri = process.env.MONGODB_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to the server");
    const totalPopulation = await getTotalPopulationByCountry(
      client.db("databaseWeek4"),
      "Netherlands"
    );
    console.log("Total population for Netherlands:", totalPopulation);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();
