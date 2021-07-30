const express = require('express');
const router = express.Router();
const connection = require('./snowflakeConnection')

router.post('/', async (req, res) => {  
  connection.execute({
    sqlText: process.env.LEO_SAMPLE_QUERY,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Failed to execute statement: ${err.message}`);
      } else {
        let results = JSON.stringify(rows)
        res.send(results)
      }
    }
  });
})


module.exports = router;