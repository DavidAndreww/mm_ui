import React, {useState} from 'react';
import Select from 'react-select';
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

export const MarketFilter = ({ toggleParameters, brandMarketFilterArrays, handleSelect, data }) => {
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
    <div id='market-filter'>
      <ComponentHeader label={'Market Filter'}/>
      <ComponentBody>    
        <div className="component-body">
            <Dropdown label={'Market'} array={brandMarketFilterArrays && brandMarketFilterArrays.markets} callback={toggleParameters} />
            <Dropdown label={'Brand'} array={brandMarketFilterArrays && brandMarketFilterArrays.brands} callback={toggleParameters} />
        </div>    
      </ComponentBody>
    </div>
  )
};