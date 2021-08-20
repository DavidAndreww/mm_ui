import React from 'react';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';
export const SelectedFilter = ({data}) => {
  return (
    <div id='selected-filter' className='component-boundary query-filter' style={{height:'200px'}}>
      <ComponentHeader label={'Selected Filters'}/>
      <ComponentBody>
        <div className="selection-filter">  
          { data?data.market && (<div className="filter-item"><label>Market:</label> {data?data.market.join(", "):null}</div>):null}
          { data?data.brand && (<div className="filter-item"><label>Brand:</label> {data?data.brand.join(", "):null}</div>):null}             
          { data?data.enterprise && (<div className="filter-item"><label>Enterprise:</label> {data?data.enterprise.join(", "):null}</div>):null}
          { data?data.bob && (<div className="filter-item"><label>BOB:</label> {data?data.bob.join(", "):null}</div>):null}
          { data?data.payerentity && (<div className="filter-item"><label>Payer Entity:</label> {data?data.payerentity.join(", "):null}</div>):null}
          { data?data.region && (<div className="filter-item"><label>Region:</label> {data?data.region.join(", "):null}</div>):null}
          { data?data.state && (<div className="filter-item"><label>State:</label> {data?data.state.join(", "):null}</div>):null}
          { data?data.territory && (<div className="filter-item"><label>Territory:</label> {data?data.territory.join(", "):null}</div>):null}
          { data?data.category && (<div className="filter-item"><label>Category:</label> {data?data.category.join(", "):null}</div>):null}
          { data?data.team && (<div className="filter-item"><label>Team:</label> {data?data.team.join(", "):null}</div>):null}
        </div>
      </ComponentBody>
    </div>
  )
};