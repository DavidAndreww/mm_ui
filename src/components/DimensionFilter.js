import React, { useState } from 'react';
import Select from 'react-select';
import { enterprises } from '../sampleData';
import { bobs } from '../sampleData';
import { payers } from '../sampleData';
import { regions } from '../sampleData';
import { states } from '../sampleData';
import { territories } from '../sampleData';
import { categories } from '../sampleData';
import { teams } from '../sampleData';

const Dropdown = ({label, array, cb}) => {
  return (
    <div style={{marginBottom: '5px'}}>
      <label>{label}</label>
      <Select name={label.toLowerCase()} isMulti={true} value={array.value} onChange={(e,name) => cb(e,name)} options={array} />
    </div>
  
  )
}

const Checkbox = ({label, cb}) => {
  return (
    <div>
      <input type='checkbox' id={label.toLowerCase()} name={label.toLowerCase()} onChange={cb} />
      <label>{label}</label>
    </div>
  )
}


export const DimensionFilter = ({ toggleParameters }) => {

  const [dimensions, setDimensions] = useState({
    payer: false, 
    geography: false,
    team: false
  })

  const toggleDimensions = (e) => {
    let dimension = e.target.name;
    let opposite = !dimensions[dimension];
    setDimensions({...dimensions, [dimension]: opposite})
  }

  return (
    <div id='dimension-filter' className='component-boundary'>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Checkbox label={'Payer'} cb={toggleDimensions} />
        <Checkbox label={'Geography'} cb={toggleDimensions}/>
        <Checkbox label={'Team'} cb={toggleDimensions} />
      </div>
      { dimensions['payer'] && 
        <div>
          <Dropdown label={'Enterprise'} array={enterprises} cb={toggleParameters} />
          <Dropdown label={'BOB'} array={bobs} cb={toggleParameters} />
          <Dropdown label={'Payer Entity'} array={payers} cb={toggleParameters} />
        </div> 
      }
      { dimensions['geography'] && 
        <div>
          <Dropdown label={'Region'} array={regions} cb={toggleParameters} />
          <Dropdown label={'State'} array={states} cb={toggleParameters} />
          <Dropdown label={'Territory'} array={territories} cb={toggleParameters} />
      </div> 
      }
      { dimensions['team'] && 
        <div>
          <Dropdown label={'Category'} array={categories} cb={toggleParameters} />
          <Dropdown label={'Team'} array={teams} cb={toggleParameters} />
        </div> 
      }
    </div>
  )
};