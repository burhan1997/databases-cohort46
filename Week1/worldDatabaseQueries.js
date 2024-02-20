const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'world'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // 1. What are the names of countries with population greater than 8 million?
  connection.query('SELECT Name FROM country WHERE Population > 8000000', (err, result) => {
    if (err) throw err;
    console.log('Countries with population greater than 8 million:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 2. What are the names of countries that have “land” in their names?
  connection.query('SELECT Name FROM country WHERE Name LIKE "%land%"', (err, result) => {
    if (err) throw err;
    console.log('Countries with "land" in their names:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 3. What are the names of the cities with population in between 500,000 and 1 million?
  connection.query('SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000', (err, result) => {
    if (err) throw err;
    console.log('Cities with population between 500,000 and 1 million:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 4. What's the name of all the countries on the continent ‘Europe’?
  connection.query('SELECT Name FROM country WHERE Continent = "Europe"', (err, result) => {
    if (err) throw err;
    console.log('Countries on the continent "Europe":');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 5. List all the countries in the descending order of their surface areas.
  connection.query('SELECT Name FROM country ORDER BY SurfaceArea DESC', (err, result) => {
    if (err) throw err;
    console.log('Countries in descending order of surface areas:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 6. What are the names of all the cities in the Netherlands?
  connection.query('SELECT Name FROM city WHERE CountryCode = "NLD"', (err, result) => {
    if (err) throw err;
    console.log('Cities in the Netherlands:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 7. What is the population of Rotterdam?
  connection.query('SELECT Population FROM city WHERE Name = "Rotterdam"', (err, result) => {
    if (err) throw err;
    console.log('Population of Rotterdam:');
    console.log(result[0].Population);
  });

  // 8. What's the top 10 countries by Surface Area?
  connection.query('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10', (err, result) => {
    if (err) throw err;
    console.log('Top 10 countries by surface area:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 9. What's the top 10 most populated cities?
  connection.query('SELECT Name FROM city ORDER BY Population DESC LIMIT 10', (err, result) => {
    if (err) throw err;
    console.log('Top 10 most populated cities:');
    result.forEach((row) => {
      console.log(row.Name);
    });
  });

  // 10. What is the population number of the world?
  connection.query('SELECT SUM(Population) AS WorldPopulation FROM country', (err, result) => {
    if (err) throw err;
    console.log('Population of the world:');
    console.log(result[0].WorldPopulation);
  });

  // Close the connection
  connection.end((err) => {
    if (err) throw err;
    console.log('Connection closed');
  });
});
