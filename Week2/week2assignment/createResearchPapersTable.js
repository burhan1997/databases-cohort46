const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "authorsdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  connection.query("USE authorsdb", (err, result) => {
    if (err) throw err;
    console.log("Using authorsdb database");
  });

  connection.query(
    "CREATE TABLE IF NOT EXISTS research_papers (paper_id INT AUTO_INCREMENT PRIMARY KEY, paper_title VARCHAR(255), conference VARCHAR(255), publish_date DATE)",
    (err, result) => {
      if (err) throw err;
      console.log("Research papers table created or already exists");

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
