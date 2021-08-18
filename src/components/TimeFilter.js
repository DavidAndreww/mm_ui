import React, { useState } from 'react';
import { ComponentHeader } from './ComponentHeader';
import {Grid} from '@material-ui/core'
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export const TimeFilter = ({ toggleParameters, timeSlicers }) => {
  const [singleDateRange, toggleSingleDateRange] = useState(true)

  let validDates = [];
  if(timeSlicers) {
    timeSlicers.splitWeekStart.forEach((val, key) => {
      validDates.push({ value: val, label: Date.parse(key) })
    })
    validDates.sort((a, b) => {
      let dateA = a.val;
      let dateB = b.val
      return dateB - dateA
    })
  }

  return (
    <div id='time-filter' className='component-boundary'>
      <ComponentHeader label={'Time Filter'}/>
        <Grid container className="time-container">
          <Grid item>
            <div className="margin-right">
              <input type='radio' name='time' id='time-span' className="lbl-time-filter" value="span" defaultChecked={true} onChange={() => toggleSingleDateRange(true)}/>
              <label htmlFor="time-span">Span</label>
              <br />
              <input type='radio' name='time' id='time-curr-prev' value="curr-prev" onChange={() => toggleSingleDateRange(false)} />
              <label htmlFor="time-curr-prev">Current v Previous</label>
            </div>           
          </Grid>
          <Grid item> 
             <Grid container spacing={3}>
              <Grid item>    
                  <label style={{ marginRight: '5px' }}>Current Start Date:</label>
                  <input type='date' id='currStartDate' className='date-picker' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} /><br />
                  <label style={{ marginRight: '11px' }}>Current End Date:</label>
                  <input type='date' id='currEndDate' className='date-picker' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} />
                    
                </Grid>
                {!singleDateRange && 
                    <Grid item> 
                    <label style={{ marginRight: '5px' }}>Prev Start Date:</label>
                    <input type='date' id='prevStartDate' className='date-picker' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} /><br />
                    <label style={{ marginRight: '11px' }}>Prev End Date:</label>
                    <input type='date' id='prevEndDate' className='date-picker' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} />
                    
                </Grid>}
              </Grid>
          </Grid>
      </Grid>
    </div>
  )
};
       