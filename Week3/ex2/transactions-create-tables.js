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

  
  const createAccountTableQuery = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT AUTO_INCREMENT PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
    )
  `;
  connection.query(createAccountTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Account table created");
  });

  
  const createAccountChangesTableQuery = `
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount DECIMAL(10, 2) NOT NULL,
      changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    )
  `;
  connection.query(createAccountChangesTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Account changes table created");
    connection.end(); 
  });
});
