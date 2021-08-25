import React from 'react';
import Select from 'react-select';
import { queries } from '../sampleData';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
import MoonLoader from "react-spinners/MoonLoader";

export const QueryEngine = ({ toggleParameters, handleExecute, inProgressFlag }) => {
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
        {inProgressFlag ? <MoonLoader color={"rgb(9,109,14)"} loading={inProgressFlag} css={`display: block; margin: 0 auto;`} size={40} />: ""}  
      </ComponentBody>   
    </div>
  )
};