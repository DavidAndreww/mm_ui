import React from 'react';
import Select from 'react-select';
import { queries } from '../sampleData';

const queryEngineStyle = {
  
}

export const QueryEngine = ({ toggleParameters }) => {
  return (
    <div id='query-engine' className='component-boundary'>
      <label>Query Engine</label>
      <Select name='engine' value={queries.value} onChange={(e,name) => toggleParameters(e,name)} options={queries} />
    </div>
  )
};