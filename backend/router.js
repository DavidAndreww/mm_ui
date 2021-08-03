const express = require('express');
const router = express.Router();
const connection = require('./snowflakeConnection')

router.post('/', async (req, res) => {  
  let payerVar = req.body.parameters.payerentity[0]
  connection.execute({
    sqlText: `
    SELECT 
    PAYER_NAME, 
    BOB, 
    PBM_VENDOR_NAME, 
    CURRENT_COVERAGE_TYPE, 
    CURRENT_PA, 
    CURRENT_ST, 
    ROUND(AVG(LIVES)) as LIVES,
    ROUND(AVG(LIVES) / (select SUM(lives) from "AVNR_PROD"."L3"."RPT_MANAGED_MARKETS_HCP_AE" WHERE PAYER_LEVEL = 'Payer Entity' AND PAYER_NAME ILIKE '${payerVar}%')) AS LIVES_SHARE_ALL_PLANS,
    ROUND(SUM(MARKET_CURR_PD_TRXEQ)) AS MARKET_TRXEQ,
    ROUND(SUM(BRAND_CURR_PD_TRXEQ)) AS BRAND_TRXEQ,
    ROUND(1000 * SUM(BRAND_CURR_PD_TRXEQ) / AVG(LIVES)) AS BRAND_TRXEQ_1000_LIVES,
    ROUND((SUM(BRAND_CURR_PD_TRXEQ) - SUM(BRAND_PRIOR_PD_TRXEQ)) / SUM(BRAND_PRIOR_PD_TRXEQ), 2) AS BRAND_TRXEQ_CHANGE,
    ROUND(SUM(CURR_PD_BRAND_REJECTED_CLAIMS) / (SUM(CURR_PD_BRAND_REJECTED_CLAIMS	) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS)), 2) AS REJECT_RATE,
    ROUND(SUM(CURR_PD_BRAND_REVERSED_CLAIMS) / (SUM(CURR_PD_BRAND_REJECTED_CLAIMS	) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS)),2) AS REVERSAL_RATE,
    MEDIAN(CURR_PD_OPC_ASK) AS OPC_ASK,
    MEDIAN(CURR_PD_OPC_PAID) AS OPC_PAID
    FROM "AVNR_PROD"."L3"."RPT_MANAGED_MARKETS_HCP_AE" 
    WHERE PAYER_LEVEL = 'Payer Entity' 
    AND PAYER_NAME ILIKE '${payerVar}%' 
    GROUP BY
    PAYER_NAME, 
    BOB, 
    PBM_VENDOR_NAME, 
    CURRENT_COVERAGE_TYPE, 
    CURRENT_PA, 
    CURRENT_ST;`,
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