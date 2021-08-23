import React from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColumnHeaders } from './ColumnHeaders';
import { GridRows } from './GridRows'

export const ResultsGrid = ({data}) => {
  const onGridReady = params => {
    params.api.sizeColumnsToFit();
    // params.api.showLoadingOverlay(); 
  };
  const autoSizeColumns = params => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map(col => col.getColId());
    params.columnApi.autoSizeColumns(colIds);
  };

  const gridOptions = {
    defaultColDef: { resizable: true },
    overlayLoadingTemplate:'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
    columnDefs: ColumnHeaders(data),
    rowData: GridRows(data)
  }

  return (

    <div id='results-grid' className='component-boundary ag-theme-alpine ag-overlay-loading-center' style={{height:'250px'}} >       
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

