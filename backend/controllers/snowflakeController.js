const connection = require('../snowflakeConnection');
const { queryGenerator } = require('../snowflakeConnection');

const snowflakeController = async (req, res) => { 
  let params = req.body.parameters;
  
  let returnObj = {}
  let query1 = await queryGenerator(params, 1)
  console.log('Query', query1)
  await connection.execute({
    sqlText: query1,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Failed to execute statement: ${err.message}`);
      } else {
        returnObj.current = rows
        
        let query2 = queryGenerator(params, 2)
        console.log(query2)
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
}

module.exports = { snowflakeController }