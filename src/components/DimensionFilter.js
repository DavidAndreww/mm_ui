import React, {useState} from 'react';
import Select from 'react-select';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
import { enterprises } from '../sampleData';
import { bobs } from '../sampleData';
import { payers } from '../sampleData';
import { regions } from '../sampleData';
import { states } from '../sampleData';
import { territories } from '../sampleData';
import { categories } from '../sampleData';
import { teams } from '../sampleData';
import { markets } from '../sampleData';
import { brands } from '../sampleData'

const Dropdown = ({ label, array, callback }) => {
  return (
    <div style={{ marginBottom: '2px' }}>
      <label>{label}</label>
      <Select name={label.toLowerCase()} isMulti={true} value={array.value} onChange={(e, name) => callback(e, name)} options={array} />
    </div>

  )
}

export const DimensionFilter = ({ toggleParameters, payerSlicerMaps, handleSelect, data }) => {

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

  if(payerSlicerMaps!==null) {
    console.log(payerSlicerMaps)
  }


  return (
    <div id='dimension-filter'>
      <ComponentHeader label={'Dimension Filter'} action={action}/>
      <ComponentBody>    
        {readOnly ? (
        <div className="dimension-filter">
          { data?data.market && (<div className="dimension-filter-item"><label>Market:</label> {data?data.market.join(", "):null}</div>):null}
          { data?data.brand && (<div className="dimension-filter-item"><label>Brand:</label> {data?data.brand.join(", "):null}</div>):null}
          { data?data.enterprise && (<div className="dimension-filter-item"><label>Enterprise:</label> {data?data.enterprise.join(", "):null}</div>):null}
          { data?data.bob && (<div className="dimension-filter-item"><label>BOB:</label> {data?data.bob.join(", "):null}</div>):null}
          { data?data.payerentity && (<div className="dimension-filter-item"><label>Payer Entity:</label> {data?data.payerentity.join(", "):null}</div>):null}
          { data?data.region && (<div className="dimension-filter-item"><label>Region:</label> {data?data.region.join(", "):null}</div>):null}
          { data?data.state && (<div className="dimension-filter-item"><label>State:</label> {data?data.state.join(", "):null}</div>):null}
          { data?data.territory && (<div className="dimension-filter-item"><label>Territory:</label> {data?data.territory.join(", "):null}</div>):null}
          { data?data.category && (<div className="dimension-filter-item"><label>Category:</label> {data?data.category.join(", "):null}</div>):null}
          { data?data.team && (<div className="dimension-filter-item"><label>Team:</label> {data?data.team.join(", "):null}</div>):null}
        </div>)
        :(
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography><b>Market</b></Typography>
            </AccordionSummary>
            <div className="component-body">
              <Dropdown label={'Market'} array={markets} callback={toggleParameters} />
              <Dropdown label={'Brand'} array={brands} callback={toggleParameters} />
            </div>            
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography><b>Payer</b></Typography>
            </AccordionSummary>
            <div className="component-body">
              <Dropdown label={'Enterprise'} array={enterprises} callback={toggleParameters} />
              <Dropdown label={'BOB'} array={bobs} callback={toggleParameters} />
              <Dropdown label={'Payer Entity'} array={payers} callback={toggleParameters} />
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
        )
        }    
      </ComponentBody>
    </div>
  )
};