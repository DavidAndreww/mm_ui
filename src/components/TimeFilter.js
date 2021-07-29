import React, { useState } from 'react';

const timeFilterStyle = {
  display: 'flex',
  justifyContent: 'flex-start'
}

export const TimeFilter = () => {

  const [singleDateRange, toggleSingleDateRange] = useState(true)

  return (
    <div id='time-filter' className='component-boundary' style={timeFilterStyle}>
      <div>
        <input type='radio' name='time' id='time-span' value="span" defaultChecked={true} onChange={() => toggleSingleDateRange(true)}/>
        <label>Span</label>
        <br />
        <input type='radio' name='time' id='time-curr-prev' value="curr-prev" onChange={() => toggleSingleDateRange(false)} />
        <label>Current v Previous</label>
      </div>
      <div>
        <label>Current Start Date:</label>
        <input type='date' id='span-start' name='span-start' min='2018-01-01' max='2021-07-28' /><br />
        <label>Current End Date:</label>
        <input type='date' id='span-start' name='span-end' min='2018-01-01' max='2021-07-28' />
      </div>
      {singleDateRange === false && 
        <div>
        <label>Previous Start Date:</label>
        <input type='date' id='curr-prev-start' name='curr-prev-start' min='2018-01-01' max='2021-07-28' /> <br />
        <label>Previous End Date:</label>
        <input type='date' id='curr-prev-end' name='curr-prev-end' min='2018-01-01' max='2021-07-28' />
      </div>
      }
    </div>
  )
};