import React from 'react';
import { ComponentHeader } from './ComponentHeader';
import ComponentBody from './ComponentBody';


export const QueryMonitor = ({data}) => {
  return (
    <div id='query-monitor' className='component-boundary query-filter'>
      <ComponentHeader label={'Query History'}/>
      <ComponentBody>
        {data && 
          data.map(hist => {
            return  <div key={hist.id} className='selection-filter' >
            { hist.id && (<div className="filter-item"><label>Query ID:</label> {hist.id} </div>) }
            { hist.timestamp && (<div className="filter-item"><label>Timestamp:</label> {hist.timestamp} </div>) }
            { hist.runtime && (<div className="filter-item"><label>Runtime:</label> {hist.runtime}s </div>) }
            { hist['parameters']?hist['parameters'].market && (<div className="filter-item"><label>Market:</label> {hist['parameters']?hist['parameters'].market.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].brand && (<div className="filter-item"><label>Brand:</label> {hist['parameters']?hist['parameters'].brand.join(", "):null}</div>):null}             
            { hist['parameters']?hist['parameters'].enterprise && (<div className="filter-item"><label>Enterprise:</label> {hist['parameters']?hist['parameters'].enterprise.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].bob && (<div className="filter-item"><label>BOB:</label> {hist['parameters']?hist['parameters'].bob.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].payerentity && (<div className="filter-item"><label>Payer Entity:</label> {hist['parameters']?hist['parameters'].payerentity.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].region && (<div className="filter-item"><label>Region:</label> {hist['parameters']?hist['parameters'].region.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].state && (<div className="filter-item"><label>State:</label> {hist['parameters']?hist['parameters'].state.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].territory && (<div className="filter-item"><label>Territory:</label> {hist['parameters']?hist['parameters'].territory.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].category && (<div className="filter-item"><label>Category:</label> {hist['parameters']?hist['parameters'].category.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].team && (<div className="filter-item"><label>Team:</label> {hist['parameters']?hist['parameters'].team.join(", "):null}</div>):null}
            { hist['parameters']?hist['parameters'].engine && (<div className="filter-item"><label>Engine:</label> {hist['parameters'].engine}</div>):null }
          </div>
          })
        }
          
      </ComponentBody>
    </div>
  )
};