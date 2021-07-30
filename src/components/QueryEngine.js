import React from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button'
import { queries } from '../sampleData';
import { ComponentHeader } from './ComponentHeader';


export const QueryEngine = ({ toggleParameters }) => {
  return (
    <div id='query-engine' className='component-boundary'>
      <ComponentHeader label={'Query Engine'} />
      <Select name='engine' value={queries.value} onChange={(e, name) => toggleParameters(e,name)} options={queries} />
      <div style={{ height: 'calc(100% - 86px)', textAlign: 'center', paddingTop: '70%'}}><Button color='primary' variant='contained'>Execute</Button></div>
    </div>
  )
};