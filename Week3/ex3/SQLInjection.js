/*
 Fetch all records in the database, an attacker could manipulate the name and code parameters.
name = 'fake' OR 1=1; --
code = 'fake'
With the above values, the resulting SQL query be:
SELECT Population FROM Country WHERE Name = 'fake' OR 1=1; --' and code = 'fake'
This query always return all records from the Country table because 1=1 is always true.
*/


//updated version of the getPopulation function 
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    "SELECT Population FROM ?? WHERE Name = ? and code = ?",
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
