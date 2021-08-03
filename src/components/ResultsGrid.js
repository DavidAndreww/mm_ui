import React from 'react';
<<<<<<< HEAD
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const columns = [
    { title: 'Payer', field: 'payer' },
    { title: 'Enterprise - Ben Type', field: 'enterprise' },
    { title: 'PBM', field: 'pbm' },
    { title: 'Coverage Type', field: 'coverage' },
    { title: 'PA',field: 'pa' },
    { title: 'ST',field: 'st' },
    { title: 'Lives', field: 'lives' },
    { title: 'Lives Share All Plans', field: 'livesShare' },
    { title: 'Market TRxEQ', field: 'mktTrxEq' },
    { title: 'Brand TRxEQ', field: 'brandTrxEq' },
    { title: 'Brand TRxEQ / 1000 Lives', field: 'brandTrxEqLives' },
    { title: 'Brand TRxEQ % Change', field: 'brandTrxEqChange' },
    { title: 'Reject Rate', field: 'rejectRate' },
    { title: 'Reversal Rate', field: 'reversalRate' },
    { title: 'OPC Ask', field: 'opcAsk' },
    { title: 'OPC Paid', field: 'opcPaid' },
  ];

  export const ResultsGrid = ({ results }) => {
    if(results) {
      
    }


    const data = [
      {
        payer: 'Aetna - Medicare',
        enterprise: 'CVS Health - Medicare',
        pbm: 'CVS Health', 
        coverage: 'Tier 5',
        pa: 'Y',
        st: 'Y',
        lives: 72149125,
        livesShare: '0.85%',
        mktTrxEq: 5000,
        brandTrxEq: 200,
        brandTrxEqLives: 1024,
        brandTrxEqChange: '25%',
        rejectRate: '14%',
        reversalRate: '20%',
        opcAsk: '$20.00',
        opcPaid: '$20.00'
      } 
    ]


    return (
      <div id='results-grid' className='component-boundary'>
        <MaterialTable
          search={false}
          isLoading={false}
          title="Data Analyst Dashboard"
          columns={columns}
          icons={tableIcons}
          options={{ fixedColumns: { left: 6 }}}
          data={data}
          search={false}
        />
      </div>
    )
  };
=======
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
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow> {columns.map((row) => (
                <TableCell scope="row" key={row}>{row}</TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(({BRAND_ID, DRUG_ID},index) => (
                <TableRow key={index}>
                  <TableCell scope="row">{BRAND_ID}</TableCell>
                  <TableCell>{DRUG_ID}</TableCell>
                </TableRow>                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </div>
  )
};
>>>>>>> 4d221bfe6758086f73307f01e43dd77726f97760
