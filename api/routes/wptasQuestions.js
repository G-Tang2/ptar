var express = require('express');
var router = express.Router();
const myPool = require("../db/db.tsx");

/* GET users listing. */
router.get('/questions/wptas', (req, res) => {
  myPool.query("SELECT * FROM wptas_test", (err, results) => {
    if (err) throw err;
    res.send(results.rows);
  })
});

module.exports = router;
