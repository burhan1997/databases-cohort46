const mysql = require("mysql2");

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "authorsdb",
});

// Exercise 3: Joins

// 1. Write a query that prints names of all `authors` and their corresponding `mentors`.
const query1 = `
SELECT a.author_name AS author_name, m.author_name AS mentor_name
FROM authors a
LEFT JOIN authors m ON a.mentor = m.author_id;
`;

// 2. Write a query that prints all columns of `authors` and their published `paper_title`.
// If there is an author without any `research_Papers`, print the information of that `author` too.
const query2 = `
SELECT 
    a.author_id, a.author_name, a.university, a.date_of_birth, a.h_index, a.gender, a.mentor,
    p.paper_title
FROM 
    authors a
LEFT JOIN 
    author_paper ap ON a.author_id = ap.author_id
LEFT JOIN 
    research_papers p ON ap.paper_id = p.paper_id;
`;

// Exercise 4: Aggregate Functions

// 1. All research papers and the number of authors that wrote that paper.
const query3 = `
SELECT p.paper_title, 
COUNT(ap.author_id) AS num_authors
FROM research_papers p
LEFT JOIN author_paper ap ON p.paper_id = ap.paper_id
GROUP BY p.paper_title;
`;

// 2. Sum of the research papers published by all female authors.
const query4 = `
SELECT COUNT(*) AS num_female_authors
FROM authors a
LEFT JOIN author_paper ap ON a.author_id = ap.author_id
LEFT JOIN research_papers p ON ap.paper_id = p.paper_id
WHERE a.gender = 'Female';
`;

// 3. Average of the h-index of all authors per university.
const query5 = `
SELECT a.university, AVG(a.h_index) AS avg_h_index
FROM authors a
GROUP BY a.university;
`;

// 4. Sum of the research papers of the authors per university.
const query6 = `
SELECT a.university, COUNT(DISTINCT ap.paper_id) AS num_papers
FROM authors a
LEFT JOIN author_paper ap ON a.author_id = ap.author_id
GROUP BY a.university;
`;

// 5. Minimum and maximum of the h-index of all authors per university.
const query7 = `
SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
FROM authors a
GROUP BY a.university;
`;

// Run each query and log the results
connection
  .promise()
  .query(query1)
  .then(([rows, fields]) => {
    console.log("Query 1 Results:");
    console.table(rows);
  })
  .catch(console.log);

connection
  .promise()
  .query(query2)
  .then(([rows, fields]) => {
    console.log("Query 2 Results:");
    console.table(rows);
  })
  .catch(console.log);

connection
  .promise()
  .query(query3)
  .then(([rows, fields]) => {
    console.log("Query 3 Results:");
    console.table(rows);
  })
  .catch(console.log);

connection
  .promise()
  .query(query4)
  .then(([rows, fields]) => {
    console.log("Query 4 Results:");
    console.table(rows);
  })
  .catch(console.log);

connection
  .promise()
  .query(query5)
  .then(([rows, fields]) => {
    console.log("Query 5 Results:");
    console.table(rows);
  })
  .catch(console.log);

connection
  .promise()
  .query(query6)
  .then(([rows, fields]) => {
    console.log("Query 6 Results:");
    console.table(rows);
  })
  .catch(console.log);

connection
  .promise()
  .query(query7)
  .then(([rows, fields]) => {
    console.log("Query 7 Results:");
    console.table(rows);
  })
  .catch(console.log);

// Close the connection
connection.end();
