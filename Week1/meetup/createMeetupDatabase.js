const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
  
  // Create the database
  connection.query('CREATE DATABASE IF NOT EXISTS meetup', (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists');
  });
  
  // Switch to the meetup database
  connection.query('USE meetup', (err, result) => {
    if (err) throw err;
    console.log('Using meetup database');
  });
  
  // Create the Invitee table
  connection.query('CREATE TABLE IF NOT EXISTS Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by VARCHAR(255))', (err, result) => {
    if (err) throw err;
    console.log('Invitee table created or already exists');
  });
  
  // Create the Room table
  connection.query('CREATE TABLE IF NOT EXISTS Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)', (err, result) => {
    if (err) throw err;
    console.log('Room table created or already exists');
  });
  
  // Create the Meeting table
  connection.query('CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no))', (err, result) => {
    if (err) throw err;
    console.log('Meeting table created or already exists');
  });

  // Insert data into the Invitee table
  for (let i = 1; i <= 5; i++) {
    connection.query('INSERT INTO Invitee (invitee_name, invited_by) VALUES (?, ?)', [`Invitee_${i}`, `Invited_By_${i}`], (err, result) => {
      if (err) throw err;
      console.log(`Inserted row into Invitee table with ID ${result.insertId}`);
    });
  }

  // Insert data into the Room table
  for (let i = 1; i <= 5; i++) {
    connection.query('INSERT INTO Room (room_name, floor_number) VALUES (?, ?)', [`Room_${i}`, i], (err, result) => {
      if (err) throw err;
      console.log(`Inserted row into Room table with ID ${result.insertId}`);
    });
  }

  // Insert data into the Meeting table
  for (let i = 1; i <= 5; i++) {
    connection.query('INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES (?, ?, ?, ?)', [`Meeting_${i}`, new Date(), new Date(), i], (err, result) => {
      if (err) throw err;
      console.log(`Inserted row into Meeting table with ID ${result.insertId}`);
    });
  }
  
  // Close the connection
  connection.end((err) => {
    if (err) throw err;
    console.log('Connection closed');
  });
});
