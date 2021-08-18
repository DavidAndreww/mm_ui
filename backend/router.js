const express = require('express');
const router = express.Router();
const connection = require('./snowflakeConnection');
const { queryGenerator } = require('./queryGenerator');
const { exec } = require('child_process')
const { defaultParamsController } = require('./controllers/defaultParamsController')

// Snowflake Default Values Router
router.get('/', defaultParamsController)
// Snowflake Router
router.post('/', async (req, res) => { 
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
})
// Molecula Router
router.post('/qe2', async (req, res) => {
  console.log('Molecula Router')
  let params = req.body.params;
  let returnObj = {}

  let baseurl = "http://3.82.174.132:10101"; 
  let idx = "snowidx";
  let fname = "Count(All())";
  let cmd = "curl -s -k "+baseurl+"/index/"+idx+"/query -X POST --data-binary @"+fname;

  const ls = exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    //console.log('Child Process STDOUT: '+stdout);
    console.log(stdout);
    //console.log('Child Process STDERR: '+stderr);
  });


  ls.on('exit', function (code) {
    console.log('Child process exited with exit code '+code);
  });
})


module.exports = router;

