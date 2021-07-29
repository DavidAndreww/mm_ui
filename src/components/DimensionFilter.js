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

const Dropdown = ({label, array, toggleParameters}) => {
  return (
    <div>
      <label>{label}</label>
      <Select name={label.toLowerCase()} isMulti={true} value={array.value} onChange={(e,name) => toggleParameters(e,name)} options={array} />
    </div>
  
  )
}

const Checkbox = ({label, callback}) => {
  return (
    <div>
      <input type='checkbox' id={label.toLowerCase()} name={label.toLowerCase()} onChange={callback} />
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
        <Checkbox label={'Payer'} callback={toggleDimensions} />
        <Checkbox label={'Geography'} callback={toggleDimensions}/>
        <Checkbox label={'Team'} callback={toggleDimensions} />
      </div>
      { dimensions['payer'] && 
        <div>
          <Dropdown label={'Enterprise'} array={enterprises} toggleParameters={toggleParameters} />
          <Dropdown label={'BOB'} array={bobs} toggleParameters={toggleParameters} />
          <Dropdown label={'Payer Entity'} array={payers} toggleParameters={toggleParameters} />
        </div> 
      }
      { dimensions['geography'] && 
        <div>
          <Dropdown label={'Region'} array={regions} toggleParameters={toggleParameters} />
          <Dropdown label={'State'} array={states} toggleParameters={toggleParameters} />
          <Dropdown label={'Territory'} array={territories} toggleParameters={toggleParameters} />
      </div> 
      }
      { dimensions['team'] && 
        <div>
          <Dropdown label={'Category'} array={categories} toggleParameters={toggleParameters} />
          <Dropdown label={'Team'} array={teams} toggleParameters={toggleParameters} />
        </div> 
      }
    </div>
  )
};