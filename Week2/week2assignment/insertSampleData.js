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

    // Insert authors
    connection.query(
      `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
    ('John Doe', 'Harvard University', '1990-01-01', 70, 'Male', NULL),
    ('Alice Smith', 'Stanford University', '1985-05-05', 80, 'Female', 1),
    ('Bob Johnson', 'Massachusetts Institute of Technology (MIT)', '1988-10-10', 65, 'Male', 1), 
    ('Emma Brown', 'University of California', '1992-12-12', 75, 'Female', 2),
    ('Michael Wilson', 'University of Oxford', '1987-02-02', 85, 'Male', 3),
    ('Sarah Davis', 'University of Cambridge', '1991-08-08', 90, 'Female', 3),
    ('James Miller', 'California Institute of Technology', '1986-04-04', 60, 'Male', 4),
    ('Jessica Wilson', 'University of Chicago', '1989-07-07', 75, 'Female', 4),
    ('David Taylor', 'Princeton University', '1993-11-11', 70, 'Male', 5),
    ('Lauren Martinez', 'Yale University', '1984-03-03', 80, 'Female', 5),
    ('Andrew Thomas', 'University of Pennsylvania', '1995-06-06', 65, 'Male', 6),
    ('Olivia Anderson', 'University of California', '1990-09-09', 85, 'Female', 6),
    ('Daniel White', 'Columbia University', '1987-01-01', 75, 'Male', 7),
    ('Emily Garcia', 'University of Michigan', '1988-02-02', 90, 'Female', 7),
    ('William Clark', 'University of Texas at Austin', '1992-03-03', 70, 'Male', 8);`,
      (err, result) => {
        if (err) throw err;
        console.log("Authors inserted");

        // Insert research papers
        connection.query(
          `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
        ('Deep Residual Learning', 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR)', '2015-06-15'),
        ('A Neural Algorithm of Artistic Style', 'Neural Information Processing Systems (NIPS)', '2015-12-07'),
        ('Distributed Representations', 'Neural Information Processing Systems (NIPS)', '2013-12-09'),
        ('Sequence to Sequence Learning', 'Neural Information Processing Systems (NIPS)', '2014-12-10'),
        ('Playing Atari with Deep Reinforcement Learning', 'Neural Information Processing Systems (NIPS)', '2013-12-09'),
        ('Unsupervised Representation Learning', 'Neural Information Processing Systems (NIPS)', '2015-12-07'),
        ('Deep Learning for Classical Japanese Literature', 'Neural Information Processing Systems (NIPS)', '2015-12-07'),
        ('A Survey of Transfer Learning', 'IEEE Transactions on Neural Networks and Learning Systems', '2010-02-01'),
        ('An Overview of Deep Learning', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-11-01'),
        ('Deep Learning: Methods and Applications', 'IEEE Transactions on Neural Networks and Learning Systems', '2014-11-01'),
        ('Deep Learning in Neural Networks: An Overview', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-11-01'),
        ('A Study on Transfer Learning in Neural Networks', 'IEEE Transactions on Neural Networks and Learning Systems', '2011-06-01'),
        ('A Review of Deep Learning Techniques in Computer Vision', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Natural Language Processing', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-11-01'),
        ('Deep Learning for Speech Recognition', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Image Segmentation', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Object Detection', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Medical Image Analysis', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Autonomous Vehicles', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Robotics', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Financial Forecasting', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Climate Modeling', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Drug Discovery', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Protein Structure Prediction', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Genomics', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Quantum Computing', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Cybersecurity', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Anomaly Detection', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Natural Language Generation', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01'),
        ('Deep Learning for Recommender Systems', 'IEEE Transactions on Neural Networks and Learning Systems', '2015-12-01');
    `,
          (err, result) => {
            if (err) throw err;
            console.log("Research papers inserted");

            // Insert author-paper relationships
            connection.query(
              `INSERT INTO author_paper (author_id, paper_id) VALUES
              (1, 1), -- Author 1 (John Doe) wrote Paper 1 (Deep Residual Learning)
              (2, 2), -- Author 2 (Alice Smith) wrote Paper 2 (A Neural Algorithm of Artistic Style)
              (3, 1), -- Author 3 (Bob Johnson) also wrote Paper 1 (Deep Residual Learning)
              (4, 2), -- Author 4 (Emma Brown) also wrote Paper 2 (A Neural Algorithm of Artistic Style)
              (5, 1), -- Author 5 (Michael Wilson) wrote Paper 1 (Deep Residual Learning)
              (6, 3), -- Author 6 (Sarah Davis) wrote Paper 3 (Distributed Representations)
              (7, 4), -- Author 7 (James Miller) wrote Paper 4 (Sequence to Sequence Learning)
              (8, 5), -- Author 8 (Jessica Wilson) wrote Paper 5 (Playing Atari with Deep Reinforcement Learning)
              (9, 5), -- Author 9 (David Taylor) also wrote Paper 5 (Playing Atari with Deep Reinforcement Learning)
              (10, 6), -- Author 10 (Lauren Martinez) wrote Paper 6 (Unsupervised Representation Learning)
              (11, 7), -- Author 11 (Andrew Thomas) wrote Paper 7 (Deep Learning for Classical Japanese Literature)
              (12, 8), -- Author 12 (Olivia Anderson) wrote Paper 8 (A Survey of Transfer Learning)
              (13, 9), -- Author 13 (Daniel White) wrote Paper 9 (An Overview of Deep Learning)
              (14, 10), -- Author 14 (Emily Garcia) wrote Paper 10 (Deep Learning: Methods and Applications)
              (15, 11), -- Author 15 (William Clark) wrote Paper 11 (Deep Learning in Neural Networks: An Overview)
              (16, 12), -- Author 16 (John Doe) also wrote Paper 12 (A Study on Transfer Learning in Neural Networks)
              (17, 13), -- Author 17 (Alice Smith) also wrote Paper 13 (A Review of Deep Learning Techniques in Computer Vision)
              (18, 14), -- Author 18 (Bob Johnson) also wrote Paper 14 (Deep Learning for Natural Language Processing)
              (19, 15), -- Author 19 (Emma Brown) also wrote Paper 15 (Deep Learning for Speech Recognition)
              (20, 16), -- Author 20 (Michael Wilson) also wrote Paper 16 (Deep Learning for Image Segmentation)
              (21, 17), -- Author 21 (Sarah Davis) also wrote Paper 17 (Deep Learning for Object Detection)
              (22, 18); -- Author 22 (James Miller) also wrote Paper 18 (Deep Learning for Medical Image Analysis)
 `,
              (err, result) => {
                if (err) throw err;
                console.log("Author-paper relationships inserted");

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
