

const defaultSlicers = function(param){
    if(param === 1){
        return `select market, ARRAY_AGG(brand) As Brand from 
        (select distinct market , brand
        from avnr_mdm_uat.l1.dim_brand_market_vw)
        group by market;`;
    }else if(param===2){
        return 'select distinct payer_entity,bob, enterprise from AVNR_MDM_UAT.L1.PAYER_HIERARCHY_PAYER_PLAN;';
    }else if(param===3){
        return 'select distinct category, team_name from AVNR_MDM_UAT.L1.ZIP5_TO_TERR_WITH_WHITESPACE;';
    }else if(param===4){
        return 'select row_number, split_week_start_date, split_week_end_date from "AVNR_MDM_UAT"."L1"."IMS_SPLIT_WEEK_CALENDAR";';
    }
}

module.exports = {defaultSlicers}