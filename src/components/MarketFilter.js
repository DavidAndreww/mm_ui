import React from 'react';
import Select from 'react-select';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
import { brands } from '../sampleData'

const Dropdown = ({ label, array, callback }) => {
  return (
    <div style={{ marginBottom: '2px' }}>
      <label>{label}</label>
      <Select name={label.toLowerCase()} isMulti={true} value={array.value} onChange={(e, name) => callback(e, name)} options={array} />
    </div>
  )
}

export const MarketFilter = ({ toggleParameters, data }) => {
  return (
    <div id='market-filter'>
      <ComponentHeader label={'Market Filter'}/>
      <ComponentBody>    
        <div className="component-body">
            {/* <Dropdown label={'Market'} array={markets} callback={toggleParameters} /> */}
            <Dropdown label={'Brand'} array={brands} callback={toggleParameters} />
        </div>    
      </ComponentBody>
    </div>
  )
};