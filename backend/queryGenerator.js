const queryGenerator = (params, queryNo) => {
  let activeFilters = {}
  for(const field in params) {
    if (params[field] && field !== 'engine' && field !== 'result') {
      activeFilters[field] = params[field]
    }
  }
  JSON.stringify(activeFilters)

  if(queryNo === 1) {
    activeFilters.dateOne = activeFilters.currStartDate;
    activeFilters.dateTwo = activeFilters.currEndDate;
 } else if (queryNo === 2) {
   activeFilters.dateOne = activeFilters.prevEndDate;
   activeFilters.dateTwo = activeFilters.prevEndDate;
 }
console.log(activeFilters.enterprise)  
 //! Need to incorporate dates when finalized query is ready
  return `SELECT 
  PAYER_NAME, 
  BOB, 
  PBM_VENDOR_NAME, 
  CURRENT_COVERAGE_TYPE, 
  CURRENT_PA, 
  CURRENT_ST, 
  ROUND(AVG(LIVES)) as LIVES,
  ROUND(AVG(LIVES) / (select SUM(lives) from "AVNR_PROD"."L3"."RPT_MANAGED_MARKETS_HCP_AE" WHERE PAYER_LEVEL = 'Payer Entity' ${activeFilters.payerentity ? " AND PAYER_NAME IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+activeFilters.payerentity+"))))) " : " )"}) AS LIVES_SHARE,
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
  ${activeFilters.payerentity ? " AND PAYER_NAME IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.payerentity +")))) " : " "} 
  ${activeFilters.bob ? " AND BOB IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.bob +")))) " : " "}
  ${activeFilters.enterprise ? " AND PBM_VENDOR_NAME IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.enterprise +")))) " : " "}
  ${activeFilters.region ? " AND REGION_NAME IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.region +")))) " : " "}
  ${activeFilters.state ? " AND STATE IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.state +")))) " : " "}
  ${activeFilters.territory ? " AND TERRITORY_NAME IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.territory +")))) " : " "}
  ${activeFilters.team ? " AND TEAM_NAME IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.team +")))) " : " "}
  ${activeFilters.category ? " AND CATEGORY IN (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON("+ activeFilters.category +")))) " : " "}
  GROUP BY 
  PAYER_NAME, 
  BOB, 
  PBM_VENDOR_NAME, 
  CURRENT_COVERAGE_TYPE, 
  CURRENT_PA, 
  CURRENT_ST;`
};




module.exports = { queryGenerator }