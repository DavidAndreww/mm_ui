export const GridRow = (data = null) => {
  let dataSet = []
  if (data === null) {
    
  } else if (data['current'] && data['previous']) {
    let curr = data['current'];
    let prev = data['previous']
    for (let i = 0; i < data['current'].length - 1; i++) {
      let row = {
        payer: curr[i].PAYER,
        enterpriseBenType: curr[i].ENTERPRISE_BENTYPE,
        pbm: curr[i].PBM,
        coverage: curr[i].COVERAGE_TYPE,
        pa: curr[i].PA,
        st: curr[i].ST,
        livesCurrPeriod: curr[i].LIVES,
        livesPrevPeriod: prev[i].LIVES,
        livesShareCurrPeriod: curr[i].LIVES_SHARE_ALL_PLANS,
        liveSharePrevPeriod: prev[i].LIVES_SHARE_ALL_PLANS,
        marketTrxCurrPeriod: curr[i].MARKET_TRXEQ,
        marketTrxPrevPeriod: prev[i].MARKET_TRXEQ,
        brandTrxCurrPeriod: curr[i].BRAND_TRXEQ,
        brandTrxPrevPeriod: prev[i].BRAND_TRXEQ,
        brandTrxEQLivesCurrPeriod: curr[i].BRAND_TRXEQ_PER_1000_LIVES,
        brandTrxEQLivesPrevPeriod: prev[i].BRAND_TRXEQ_PER_1000_LIVES,
        brandTrxEQChangeCurrPeriod: null,
        brandTrxEQChangePrevPeriod: null,
        rejectRateCurrPeriod: curr[i].REJECT_RATE,
        rejectRatePrevPeriod: prev[i].REJECT_RATE,
        reversalRateCurrPeriod: curr[i].REVERSAL_RATE,
        reversalRatePrevPeriod: prev[i].REVERSAL_RATE,
        opcAskCurrPeriod: null,
        opcAskPrevPeriod: null,
        opcPaidCurrPeriod: null,
        opcPaidPrevPeriod: null
      }
      dataSet.push(row)
    }
  } else if (data['current']) {
    data['current'].forEach(record =>{
      let row = {
        payer: record.PAYER,
        enterpriseBenType: record.ENTERPRISE_BENTYPE,
        pbm: record.PBM, 
        coverage: record.COVERAGE_TYPE,
        pa: record.PA,
        st: record.ST,
        livesCurrPeriod: record.LIVES,
        liveShareCurrPeriod: record.LIVES_SHARE_ALL_PLANS,
        marketTrxCurrPeriod: record.MARKET_TRXEQ,
        brandTrxCurrPeriod: record.BRAND_TRXEQ,
        brandTrxEQLivesCurrPeriod: record.BRAND_TRXEQ_PER_1000_LIVES,
        brandTrxEQChangeCurrPeriod: null,
        rejectRateCurrPeriod: record.REJECT_RATE,
        reversalRateCurrPeriod: record.REVERSAL_RATE,
        opcAskCurrPeriod: null,
        opcPaidCurrPeriod: null
      }
      dataSet.push(row)
    })
  }
  return dataSet
}