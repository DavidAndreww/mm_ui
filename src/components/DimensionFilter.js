import React, {useState} from 'react';
import Select from 'react-select';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';

const Dropdown = ({ label, array, callback }) => {
  return (
    <div style={{ marginBottom: '2px' }}>
      <label>{label}</label>
      <Select name={label.toLowerCase()} isMulti={true} value={array && array.value} onChange={(e, name) => callback(e, name)} options={array} />
    </div>
  )
}

export const DimensionFilter = ({ toggleParameters, payerFilterArrays, geoFilterArrays, teamFilterArrays, handleSelect, data }) => {

const [readOnly,setReadOnly] = useState(false);
  const action = {
    label:readOnly ? "Change":"Save",
    fn:() =>{      
      // if(!readOnly)
      //   handleSelect();
      setReadOnly(!readOnly)
    }
  }
  if(data){
    console.log(data)
  }
  return (
    <div id='dimension-filter'>
      <ComponentHeader label={'Dimension Filter'}/>
      <ComponentBody>   
        <div className="component-overlap">          
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
              <Dropdown label={'Region'} array={geoFilterArrays && geoFilterArrays.regions} callback={toggleParameters} />
              <Dropdown label={'State'} array={geoFilterArrays && geoFilterArrays.states} callback={toggleParameters} />
              <Dropdown label={'Territory'} array={geoFilterArrays && geoFilterArrays.territorys} callback={toggleParameters} />  
            </div>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography><b>Team</b></Typography>
            </AccordionSummary>
            <div className="component-body">
              <Dropdown label={'Category'} array={teamFilterArrays && teamFilterArrays.categories} callback={toggleParameters} />
              <Dropdown label={'Team'} array={teamFilterArrays && teamFilterArrays.teamss} callback={toggleParameters} />
            </div>
          </Accordion>      
        </div>        
      </ComponentBody>
    </div>
  )
};