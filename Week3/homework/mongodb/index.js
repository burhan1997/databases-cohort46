const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
//I got always an error here i couldnt solve it

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!

  const insertedData = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne({
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDIOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    });

  console.log(
    `Created season 9 episode 13 and the document got the id ${insertedData.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  const episode2Title = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  console.log(`The title of episode 2 in season 2 is ${episode2Title.title}`);

  const seasonAndEpisodeNo = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${seasonAndEpisodeNo.episode}`
  );

  const titlesCliff = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" })
    .toArray();

  console.log("The episodes that Bob Ross painted a CLIFF are:");

  titlesCliff.forEach((title) => {
    console.log(title.title);
  });

  const titleCliffAndLightHouse = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ $and: [{ elements: "CLIFF" }, { elements: "LIGHTHOUSE" }] })
    .toArray();

  console.log(
    "The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are:"
  );

  titleCliffAndLightHouse.forEach((title) => {
    console.log(title.title);
  });
}

async function updateEpisodeExercises(client) {
  /**
   * There are some problems in the initial data that was filled in.
   * Let's use update functions to update this information.
   *
   * Note: do NOT change the data.json file
   */

  const update1330 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${update1330.modifiedCount} episodes`
  );

  const updateBushes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany({ elements: "BUSHES" }, { $set: { elements: "BUSH" } });

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateBushes.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */
  const delete1331 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${delete1331.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
