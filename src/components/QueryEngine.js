import React from 'react';
import Select from 'react-select';
import { queries } from '../sampleData';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
export const QueryEngine = ({ toggleParameters, handleExecute }) => {
  const action = {
    label:"Execute",
    fn:handleExecute
  }  
  return (
    <div id='query-engine'>
      <ComponentHeader label={'Query Engine'}  action={action} />
      <ComponentBody>
       <div  className="component-body">
        <Select name='engine' value={queries.value} 
          onChange={(e, name) => toggleParameters(e,name)} options={queries} defaultValue={queries[0]} />           
        </div>  
      </ComponentBody>   
    </div>
  )
};