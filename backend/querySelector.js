const querySelector = (params, queryNo) => {
  let query;
  let activeFilters = {}
  for(const field in params) {
    if (params[field] && field !== 'engine' && field !== 'result') {
      activeFilters[field] = params[field]
    }
  }
  for(const fields in activeFilters) {
    
  }

  if(queryNo === 1) {
    activeFilters.dateOne = activeFilters.currStartDate;
    activeFilters.dateTwo = activeFilters.currEndDate;
 } else if (queryNo === 2) {
   activeFilters.dateOne = activeFilters.prevEndDate;
   activeFilters.dateTwo = activeFilters.prevEndDate;
 }
  
 //! Need to incorporate dates when finalized query is ready
  return `SELECT 
  PAYER_NAME, 
  BOB, 
  PBM_VENDOR_NAME, 
  CURRENT_COVERAGE_TYPE, 
  CURRENT_PA, 
  CURRENT_ST, 
  ROUND(AVG(LIVES)) as LIVES,
  ROUND(AVG(LIVES) / (select SUM(lives) from "AVNR_PROD"."L3"."RPT_MANAGED_MARKETS_HCP_AE" WHERE PAYER_LEVEL = 'Payer Entity' AND PAYER_NAME  ${activeFilters.payerentity ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.payerentity +")))) " : " IS NOT NULL "}) LIVES_SHARE ,
  ROUND(SUM(MARKET_CURR_PD_TRXEQ)) AS MARKET_TRXEQ,
  ROUND(SUM(BRAND_CURR_PD_TRXEQ)) AS BRAND_TRXEQ,
  ROUND(1000 * SUM(BRAND_CURR_PD_TRXEQ) / AVG(LIVES)) AS BRAND_TRXEQ_1000_LIVES,
  ROUND((SUM(BRAND_CURR_PD_TRXEQ) - SUM(BRAND_PRIOR_PD_TRXEQ)) / SUM(BRAND_PRIOR_PD_TRXEQ), 2) AS BRAND_TRXEQ_CHANGE,
  CASE WHEN (SUM(CURR_PD_BRAND_REJECTED_CLAIMS) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS)) = 0 THEN 0 ELSE
             ROUND(SUM(CURR_PD_BRAND_REJECTED_CLAIMS) / (SUM(CURR_PD_BRAND_REJECTED_CLAIMS	) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS)), 2) END AS REJECT_RATE,
  CASE WHEN (SUM(CURR_PD_BRAND_REJECTED_CLAIMS	) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS))= 0 THEN 0 ELSE
  ROUND(SUM(CURR_PD_BRAND_REVERSED_CLAIMS) / (SUM(CURR_PD_BRAND_REJECTED_CLAIMS) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS)),2) END AS REVERSAL_RATE,
  MEDIAN(CURR_PD_OPC_ASK) AS OPC_ASK,
  MEDIAN(CURR_PD_OPC_PAID) AS OPC_PAID
  FROM "AVNR_PROD"."L3"."RPT_MANAGED_MARKETS_HCP_AE" 
  WHERE PAYER_LEVEL = 'Payer Entity' 
  AND PAYER_NAME ${activeFilters.payerentity ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.payerentity +")))) " : " IS NOT NULL "} 
  AND BOB ${activeFilters.bob ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.bob +")))) " : " IS NOT NULL "}
  AND PBM_VENDOR_NAME ${activeFilters.enterprise ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.enterprise +")))) " : " IS NOT NULL "}
  AND REGION_NAME ${activeFilters.region ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.region +")))) " : " IS NOT NULL "}
  AND STATE ${activeFilters.state ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.state +")))) " : " IS NOT NULL "}
  AND TERRITORY_NAME ${activeFilters.territory ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.territory +")))) " : " IS NOT NULL "}
  AND TEAM_NAME ${activeFilters.team ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.team +")))) " : " IS NOT NULL "}
  AND CATEGORY ${activeFilters.category ? " IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.category +")))) " : " IS NOT NULL "}
  GROUP BY 
  PAYER_NAME, 
  BOB, 
  PBM_VENDOR_NAME, 
  CURRENT_COVERAGE_TYPE, 
  CURRENT_PA, 
  CURRENT_ST;`
};




module.exports = { querySelector }