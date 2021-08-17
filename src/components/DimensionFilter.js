import React, {useState} from 'react';
import Select from 'react-select';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
// import { enterprises } from '../sampleData';
// import { bobs } from '../sampleData';
// import { payers } from '../sampleData';
import { regions } from '../sampleData';
import { states } from '../sampleData';
import { territories } from '../sampleData';
import { categories } from '../sampleData';
import { teams } from '../sampleData';

const Dropdown = ({ label, array, callback }) => {
  return (
    <div style={{ marginBottom: '2px' }}>
      <label>{label}</label>
      <Select name={label.toLowerCase()} isMulti={true} value={array && array.value} onChange={(e, name) => callback(e, name)} options={array} />
    </div>
  )
}

export const DimensionFilter = ({ toggleParameters, payerFilterArrays, handleSelect, data }) => {

const [readOnly,setReadOnly] = useState(false);
  const action = {
    label:readOnly ? "Change":"Save",
    fn:() =>{      
      // if(!readOnly)
      //   handleSelect();
      setReadOnly(!readOnly)
    }
  }

  if (data!==null){
    console.log(data)
  }
  return (
    <div id='dimension-filter'>
      <ComponentHeader label={'Dimension Filter'}/>
      <ComponentBody>   
        <div>          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography><b>Payer</b></Typography>
            </AccordionSummary>
            <div className="component-body">
              <Dropdown label={'Enterprise'} array={payerFilterArrays && payerFilterArrays.enterprises} callback={toggleParameters} />
              <Dropdown label={'BOB'} array={payerFilterArrays && payerFilterArrays.bobs} callback={toggleParameters} />
              <Dropdown label={'Payer Entity'} array={payerFilterArrays && payerFilterArrays.payers} callback={toggleParameters} />
            </div>            
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography><b>Geo</b></Typography>
            </AccordionSummary>
            <div className="component-body">
              <Dropdown label={'Region'} array={regions} callback={toggleParameters} />
              <Dropdown label={'State'} array={states} callback={toggleParameters} />
              <Dropdown label={'Territory'} array={territories} callback={toggleParameters} />  
            </div>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography><b>Team</b></Typography>
            </AccordionSummary>
            <div className="component-body">
              <Dropdown label={'Category'} array={categories} callback={toggleParameters} />
              <Dropdown label={'Team'} array={teams} callback={toggleParameters} />
            </div>
          </Accordion>      
        </div>        
      </ComponentBody>
    </div>
  )
};