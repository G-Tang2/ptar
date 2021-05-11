var express = require('express');
var router = express.Router();
const myPool = require("../db/db.tsx");

// get abs questions
router.get('/questions/abs', (req, res) => {
  const query = `
  SELECT * 
  FROM abs_test`
  myPool.query(query, (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

// get patient's abs test scores
router.get('/abs/test/score/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT TO_CHAR(test_date_time, 'DD/MM') AS test_date_time, test_score FROM test WHERE test_type='abs' AND patient_id=($1) ORDER BY test_date_time;`
  myPool.query(query, [id],
    (err, results) => {
      if (err) throw err;
    res.send(results.rows);
  })
});


// post abs test detail to database
router.post('/abs/test/:id', (req, res) => {
  // patient_id can also be retrieved from url params
  const {patient_id, test_date_time, clinician_initials, test_score, test_type} = req.body;
  const query = `
  INSERT INTO test (patient_id, test_date_time, clinician_initials, test_score, test_type) 
  VALUES ($1, $2, $3, $4, $5) 
  RETURNING test_id`
  myPool.query(query,
  [patient_id, test_date_time, clinician_initials, test_score, test_type],
   (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

// post patient's abs test answers to database
router.post('/abs/test/results/:id', (req, res) => {
  const {test_id, abs_question_no, abs_option} = req.body;
  const query = `
  INSERT INTO abs_ans (test_id, abs_question_no, abs_option) 
  VALUES ($1, $2, $3)`
  myPool.query(query,
  [test_id, abs_question_no, abs_option],
   (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

module.exports = router;
