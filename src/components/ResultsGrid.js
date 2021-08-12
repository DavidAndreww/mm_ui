import React from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const ResultsGrid = ({data}) => {
  const onGridReady = params => {
    params.api.sizeColumnsToFit();
  };
  const autoSizeColumns = params => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map(col => col.getColId());
    params.columnApi.autoSizeColumns(colIds,params);
  };

  const [gridOptions] = React.useState({
      defaultColDef: {
          resizable: true,
      },
      columnDefs: [
        { headerName: 'Payer', field: 'payer' },
        { headerName: 'Enterprise - Ben Type', field: 'enterpriseBenType' },
        { headerName: 'PBM', field: 'pbm'},
        { headerName: 'Coverage', field: 'coverage' },
        { headerName: 'PA', field: 'pa' },
        { headerName: 'ST', field: 'st' },
        { headerName: 'Lives - PP', field: 'lives'},
        { headerName: 'Lives - CP', field: 'livesCurrPeriod',cellClass: 'current-period'},
        { headerName: 'Live Share All Plans - PP', field: 'liveShareAllPlans'},
        { headerName: 'Live Share Plans- CP', field: 'livesShareCurrPeriod' ,cellClass: 'current-period'},
        { headerName: 'Market TRxEQ - PP', field: 'marketTRxEQ'},
        { headerName: 'Market TRxEQ - CP', field: 'marketTrxCurrPeriod',cellClass: 'current-period' },
        { headerName: 'Brand TRxEQ - PP', field: 'brandTRxEQ' },
        { headerName: 'Brand TRxEQ - CP', field: 'brandTRxCurrPeriod' ,cellClass: 'current-period'},
        { headerName: 'Brand TRxEQ/1000 Lives - PP', field: 'brandTRxEQLives' },
        { headerName: 'Brand TRxEQ/1000 Lives - CP', field: 'brandTRxEQLivesCurrPeriod' ,cellClass: 'current-period'},
        { headerName: 'Brand TRxEQ % Change - PP', field: 'brandTRxEQChange' },
        { headerName: 'Brand TRxEQ % Change - PP', field: 'brandTRxEQChangeCurrPeriod' ,cellClass: 'current-period'},
        { headerName: 'Reject Rate - PP', field: 'rejectRate' },
        { headerName: 'Reject Rate - CP', field: 'rejectRateCurrPeriod',cellClass: 'current-period'},
        { headerName: 'Reversal Rate - PP', field: 'reversalRate' },
        { headerName: 'Reversal Rate - CP', field: 'reversalRateCurrPeriod',cellClass: 'current-period'},
        { headerName: 'OPC Ask - PP', field: 'opcAsk' },
        { headerName: 'OPC Ask - CP', field: 'opcAskCurrPeriod',cellClass: 'current-period'},
        { headerName: 'OPC Paid - PP', field: 'opcPaid'},
        { headerName: 'OPC Paid - CP', field: 'opcPaidCurrPeriod',cellClass: 'current-period'},
      ],
      rowData: [
        {payer: "Cigna - Commercial", enterpriseBenType: "Express Scripts - Commercial", pbm: "Express Scripts",coverage: "Tier 3", pa:"N", st:"N", lives:7133760, livesCurrPeriod: 354346, liveShareAllPlans:'2.37%', livesShareCurrPeriod:12345, marketTRxEQ:85428, brandTRxEQ:1268, brandTRxEQLives: 0.18, brandTRxEQChange: 0.18, rejectRate:'4.01%', reversalRate: '3.04%', opcAsk: '$50.00', opcPaid: '$50.00' },
        {payer: "CVS Health Administered Plans", enterpriseBenType: "CVS Health - Commercial", pbm: "CVS Health",coverage: "Tier 2", pa:"N", st:"N", lives:7133760, livesCurrPeriod: 67345,  liveShareAllPlans:'2.37%',livesShareCurrPeriod:12345, marketTRxEQ:85428, brandTRxEQ:1268, brandTRxEQLives: 0.18, brandTRxEQChange: 0.18, rejectRate:'4.01%', reversalRate: '3.04%', opcAsk: '$50.00', opcPaid: '$50.00' }
      ]
  }); 

  return (
    <div id='results-grid' className='component-boundary ag-theme-alpine' style={{height:'400px'}} >         
        <AgGridReact 
          onGridReady={onGridReady}
          onFirstDataRendered={autoSizeColumns}
          defaultColDef={gridOptions.defaultColDef}
          columnDefs={gridOptions.columnDefs}
          rowData={gridOptions.rowData}>         
        </AgGridReact> 
    </div>
  )
};

