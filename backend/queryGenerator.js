const queryGenerator = (params, queryNo) => {
  let activeFilters = {}
  for (const field in params) {
    if (params[field] && field !== 'result') {
      activeFilters[field] = params[field]
    }
  }

  if (queryNo === 1) {
    activeFilters.dateOne = activeFilters.currStartDate;
    activeFilters.dateTwo = activeFilters.currEndDate;
  } else if (queryNo === 2) {
    activeFilters.dateOne = activeFilters.prevStartDate;
    activeFilters.dateTwo = activeFilters.prevEndDate;
  }
  console.log('Active Filters', activeFilters)

  let var_brand = JSON.stringify(activeFilters.brand);
  let var_market = JSON.stringify(activeFilters.market);
  let var_payer_entity = JSON.stringify(activeFilters.payerentity);
  let var_bob = JSON.stringify(activeFilters.bob);
  let var_enterprise = JSON.stringify(activeFilters.enterprise);
  let var_state = JSON.stringify(activeFilters.state);
  let var_region = JSON.stringify(activeFilters.region);
  let var_territory = JSON.stringify(activeFilters.territory);
  let var_team = JSON.stringify(activeFilters.team);
  let var_category = JSON.stringify(activeFilters.category);
  let bt = true;

  if (activeFilters.engine === 'Snowflake L2')
    return `SELECT DISTINCT
 A.PAYER_ENTITY_ID,
 A.PAYER, 
 A.ENTERPRISE_BENTYPE, 
 A.PBM,
 B.COVERAGE_TYPE, 
 B.PA, 
 B.ST,
 C.LIVES,
 CASE WHEN D.TOTAL_LIVES > 0 THEN ROUND((C.LIVES / D.TOTAL_LIVES)*100, 2) ELSE 0 END AS LIVES_SHARE_ALL_PLANS,
 E.MARKET_TRxEQ,
 E.BRAND_TRxEQ,
 CASE WHEN C.LIVES > 0 THEN ROUND((E.BRAND_TRXEQ / C.LIVES * 1000),2) ELSE 0 END AS BRAND_TRxEQ_per_1000_LIVES,
 F.REJECT_RATE,
 F.REVERSAL_RATE
FROM(
SELECT
 CONCAT(PAYER_ENTITY, ' - ', POP_DESC) AS PAYER, 
 CONCAT(ENTERPRISE, ' - ', POP_DESC) AS ENTERPRISE_BENTYPE, 
 PBM_VENDOR AS PBM,
 BOB,
 PAYER_ENTITY,
 PAYER_ENTITY_ID
FROM L1.PAYER_HIERARCHY_PAYER_PLAN) AS A
--COVERAGE, PA, ST
LEFT JOIN(
SELECT
 COVERAGE AS COVERAGE_TYPE, 
 PA, 
 ST, 
 PAYER_LEVEL_ID    
FROM L1.MMIT_STAGING_FORMULARY_MAJORITY AS A
LEFT JOIN L1.DIM_BRAND_MARKET_VW AS BRIDGE 
 ON A.DRUG_ID = BRIDGE.DRUG_ID 
 WHERE BRIDGE.BRAND = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('${var_brand}')))) 
 AND MMIT_DATE = (
   SELECT MAX(MMIT_DATE) 
   FROM L1.MMIT_STAGING_FORMULARY_MAJORITY) 
 AND GEO_LEVEL = 'National') AS B
ON A.PAYER_ENTITY_ID = B.PAYER_LEVEL_ID    
--LIVES
LEFT JOIN(WITH CTE_LIVES AS (
 SELECT 
     A.PAYER_ENTITY_ID, 
     A.ZIP5, 
     SUM(LIVES) AS LIVES 
 FROM L2.MMIT_LIVES AS A 
 INNER JOIN L1.PAYER_HIERARCHY_PAYER_PLAN AS B 
     ON A.PAYER_ENTITY_ID = B.PAYER_ENTITY_ID 
 LEFT JOIN (
   SELECT 
     PAYER_ENTITY_ID,
     LAST_DAY(MAX(PROCESSING_DATE)) AS MAX_DATE 
   FROM L1.MMIT_DATAFEED_ZIP_CODE AS A 
   LEFT JOIN (
     SELECT 
         VENDOR_PLAN_ID AS PAYER_PLAN_ID, 
         PLAN_ID AS PAYER_ENTITY_ID 
     FROM L1.PAYER_VENDOR_BRIDGE 
     WHERE VENDOR = 'MMIT') AS B
   ON A.ORG_ID = B.PAYER_PLAN_ID 
   GROUP BY PAYER_ENTITY_ID) AS T2 
 ON A.PAYER_ENTITY_ID=T2.PAYER_ENTITY_ID 
                WHERE A.MONTH_ENDING_DATE=T2.MAX_DATE 
 GROUP BY A.PAYER_ENTITY_ID, A.ZIP5), 

CTE_LIVES_PAYER_LEVEL_ID AS ( 
 SELECT 
     A.PAYER_ENTITY_ID,
     COALESCE(B.Territory_ID,'Not Available') AS TERRITORY_ID, 
     COALESCE(C.State,'Not Available') AS STATE, 
     COALESCE(TEAM.CATEGORY,B.CATEGORY, 'Not Available') AS CATEGORY, 
     COALESCE(TEAM.TEAM,B.TEAM_NAME,'Not Available') AS TEAM_NAME, 
     SUM(Lives) as LIVES 
 FROM CTE_LIVES AS A 
 cross join L1.CATEGORY_TO_TEAM TEAM 
 left join L1.ZIP5_TO_TERR_WITH_WHITESPACE AS b 
 on LPAD(a.Zip5,5,'0') = b.Zip5 
     and TEAM.CATEGORY=B.CATEGORY 
     and TEAM.TEAM=B.TEAM_NAME 
 left join L1.ZIP3_TO_STATE AS c 
 on left(LPAD(a.Zip5,5,'0'),3) = c.Zip3             
 group by 
     A.PAYER_ENTITY_ID,
     COALESCE(
       TEAM.CATEGORY,
       B.CATEGORY, 
       'Not Available'), 
     COALESCE(
       TEAM.TEAM,
       B.TEAM_NAME,
       'Not Available'), 
     b.Territory_ID,
     c.State ),
     
CTE_LIVES_PER_PAYER_ENTITY_TEAM AS
(SELECT PAYER_ENTITY_ID, TEAM_NAME, ROUND(SUM(LIVES)) AS TOTAL_LIVES
FROM (
 SELECT 
     TEAM_NAME, 
     AVG(LIVES) AS LIVES, 
     PAYER_ENTITY_ID
 FROM CTE_LIVES_PAYER_LEVEL_ID
 WHERE TEAM_NAME != 'Not Available'
 GROUP BY PAYER_ENTITY_ID, TEAM_NAME, TERRITORY_ID, STATE
     )
GROUP BY PAYER_ENTITY_ID, TEAM_NAME)


SELECT PAYER_ENTITY_ID, ROUND(AVG(TOTAL_LIVES)) AS LIVES 
FROM CTE_LIVES_PER_PAYER_ENTITY_TEAM 
GROUP BY PAYER_ENTITY_ID) AS C
ON A.PAYER_ENTITY_ID = C.PAYER_ENTITY_ID
--TOTAL LIVES
LEFT JOIN(WITH CTE_LIVES AS (
 SELECT 
     A.PAYER_ENTITY_ID, 
     A.ZIP5, 
     SUM(LIVES) AS LIVES 
 FROM L2.MMIT_LIVES AS A 
 INNER JOIN L1.PAYER_HIERARCHY_PAYER_PLAN AS B 
     ON A.PAYER_ENTITY_ID = B.PAYER_ENTITY_ID 
 LEFT JOIN (
   SELECT 
     PAYER_ENTITY_ID,
     LAST_DAY(MAX(PROCESSING_DATE)) AS MAX_DATE 
   FROM L1.MMIT_DATAFEED_ZIP_CODE AS A 
   LEFT JOIN (
     SELECT 
         VENDOR_PLAN_ID AS PAYER_PLAN_ID, 
         PLAN_ID AS PAYER_ENTITY_ID 
     FROM L1.PAYER_VENDOR_BRIDGE 
     WHERE VENDOR = 'MMIT') AS B
   ON A.ORG_ID = B.PAYER_PLAN_ID 
   GROUP BY PAYER_ENTITY_ID) AS T2 
 ON A.PAYER_ENTITY_ID=T2.PAYER_ENTITY_ID 
                WHERE A.MONTH_ENDING_DATE=T2.MAX_DATE 
 GROUP BY A.PAYER_ENTITY_ID, A.ZIP5), 

CTE_LIVES_PAYER_LEVEL_ID AS ( 
 SELECT 
     A.PAYER_ENTITY_ID,
     COALESCE(B.Territory_ID,'Not Available') AS TERRITORY_ID, 
     COALESCE(C.State,'Not Available') AS STATE, 
     COALESCE(TEAM.CATEGORY,B.CATEGORY, 'Not Available') AS CATEGORY, 
     COALESCE(TEAM.TEAM,B.TEAM_NAME,'Not Available') AS TEAM_NAME, 
     SUM(Lives) as LIVES 
 FROM CTE_LIVES AS A 
 cross join L1.CATEGORY_TO_TEAM TEAM 
 left join L1.ZIP5_TO_TERR_WITH_WHITESPACE AS b 
 on LPAD(a.Zip5,5,'0') = b.Zip5 
     and TEAM.CATEGORY=B.CATEGORY 
     and TEAM.TEAM=B.TEAM_NAME 
 left join L1.ZIP3_TO_STATE AS c 
 on left(LPAD(a.Zip5,5,'0'),3) = c.Zip3             
 group by 
     A.PAYER_ENTITY_ID,
     COALESCE(
       TEAM.CATEGORY,
       B.CATEGORY, 
       'Not Available'), 
     COALESCE(
       TEAM.TEAM,
       B.TEAM_NAME,
       'Not Available'), 
     b.Territory_ID,
     c.State )
     
SELECT ROUND(SUM(LIVES)) AS TOTAL_LIVES
FROM (
 SELECT 
     TEAM_NAME, 
     AVG(LIVES) AS LIVES, 
     PAYER_ENTITY_ID
 FROM CTE_LIVES_PAYER_LEVEL_ID
 WHERE TEAM_NAME != 'Not Available'
 GROUP BY PAYER_ENTITY_ID, TEAM_NAME, TERRITORY_ID, STATE
     )
GROUP BY TEAM_NAME) AS D
ON A.PAYER_ENTITY_ID = C.PAYER_ENTITY_ID
--MARKET & BRAND
LEFT JOIN(
 With BRND AS(
     SELECT
         A.PAYER_ENTITY_ID,
         A.BRAND,
         B.MARKET,
         ROUND(SUM(TRXEQ)) AS BRAND_TRxEQ
     FROM L2.XPT_TRANSACTIONS_SPLIT_WEEKLY AS A
     LEFT JOIN L1.DIM_BRAND_MARKET_VW AS B
         ON A.MDM_BRAND_ID = B.BRAND_ID
     WHERE ROW_NUMBER BETWEEN ${activeFilters.dateOne} AND ${activeFilters.dateTwo}
         AND A.BRAND = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('${var_brand}'))))
         AND B.MARKET = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('${var_market}'))))
     GROUP BY
         A.PAYER_ENTITY_ID,
         A.BRAND,
         B.MARKET),
 MKT AS (
     SELECT
         A.PAYER_ENTITY_ID,
         B.MARKET,
         ROUND(SUM(TRXEQ)) AS MARKET_TRxEQ
     FROM L2.XPT_TRANSACTIONS_SPLIT_WEEKLY AS A
     LEFT JOIN L1.DIM_BRAND_MARKET_VW AS B
         ON A.MDM_BRAND_ID = B.BRAND_ID
     WHERE ROW_NUMBER BETWEEN ${activeFilters.dateOne} AND ${activeFilters.dateTwo}
         AND B.MARKET = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('${var_market}'))))
     GROUP BY
         A.PAYER_ENTITY_ID,
         B.MARKET)
 SELECT
     BRND.PAYER_ENTITY_ID,
     BRND.MARKET,
     MKT.MARKET_TRxEQ,
     BRND.BRAND,
     BRND.BRAND_TRxEQ
 FROM BRND
 LEFT JOIN MKT
     ON BRND.PAYER_ENTITY_ID = MKT.PAYER_ENTITY_ID
     AND BRND.MARKET = MKT.MARKET) AS E
ON A.PAYER_ENTITY_ID = E.PAYER_ENTITY_ID 
--REJECT & REVERSAL RATES
LEFT JOIN (
 WITH LCT AS (
SELECT
PROF_ZIP,
PAYER_ENTITY_ID,
SPLIT_WEEK_ROW_NUMBER,
BRAND,
CLAIM_ID,
CLAIM_TYPE,
PRESCRIBER_ZIP,
LIFE_CYCLE_CLAIMS_YN
FROM L2.LAAD_CLAIMS),
CB AS(
SELECT
     A.SPLIT_WEEK_ROW_NUMBER,
     A.LIFE_CYCLE_CLAIMS_YN,
     A.PAYER_ENTITY_ID,
     A.CLAIM_TYPE,
     A.BRAND,
     COUNT(A.CLAIM_ID) AS CLAIMCNT
 FROM (
   SELECT LC.* 
     FROM (
       (SELECT 
        PROF_ZIP,
        PAYER_ENTITY_ID,
        SPLIT_WEEK_ROW_NUMBER,
        BRAND,
        CLAIM_ID,
        CLAIM_TYPE,
        PRESCRIBER_ZIP,
        LIFE_CYCLE_CLAIMS_YN
       FROM L3.LAAD_CLAIMS_TERR
       WHERE CLAIM_STATUS IN ('F','S')) AS LC)) AS A
 INNER JOIN L1.ZIP3_TO_STATE AS C
ON LEFT(COALESCE(A.PROF_ZIP, A.PRESCRIBER_ZIP),3) = C.ZIP3
 GROUP BY
     A.SPLIT_WEEK_ROW_NUMBER,
     A.LIFE_CYCLE_CLAIMS_YN,
     A.PAYER_ENTITY_ID,
     A.CLAIM_TYPE,
     A.BRAND),
LADC AS(
SELECT
 PAYER_ENTITY_ID,
 SPLIT_WEEK_ROW_NUMBER,
 BRAND,
 SUM(CASE WHEN LIFE_CYCLE_CLAIMS_YN = 'Y' AND CLAIM_TYPE = 'PD' THEN CLAIMCNT ELSE 0 END) AS BRAND_ACCEPTED_CLAIMS,
 SUM(CASE WHEN LIFE_CYCLE_CLAIMS_YN = 'Y' AND CLAIM_TYPE = 'RV' THEN CLAIMCNT ELSE 0 END) AS BRAND_REVERSED_CLAIMS,
 SUM(CASE WHEN LIFE_CYCLE_CLAIMS_YN = 'Y' AND CLAIM_TYPE = 'RJ' THEN CLAIMCNT ELSE 0 END) AS BRAND_REJECTED_CLAIMS
FROM CB
GROUP BY
 PAYER_ENTITY_ID,
 SPLIT_WEEK_ROW_NUMBER,
 BRAND),
SW AS (
SELECT
 SPLIT_WEEK_ROW_NUMBER,
 BRAND,
 PAYER_ENTITY_ID,
 SUM(BRAND_ACCEPTED_CLAIMS) AS CURR_PD_BRAND_ACCEPTED_CLAIMS,
 SUM(BRAND_REVERSED_CLAIMS) AS CURR_PD_BRAND_REVERSED_CLAIMS,
 SUM(BRAND_REJECTED_CLAIMS) AS CURR_PD_BRAND_REJECTED_CLAIMS
FROM LADC
GROUP BY
 SPLIT_WEEK_ROW_NUMBER,
 BRAND,
 PAYER_ENTITY_ID),
RLCH AS(
SELECT
 SPLIT_WEEK_ROW_NUMBER,
 BRAND, 
 PAYER_ENTITY_ID,
 SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS) AS CURR_PD_BRAND_ACCEPTED_CLAIMS,
 SUM(CURR_PD_BRAND_REVERSED_CLAIMS) AS CURR_PD_BRAND_REVERSED_CLAIMS,
 SUM(CURR_PD_BRAND_REJECTED_CLAIMS) AS CURR_PD_BRAND_REJECTED_CLAIMS
FROM SW
GROUP BY
 SPLIT_WEEK_ROW_NUMBER,
 BRAND, 
 PAYER_ENTITY_ID)
SELECT CASE WHEN (SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_REJECTED_CLAIMS)) = 0 THEN 0 ELSE
        ROUND(SUM(CURR_PD_BRAND_REJECTED_CLAIMS) / (SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_REJECTED_CLAIMS)) * 100,2) END AS REJECT_RATE,
    CASE WHEN (SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_REJECTED_CLAIMS)) = 0 THEN 0 ELSE
        ROUND(SUM(CURR_PD_BRAND_REVERSED_CLAIMS) / (SUM(CURR_PD_BRAND_ACCEPTED_CLAIMS) + SUM(CURR_PD_BRAND_REVERSED_CLAIMS) + SUM(CURR_PD_BRAND_REJECTED_CLAIMS)) * 100,2) END AS REVERSAL_RATE,
    PAYER_ENTITY_ID
FROM RLCH AS A
WHERE SPLIT_WEEK_ROW_NUMBER BETWEEN ${activeFilters.dateOne} AND ${activeFilters.dateTwo} 
AND BRAND = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('${var_brand}'))))
GROUP BY PAYER_ENTITY_ID) AS F
ON A.PAYER_ENTITY_ID = F.PAYER_ENTITY_ID  
--FILTERS
LEFT JOIN(WITH CTE_LIVES AS (
 SELECT 
     A.PAYER_ENTITY_ID, 
     A.ZIP5
 FROM L2.MMIT_LIVES AS A 
 LEFT JOIN (
   SELECT 
     PAYER_ENTITY_ID,
     LAST_DAY(MAX(PROCESSING_DATE)) AS MAX_DATE 
   FROM L1.MMIT_DATAFEED_ZIP_CODE AS A 
   LEFT JOIN (
     SELECT 
         VENDOR_PLAN_ID AS PAYER_PLAN_ID, 
         PLAN_ID AS PAYER_ENTITY_ID 
     FROM L1.PAYER_VENDOR_BRIDGE 
     WHERE VENDOR = 'MMIT') AS B
   ON A.ORG_ID = B.PAYER_PLAN_ID 
   GROUP BY PAYER_ENTITY_ID) AS T2 
 ON A.PAYER_ENTITY_ID=T2.PAYER_ENTITY_ID 
                WHERE A.MONTH_ENDING_DATE=T2.MAX_DATE 
 GROUP BY A.PAYER_ENTITY_ID, A.ZIP5)
 
 SELECT 
     A.PAYER_ENTITY_ID,
     COALESCE(B.Territory_ID,'Not Available') AS TERRITORY_ID, 
     COALESCE(C.State,'Not Available') AS STATE, 
     TERR.TERRITORY_NAME,
     TERR.REGION
 FROM CTE_LIVES AS A 
 cross join L1.CATEGORY_TO_TEAM TEAM 
 left join L1.ZIP5_TO_TERR_WITH_WHITESPACE AS b 
 on LPAD(a.Zip5,5,'0') = b.Zip5 
     and TEAM.CATEGORY=B.CATEGORY 
     and TEAM.TEAM=B.TEAM_NAME 
 left join L1.ZIP3_TO_STATE AS c 
 on left(LPAD(a.Zip5,5,'0'),3) = c.Zip3
 LEFT JOIN(
 SELECT DISTINCT
     TERRITORY_ID, 
     TERRITORY_NAME,
     REGION 
 FROM L1.AXTRIA_ZIPTERR) AS TERR
 ON TERR.TERRITORY_ID = b.TERRITORY_ID
 group by 
     A.PAYER_ENTITY_ID,
     COALESCE(
       TEAM.CATEGORY,
       B.CATEGORY, 
       'Not Available'), 
     COALESCE(
       TEAM.TEAM,
       B.TEAM_NAME,
       'Not Available'), 
     b.Territory_ID,
     c.State, 
     TERR.TERRITORY_NAME,
     TERR.REGION) AS FILTERS
On A.PAYER_ENTITY_ID = FILTERS.PAYER_ENTITY_ID   
WHERE 
${activeFilters.enterprise ? "  A.ENTERPRISE_BENTYPE IN (select value from table(flatten ( input => parse_json('" + var_enterprise + "')))) AND " : " "}
${activeFilters.bob ? " A.BOB = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('" + var_bob + "')))) AND " : " "}
${activeFilters.payerentity ? "  A.PAYER_ENTITY IN (select value from table(flatten ( input => parse_json('" + var_payer_entity + "')))) AND " : " "}
${activeFilters.region ? " FILTERS.REGION = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('" + var_region + "')))) AND " : " "}
${activeFilters.state ? " FILTERS.STATE = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('" + var_state + "')))) AND " : " "}
${activeFilters.territory ? " FILTERS.TERRITORY_NAME = (SELECT VALUE FROM TABLE(FLATTEN (INPUT => PARSE_JSON('" + var_territory + "')))) AND " : " "}
${bt};`


  if (activeFilters.engine === 'Snowflake L3')
    return `select distinct brand  from "AVNR_MDM"."MI_TEST"."L1_DIM_BRAND" limit 5;`;

};


module.exports = { queryGenerator }