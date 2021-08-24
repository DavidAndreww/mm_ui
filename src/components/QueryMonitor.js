import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
import { QueryColumnHeaders } from './QueryColumnHeaders';
import { QueryGridRows } from './QueryGridRows';


export const QueryMonitor = ({data, date}) => {
  const onGridReady = params => {
    params.api.sizeColumnsToFit();
  };
  const autoSizeColumns = params => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map(col => col.getColId());
    params.columnApi.autoSizeColumns(colIds);
  };
  const gridOptions = {
    defaultColDef: { resizable: true },
    columnDefs: QueryColumnHeaders(data),
    rowData: QueryGridRows(data,date)
  }

  return (
    <div id='query-monitor' className='component-boundary scroll-filter' style={{height:'200px'}}>
      <ComponentHeader label={'Query History'}/>
      <ComponentBody>
        <div id='results-grid' className='component-boundary ag-theme-alpine' style={{height:'250px'}}>
        <AgGridReact
          onGridReady={onGridReady}
          onFirstDataRendered={autoSizeColumns}
          defaultColDef={gridOptions.defaultColDef}
          columnDefs={gridOptions.columnDefs}
          rowData={gridOptions.rowData}>
        </AgGridReact>
        </div>

      </ComponentBody>
    </div>
  )
};