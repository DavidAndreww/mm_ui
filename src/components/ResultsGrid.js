import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const columns = ["Brand Id",'Drug Id'];
export const ResultsGrid = ({data}) => {
  console.log(data)
  return (
    <div id='results-grid' className='component-boundary'>
      <PerfectScrollbar>
        <TableContainer component={Paper}>
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow> {columns.map((row) => (
                <TableCell scope="row" key={row}>{row}</TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data !== null && data.current.map((row,index) => (
                <TableRow key={index}>
                  <TableCell scope="row">{row.BRAND_ID}</TableCell>
                  <TableCell>{row.DRUG_ID}</TableCell>
                </TableRow>                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </div>
  )
};
