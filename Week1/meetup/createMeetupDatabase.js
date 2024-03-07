const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  // Create the database
  connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err, result) => {
    if (err) throw err;
    console.log("Database created or already exists");

    // Switch to the meetup database
    connection.query("USE meetup", (err, result) => {
      if (err) throw err;
      console.log("Using meetup database");

      // Create the Invitee table
      connection.query(
        "CREATE TABLE IF NOT EXISTS Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by VARCHAR(255))",
        (err, result) => {
          if (err) throw err;
          console.log("Invitee table created or already exists");

          // Create the Room table
          connection.query(
            "CREATE TABLE IF NOT EXISTS Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)",
            (err, result) => {
              if (err) throw err;
              console.log("Room table created or already exists");

              // Create the Meeting table
              connection.query(
                "CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no))",
                (err, result) => {
                  if (err) throw err;
                  console.log("Meeting table created or already exists");


                connection.query(
                    "CREATE TABLE IF NOT EXISTS Meeting_invitee (meeting_no INT, invitee_no INT)",
                    (err, result) => {
                      if (err) throw err;
                      console.log(
                        "Meeting_invitee table created or already exists"
                      );

                  // Insert data into the Invitee table
                  connection.query(`
                      INSERT INTO Invitee (invitee_no, invitee_name, invited_by)
                      VALUES
                      (1, 'Burhan', 'Ali'),
                      (2, 'Willem', 'David'),
                      (3, 'Ria', 'Alex')
                    `);

                  // Insert data into the Room table
                  connection.query(`
                      INSERT INTO Room (room_no, room_name, floor_number)
                      VALUES
                      (101, 'Conference Room X', 1),
                      (102, 'Meeting Room Y', 2),
                      (103, 'Discussion Room Z', 3)
                    `);

                  // Insert data into the Meeting table
                  connection.query(`
                  INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
                  VALUES
                      (1, 'Team Huddle', '2024-03-06 10:00:00', '2024-03-06 12:00:00', 101),
                      (2, 'Project Update', '2024-03-07 14:00:00', '2024-03-07 16:00:00', 102)
                    `);

                  // Insert data into the Meeting_invitee table
                  connection.query(`
                      INSERT INTO Meeting_invitee (meeting_no, invitee_no)
                      VALUES
                      (1, 1),
                      (1, 2),
                      (2, 3)
                    `);

              
                  connection.end((err) => {
                    if (err) throw err;
                    console.log("Connection closed");
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});
