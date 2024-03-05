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

  // Begin transaction
  connection.beginTransaction((err) => {
    if (err) throw err;

    // Transfer amount from account 101 to account 102
    const transferAmount = 1000.0;
    const fromAccount = 101;
    const toAccount = 102;

    // Update balance in account table for sender
    const updateSenderBalanceQuery = `
      UPDATE account
      SET balance = balance - ?
      WHERE account_number = ?
    `;
    connection.query(
      updateSenderBalanceQuery,
      [transferAmount, fromAccount],
      (err, result) => {
        if (err) {
          connection.rollback(() => {
            throw err;
          });
        }

        // Update balance for receiver
        const updateReceiverBalanceQuery = `
        UPDATE account
        SET balance = balance + ?
        WHERE account_number = ?
      `;
        connection.query(
          updateReceiverBalanceQuery,
          [transferAmount, toAccount],
          (err, result) => {
            if (err) {
              connection.rollback(() => {
                throw err;
              });
            }

            // Log transaction in account_changes table
            const logTransactionQuery = `
          INSERT INTO account_changes (account_number, amount, remark)
          VALUES (?, ?, ?)
        `;
            connection.query(
              logTransactionQuery,
              [
                fromAccount,
                -transferAmount,
                "Transfer to account " + toAccount,
              ],
              (err, result) => {
                if (err) {
                  connection.rollback(() => {
                    throw err;
                  });
                }

                connection.query(
                  logTransactionQuery,
                  [
                    toAccount,
                    transferAmount,
                    "Transfer from account " + fromAccount,
                  ],
                  (err, result) => {
                    if (err) {
                      connection.rollback(() => {
                        throw err;
                      });
                    }

                    // Commit transaction
                    connection.commit((err) => {
                      if (err) {
                        connection.rollback(() => {
                          throw err;
                        });
                      }
                      console.log("Transaction complete");
                      connection.end(); // Close connection after transaction
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
