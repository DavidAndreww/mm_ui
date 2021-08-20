export const ColumnHeaders = (data = null) => {
  if (data === null) {
    return []
  } else if (data['current'] || data['previous'] === undefined) {
    return [
      { headerName: 'Payer', field: 'payer' },
        { headerName: 'Enterprise - Ben Type', field: 'enterpriseBenType' },
        { headerName: 'PBM', field: 'pbm'},
        { headerName: 'Coverage', field: 'coverage' },
        { headerName: 'PA', field: 'pa' },
        { headerName: 'ST', field: 'st' },
        { headerName: 'Lives', field: 'livesCurrPeriod'},
        { headerName: 'Live Share Plans', field: 'livesShareCurrPeriod' },
        { headerName: 'Market TRxEQ ', field: 'marketTrxCurrPeriod' },
        { headerName: 'Brand TRxEQ ', field: 'brandTrxCurrPeriod' },
        { headerName: 'Brand TRxEQ/1000 Lives', field: 'brandTrxEQLivesCurrPeriod' },
        { headerName: 'Brand TRxEQ % Change', field: 'brandTrxEQChangeCurrPeriod' },
        { headerName: 'Reject Rate', field: 'rejectRateCurrPeriod'},
        { headerName: 'Reversal Rate', field: 'reversalRateCurrPeriod'},
        { headerName: 'OPC Ask', field: 'opcAskCurrPeriod'},
        { headerName: 'OPC Paid', field: 'opcPaidCurrPeriod'}
    ]
  } else if (data['current'] && data['previous']) {
    return [
        { headerName: 'Payer', field: 'payer' },
        { headerName: 'Enterprise - Ben Type', field: 'enterpriseBenType' },
        { headerName: 'PBM', field: 'pbm'},
        { headerName: 'Coverage', field: 'coverage' },
        { headerName: 'PA', field: 'pa' },
        { headerName: 'ST', field: 'st' },
        { headerName: 'Lives - CP', field: 'livesCurrPeriod'},
        { headerName: 'Lives - PP', field: 'livesPrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Live Share Plans- CP', field: 'livesShareCurrPeriod'},
        { headerName: 'Live Share All Plans - PP', field: 'livesSharePrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Market TRxEQ - CP', field: 'marketTrxCurrPeriod'},
        { headerName: 'Market TRxEQ - PP', field: 'marketTrxPrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Brand TRxEQ - CP', field: 'brandTrxCurrPeriod'},
        { headerName: 'Brand TRxEQ - PP', field: 'brandTrxPrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Brand TRxEQ/1000 Lives - CP', field: 'brandTrxEQLivesCurrPeriod'},
        { headerName: 'Brand TRxEQ/1000 Lives - PP', field: 'brandTrxEQLivesPrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Brand TRxEQ % Change - CP', field: 'brandTrxEQChangeCurrPeriod'},
        { headerName: 'Brand TRxEQ % Change - PP', field: 'brandTrxEQChangePrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Reject Rate - CP', field: 'rejectRateCurrPeriod'},
        { headerName: 'Reject Rate - PP', field: 'rejectRatePrevPeriod', cellClass: 'previous-period'},
        { headerName: 'Reversal Rate - CP', field: 'reversalRateCurrPeriod'},
        { headerName: 'Reversal Rate - PP', field: 'reversalRatePrevPeriod', cellClass:'previous-period'},
        { headerName: 'OPC Ask - CP', field: 'opcAskCurrPeriod'},
        { headerName: 'OPC Ask - PP', field: 'opcAskPrevPeriod', cellClass:'previous-period'},
        { headerName: 'OPC Paid - CP', field: 'opcPaidCurrPeriod'},
        { headerName: 'OPC Paid - PP', field: 'opcPaidPrevPeriod', cellClass: 'previous-period'}
    ]
  }
}