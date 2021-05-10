var express = require('express');
var router = express.Router();
const myPool = require("../db/db.tsx");

// get all patient's past test results
router.get('/test/:id', (req, res) => {
    const id = req.params.id
    const query = `
    SELECT test_id, test_date_time, clinician_initials, test_score, test_type 
    FROM test 
    WHERE patient_id=($1)
    ORDER BY test_date_time DESC;`
    myPool.query(query, [id],
      (err, results) => {
        if (err) throw err;
      res.send(results.rows);
    })
  });

  
module.exports = router;