const connection = require('../snowflakeConnection');
const { defaultSlicers } = require('../defaultSlicers');

const defaultParamsController = async (req, res) => {
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
                              sqlText: mapForPayerToBob,
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
}

module.exports = { defaultParamsController }