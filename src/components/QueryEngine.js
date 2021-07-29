import React from 'react';
import Select from 'react-select';
import { queries } from '../sampleData';
import { ComponentHeader } from './ComponentHeader';


export const QueryEngine = ({ toggleParameters }) => {
  return (
    <div id='query-engine' className='component-boundary'>
      <ComponentHeader label={'Query Engine'} />
      <Select name='engine' value={queries.value} onChange={(e,name) => toggleParameters(e,name)} options={queries} />
    </div>
  )
};