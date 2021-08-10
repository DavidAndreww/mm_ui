import React from 'react'
import './App.css';
import { useState } from 'react'
import {Grid} from '@material-ui/core';
import { DimensionFilter } from './components/DimensionFilter';
import { TimeFilter } from './components/TimeFilter';
import { QueryMonitor } from './components/QueryMonitor';
import { QueryEngine } from './components/QueryEngine'
import { ResultsGrid } from './components/ResultsGrid'
import { parameterValidations } from './helperFunctions'

function App() {

  const [parameters, setParameters] = useState({
    market: null,
    brand: null,
    enterprise: null,
    bob: null,
    payerentity: null,
    region: null,
    state: null,
    territory: null,
    category: null,
    team: null,
    currStartDate: null,
    currEndDate: null,
    prevStartDate: null,
    prevEndDate: null,
    engine: null,
    result: null
  });
  

  const toggleParameters = (e, name = null) => {
    let dimension;
    let values;

    if (name) {
      dimension = name.name.split(' ').join('')
    } else {
      dimension = e.target.id
    }

    if (dimension === 'engine') {
      values = e.value
    } else if (e.length !== undefined) {
      values = e.map(val => {
        return val.value
      })
    } else {
      values = e.target.value
    }
    setParameters({ ...parameters, [dimension]: values })
  }

  const handleExecute = () => {
    if (parameterValidations(parameters)) {
      fetch('http://localhost:5000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parameters
        })
      }).then(res => res.json()).then(json => setParameters({ result: json }))
    }
  }

  return (
    <div id='app'>
      <Grid container spacing={3}>
        <Grid item xs={3}>
            <DimensionFilter toggleParameters={toggleParameters} />
        </Grid>  
        <Grid item xs={7}>
          <Grid container spacing={3} direction="column" className="content-area">
             <Grid item>
              <TimeFilter toggleParameters={toggleParameters} />
             </Grid>
             <Grid item>
                <ResultsGrid data={parameters.result}/>
             </Grid>
             <Grid item>
               <QueryMonitor />
             </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <QueryEngine toggleParameters={toggleParameters} handleExecute={handleExecute}  />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
