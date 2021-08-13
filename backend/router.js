const express = require('express');
const router = express.Router();
const connection = require('./snowflakeConnection');
const { queryGenerator } = require('./queryGenerator');
const {defaultSlicers} = require('./defaultSlicers');


router.get('/', async (req, res) => {
// <<<<<<< HEAD
//   console.log('get request receieved')
//   res.json('message received')
// =======
  console.log('get request receieved');
  // 
  let returnObj = {}
  let query1 =  defaultSlicers(1);
  let query2 =  defaultSlicers(2);
  let query3 =  defaultSlicers(3);
  let query4 =  defaultSlicers(4);
  let mapForPayerToBob = defaultSlicers(5);
  await connection.execute({
    sqlText: query1,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Failed to execute query 1 with statement: ${err.message}`);
      } else {
          returnObj.brandMkt = rows; 
          connection.execute({
            sqlText: query2,
            complete: (err, stmt, rows) => {
              if (err) {
                console.error(`Failed to execute query 2 with statement: ${err.message}`);
              } else {
                returnObj.payerData = rows;
                connection.execute({
                  sqlText:query3,
                  complete:(err, stmt, rows) => {
                    if(err){
                      console.error(`Failed to execute query 3 with statement: ${err.message}`);
                    }else{
                      returnObj.catTeam = rows
                      // res.json(returnObj)
                      connection.execute({
                        sqlText:query4,
                        complete:(err,stmt,rows) => {
                          if(err){
                            console.error(`Failed to execute query 4 with statement: ${err.message}`);
                          }else{
                            returnObj.timePer = rows;
                            // res.json(returnObj)
                            connection.execute({
                              sqlText:mapForPayerToBob,
                              complete:(err,stmt,rows) => {
                                if(err){
                                  console.error(`Failed to execute query 5 with statement: ${err.message}`);
                                }else{
                                  returnObj.PayerMapToBob = rows;
                                  res.json(returnObj)
                                }
                              }
                            })
                          }
                        }
                      })
                    }
                  }
                });
              }
            }
          });
       }
    }
  });
// >>>>>>> 05ccdfbb135eb705478fd848c3e801f27e33daba
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

