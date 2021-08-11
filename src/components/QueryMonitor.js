import React from 'react';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
export const QueryMonitor = () => {
  return (
    <div id='query-monitor' className='component-boundary'>
      <ComponentHeader label={'Query Monitor'}/>
      <ComponentBody></ComponentBody>
    </div>
  )
};