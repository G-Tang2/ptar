var express = require('express');
var router = express.Router();
const myPool = require("../db/db.tsx");

// get wptas question
router.get('/questions/wptas', (req, res) => {
  const query = "SELECT * FROM wptas_test;"
  myPool.query(query, (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

// get patient's wptas past test full detail
router.get('/view/wptas/:testId', (req, res) => {
  const testId = req.params.testId
  const query = `SELECT test_score, wptas_mc_given, wptas_correct, wptas_ans_note FROM wptas_ans JOIN test ON wptas_ans.test_id = test.test_id WHERE wptas_ans.test_id = ($1) ORDER BY wptas_question_no;`
  myPool.query(query, [testId],
    (err, results) => {
      if (err) throw err;
    res.send(results.rows);
  })
});


// get patient's wptas test details
// currently unused
router.get('/wptas/test/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT test_id, TO_CHAR(test_date_time, 'DD/MM/YYYY') AS test_date_time, clinician_initials, test_score FROM test WHERE test_type='wptas' AND patient_id=($1) ORDER BY test_date_time DESC;`
  myPool.query(query, [id],
    (err, results) => {
      if (err) throw err;
    res.send(results.rows);
  })
});

// get patient's wptas test scores
router.get('/wptas/test/score/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT TO_CHAR(test_date_time, 'DD/MM') AS test_date_time, test_score FROM test WHERE test_type='wptas' AND patient_id=($1) ORDER BY test_date_time;`
  myPool.query(query, [id],
    (err, results) => {
      if (err) throw err;
    res.send(results.rows);
  })
});


// post abs test detail to database
router.post('/wptas/test/:id', (req, res) => {
  // patient id can also be retrieved from url params
  const {patient_id, test_date_time, clinician_initials, test_score, test_type} = req.body;
  const query = `
  INSERT INTO test (patient_id, test_date_time, clinician_initials, test_score, test_type) 
  VALUES ($1, $2, $3, $4, $5) 
  RETURNING test_id;`
  myPool.query(query, [patient_id, test_date_time, clinician_initials, test_score, test_type],
   (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

// post patient's wptas test answers to database
router.post('/wptas/test/results/:id', (req, res) => {
  const {test_id, wptas_question_no, wptas_mc_given, wptas_correct, wptas_ans_note} = req.body;
  myPool.query(`
  INSERT INTO wptas_ans (test_id, wptas_question_no, wptas_mc_given, wptas_correct, wptas_ans_note) 
  VALUES ($1, $2, $3, $4, $5)`,
  [test_id, wptas_question_no, wptas_mc_given, wptas_correct, wptas_ans_note],
   (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

module.exports = router;
