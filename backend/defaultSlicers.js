

const defaultSlicers = function(param){
    if(param === 1){
        return `select brand, market from "AVNR_MDM_UAT"."L1"."DIM_BRAND_MARKET_VW" where is_internal = TRUE;`;
    }else if(param===2){
        return `select distinct payer_entity, bob, concat(enterprise, ' - ' , pop_desc) as enterprise from AVNR_MDM_UAT.L1.PAYER_HIERARCHY_PAYER_PLAN;`;
    }else if(param===3){
        return 'select distinct category, team_name from AVNR_MDM_UAT.L1.ZIP5_TO_TERR_WITH_WHITESPACE;';
    }else if(param===4){
        return 'select row_number, split_week_start_date, split_week_end_date from "AVNR_MDM_UAT"."L1"."IMS_SPLIT_WEEK_CALENDAR";';
    }else if(param===5){
        return `select payer_entity, ARRAY_AGG(bob) as BOB_ARR  from AVNR_MDM_UAT.L1.PAYER_HIERARCHY_PAYER_PLAN group by payer_entity;`;
    }
    else if(param===6){
        return `select distinct territory_name, state, region from AVNR_MDM_UAT.L1.AXTRIA_ZIPTERR where territory_name is not NULL;`;
    }
    else if(param===7){
        return `select territory_name, ARRAY_AGG(distinct state) as ST_ARR  from AVNR_MDM_UAT.L1.AXTRIA_ZIPTERR group by territory_name;`;
    }
}

module.exports = {defaultSlicers}