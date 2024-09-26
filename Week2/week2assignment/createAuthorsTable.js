const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  connection.query("CREATE DATABASE IF NOT EXISTS authorsdb", (err, result) => {
    if (err) throw err;
    console.log("Database 'authorsdb' created or already exists");

    connection.query("USE authorsdb", (err, result) => {
      if (err) throw err;
      console.log("Using authorsdb database");

      connection.query(
        "CREATE TABLE IF NOT EXISTS authors (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(255), university VARCHAR(255), date_of_birth DATE, h_index INT, gender VARCHAR(10), mentor INT, FOREIGN KEY (mentor) REFERENCES authors(author_id))",
        (err, result) => {
          if (err) throw err;
          console.log("Authors table created or already exists");

          connection.query(
            `CREATE TABLE IF NOT EXISTS author_paper (
              author_id INT,
              paper_id INT,
              FOREIGN KEY (author_id) REFERENCES authors(author_id),
              FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id),
              PRIMARY KEY (author_id, paper_id)
            )`,
            (err, result) => {
              if (err) throw err;
              console.log("Author_paper table created or already exists");

              connection.end((err) => {
                if (err) throw err;
                console.log("Connection closed");
              });
            }
          );
        }
      );
    });
  });
});
