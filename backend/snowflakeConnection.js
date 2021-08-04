const snowflake = require('snowflake-sdk');

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

class Connection {
  constructor() {
    if (!this.odbc) {
      this.odbc = snowflake.createConnection(leo_conn)
      this.odbc.connect((err, conn) => {
        if(err) {
          console.log(`Unable to connect: ${err}`)
        } else {
          console.log('Successfully connected to Snowflake')
        }
      });
      return this.odbc
    }
    return this.odbc
  }
};

const instance = new Connection()
module.exports = instance;