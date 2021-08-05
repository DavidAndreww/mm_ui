import React from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar'
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const ResultsGrid = ({data}) => {
  const [gridOptions] = React.useState({
      columnDefs: [
        { headerName: 'Payer', field: 'payer' },
        { headerName: 'Enterprise - Ben Type', field: 'enterpriseBenType' },
        { headerName: 'PBM', field: 'pbm' },
        { headerName: 'Coverage', field: 'coverage' },
        { headerName: 'PA', field: 'pa' },
        { headerName: 'ST', field: 'st' },
        { headerName: 'Lives', field: 'lives' },
        { headerName: 'Live Share All Plans', field: 'liveShareAllPlans' },
        { headerName: 'Market TRxEQ', field: 'marketTRxEQ' },
        { headerName: 'Brand TRxEQ', field: 'brandTRxEQ' },
        { headerName: 'Brand TRxEQ/1000 Lives', field: 'brandTRxEQLives' },
        { headerName: 'Brand TRxEQ % Change', field: 'brandTRxEQChange' },
        { headerName: 'Reject Rate', field: 'rejectRate' }
      ],
      rowData: [
        {payer: "Cigna - Commercial", enterpriseBenType: "Express Scripts - Commercial", pbm: "Express Scripts",coverage: "Tier 3", pa:"N", st:"N", lives:7133760, liveShareAllPlans:'2.37%',marketTRxEQ:85428, brandTRxEQ:1268, brandTRxEQLives: 0.18, brandTRxEQChange: 0.18, rejectRate:'4.01%' },
        {payer: "CVS Health Administered Plans", enterpriseBenType: "CVS Health - Commercial", pbm: "CVS Health",coverage: "Tier 2", pa:"N", st:"N", lives:7133760, liveShareAllPlans:'2.37%',marketTRxEQ:85428, brandTRxEQ:1268, brandTRxEQLives: 0.18, brandTRxEQChange: 0.18, rejectRate:'4.01%' }
      ]
  }); 
  return (
    <div id='results-grid' className='component-boundary ag-theme-alpine' style={{height:'400px'}} >         
        <AgGridReact
          columnDefs={gridOptions.columnDefs}
          rowData={gridOptions.rowData}>         
        </AgGridReact> 
    </div>
  )
};


// const columns = ["Brand Id",'Drug Id'];
// export const ResultsGrid = ({data}) => {
//   console.log(data)
//   return (
//     <div id='results-grid' className='component-boundary'>
//       <PerfectScrollbar>
//         <TableContainer component={Paper}>
//           <Table size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow> {columns.map((row) => (
//                 <TableCell scope="row" key={row}>{row}</TableCell>
//               ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map(({BRAND_ID, DRUG_ID},index) => (
//                 <TableRow key={index}>
//                   <TableCell scope="row">{BRAND_ID}</TableCell>
//                   <TableCell>{DRUG_ID}</TableCell>
//                 </TableRow>                
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </PerfectScrollbar>
//     </div>
//   )
// };
