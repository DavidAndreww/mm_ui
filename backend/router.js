const express = require('express');
const router = express.Router();
const connection = require('./snowflakeConnection')
const { queryGenerator } = require('./queryGenerator')


router.get('/', async (req, res) => {
  console.log('get request receieved')
})

// need logic to use different query engines depending on user input
router.post('/', async (req, res) => { 
  let params = req.body.parameters;
  
  let returnObj = {}
  let query1 = await queryGenerator(params, 1)

  await connection.execute({
    sqlText: query1,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Failed to execute statement: ${err.message}`);
      } else {
        returnObj.current = rows
        
        let query2 = queryGenerator(params, 2)
        if(params.prevStartDate) {
          connection.execute({
            sqlText: query2,
            complete: (err, stmt, rows) => {
              if (err) {
                console.error(`Failed to execute statement: ${err.message}`);
              } else {
                returnObj.previous = rows
                res.json(returnObj)
              }
            }
          });
        } else {
          res.json(returnObj)
        }
      }
    }
  });
})


module.exports = router;

