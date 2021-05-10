var express = require('express');
var router = express.Router();
const myPool = require("../db/db.tsx");

// get latest answers of patient
router.get('/pre-wptas/api/:id', (req, res) => {
  const id = req.params.id
  const query = `
  SELECT * FROM wptas_ref_ans
  WHERE patient_id=($1) AND wptas_ref_ans_date = (
    SELECT MAX(wptas_ref_ans_date) 
    FROM wptas_ref_ans
    )`
  myPool.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

// post answers about patient to database
router.post('/pre-wptas/api/:id', (req, res) => {
    const {question_no, patient_id, date, info} = req.body;
    const query = `
    INSERT INTO wptas_ref_ans (wptas_question_no, patient_id, wptas_ref_ans_date,wptas_ref_ans_info) 
    VALUES ($1, $2,$3,$4);`
    myPool.query(query,
    [question_no, patient_id, date, info],
     (err, results) => {
      if (err) throw err;
      res.send(results.rows);
    })
  });

module.exports = router;