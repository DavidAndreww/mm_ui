const express = require('express')
const app = express();
const cors = require('cors');
const snowflake = require('snowflake-sdk');
require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

const avnr_conn = {
  account: process.env.AVNR_SNOWFLAKE_ACCT,
  username: process.env.AVNR_SNOWFLAKE_USER,
  password: process.env.AVNR_SNOWFLAKE_PASS,
  role: process.env.AVNR_SNOWFLAKE_ROLE,
  warehouse: process.env.AVNR_SNOWFLAKE_WAREHOUSE,
  database: process.env.AVNR_SNOWFLAKE_DB,
  schema: process.env.AVNR_SNOWFLAKE_SCHEMA
};

const leo_conn = {
  account: process.env.LEO_SNOWFLAKE_ACCT,
  username: process.env.LEO_SNOWFLAKE_USER,
  password: process.env.LEO_SNOWFLAKE_PASS,
  role: process.env.LEO_SNOWFLAKE_ROLE,
  warehouse: process.env.LEO_SNOWFLAKE_WAREHOUSE,
  database: process.env.LEO_SNOWFLAKE_DB,
  schema: process.env.LEO_SNOWFLAKE_SCHEMA
}

const connection = snowflake.createConnection(leo_conn);


app.post('/', async (req, res) => {

  connection.connect((err, conn) => {
    if(err) {
      console.log(`Unable to connect: ${err}`)
    } else {
      console.log('Successfully connected to Snowflake')
    }
  })
  connection.execute({
    sqlText: process.env.LEO_SAMPLE_QUERY,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Failed to execute statement: ${err.message}`);
      } else {
        console.log(`Statement produced ${JSON.stringify(rows)}`);
        let results = JSON.stringify(rows)
        res.send(results)
      }
    }
  });
});


app.listen(5000, () => {
  console.log(`app listening on port ${5000}`)
});