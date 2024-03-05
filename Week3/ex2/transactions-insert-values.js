const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");


  const insertSampleDataQuery = `
    INSERT INTO account (balance)
    VALUES
      (1000.00),
      (2000.00)
  `;
  connection.query(insertSampleDataQuery, (err, result) => {
    if (err) throw err;
    console.log("Sample data inserted into account table");
    connection.end(); 
  });
});
