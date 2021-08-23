import React, { useState } from 'react';
import { ComponentHeader } from './ComponentHeader';
import {Grid} from '@material-ui/core'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

export const TimeFilter = ({ toggleParameters, timeSlicers,data }) => {
  const [singleDateRange, toggleSingleDateRange] = useState(true)
  const [date,setDate] = useState({
    currStartDate: null,
    currEndDate: null,
    prevStartDate: null,
    prevEndDate: null,
  })
  let includedstartDates = [];
  let includedendDates = [];
  if(timeSlicers) {
    if(!data.currStartDate && data.currEndDate){
       timeSlicers.splitWeekStart.forEach((val, key) => {
        if(data.currEndDate === val){
          includedstartDates.push(Date.parse(key));
        }
      })
    }else{
      timeSlicers.splitWeekStart.forEach((val, key) => {
        includedstartDates.push(Date.parse(key));
      })
      includedstartDates.sort((a, b) => b - a)
    }
    if(!data.currStartDate){
      timeSlicers.splitWeekEnd.forEach((val, key) => {
        includedendDates.push(Date.parse(key));
      })
      includedendDates.sort((a, b) => b - a)
    }else{
      timeSlicers.splitWeekEnd.forEach((val, key) => {
        console.log(data.currStartDate,val)
        if(data.currStartDate === val){
          includedendDates.push(Date.parse(key));
        }
      })
    }    
  }
  const handleDatePicker = (rawdate,name) => {
    setDate({
      ...date,
      [name]:rawdate
    });
   toggleParameters(null,{name,value:moment(rawdate).format("yyyy-MM-DD")});
  }
  return (
    <div id='time-filter' className='component-boundary'>
      <ComponentHeader label={'Time Filter'}/>
        <Grid container className="time-container">
          <Grid item sm ={12}>
            <div className="margin-right">
              <input type='radio' name='time' id='time-span' className="lbl-time-filter" value="span" defaultChecked={true} onChange={() => toggleSingleDateRange(true)}/>
              <label htmlFor="time-span">Span</label>
              <input type='radio' name='time' id='time-curr-prev' value="curr-prev" onChange={() => toggleSingleDateRange(false)} />
              <label htmlFor="time-curr-prev">Current v Previous</label>
            </div>           
          </Grid>
          <Grid item  sm ={12}> 
             <Grid container spacing={3}>
              <Grid item style={{width:'100%',marginLeft: '10px',paddingRight:0}} >      
                  <div className='date-wrapper'>
                    <label style={{ marginRight: '5px'}} className='date-label'>Current Start Date:</label>
                    <DatePicker  dateFormat="yyyy-MM-dd" 
                    onChange={(date) => handleDatePicker(date,'currStartDate')} selected={date.currStartDate} includeDates={includedstartDates} />
                   </div>
                   <div className='date-wrapper'>
                    <label style={{ marginRight: '11px' }} className='date-label'>Current End Date:</label>                 
                    <DatePicker dateFormat="yyyy-MM-dd"  className='date-picker'  onChange={(date) => handleDatePicker(date,'currEndDate')}  selected={date.currEndDate}
                    includeDates={includedendDates}/>     
                    </div>
                </Grid>
                {!singleDateRange && 
                    <Grid item style={{width:'100%',marginLeft: '10px',paddingRight:0}} > 
                      <div className='date-wrapper'>
                        <label style={{ marginRight: '5px' }} className='date-label'>Prev Start Date:</label>
                        <DatePicker dateFormat="yyyy-MM-dd"  className='date-picker' 
                          onChange={(date) => handleDatePicker(date,'prevStartDate')} selected={date.prevStartDate}/>
                      </div>
                      <div className='date-wrapper'>
                        <label style={{ marginRight: '11px' }} className='date-label'>Prev End Date:</label>
                        <DatePicker dateFormat="yyyy-MM-dd" className='date-picker' onChange={(date) => handleDatePicker(date,'prevEndDate')} selected={date.prevEndDate}/>
                    </div>
                </Grid>}
              </Grid>
          </Grid>
      </Grid>
    </div>
  )
};
       