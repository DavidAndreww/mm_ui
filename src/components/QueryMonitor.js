import React from 'react';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';


export const QueryMonitor = ({data}) => {
  const onGridReady = params => {
    params.api.sizeColumnsToFit();
  };
  
  return (
    <div id='query-monitor' className='component-boundary'>
      <ComponentHeader label={'Query History'}/>
      <ComponentBody>
        
      </ComponentBody>
    </div>
  )
};