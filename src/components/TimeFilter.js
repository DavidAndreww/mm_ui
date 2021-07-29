import React, { useState } from 'react';
import { ComponentHeader } from './ComponentHeader';

export const TimeFilter = ({ toggleParameters }) => {

  const [singleDateRange, toggleSingleDateRange] = useState(true)

  return (
    <div id='time-filter' className='component-boundary'>
      <ComponentHeader label={'Time Filter'}/>
      <div>
        <div style={{ float: 'left', marginRight: '15px' }}>
          <input type='radio' name='time' id='time-span' value="span" defaultChecked={true} onChange={() => toggleSingleDateRange(true)}/>
          <label>Span</label>
          <br />
          <input type='radio' name='time' id='time-curr-prev' value="curr-prev" onChange={() => toggleSingleDateRange(false)} />
          <label>Current v Previous</label>
        </div>
        <div style={{ float: 'left', marginRight: '15px' }}>   
          <label style={{ marginRight: '5px' }}>Current Start Date:</label>
          <input type='date' id='currStartDate' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} /><br />
          <label style={{ marginRight: '11px' }}>Current End Date:</label>
          <input type='date' id='currEndDate' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} />
        </div>
        {!singleDateRange && 
        <div>   
        <label style={{ marginRight: '5px' }}>Prev Start Date:</label>
        <input type='date' id='prevStartDate' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} /><br />
        <label style={{ marginRight: '11px' }}>Prev End Date:</label>
        <input type='date' id='prevEndDate' min='2018-01-01' max='2021-07-28' onChange={(e) => toggleParameters(e)} />
      </div>}
      </div>
    </div>
  )
};
       