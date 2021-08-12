import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import {Grid} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { DimensionFilter } from './components/DimensionFilter';
import { TimeFilter } from './components/TimeFilter';
import { QueryMonitor } from './components/QueryMonitor';
import { QueryEngine } from './components/QueryEngine'
import { ResultsGrid } from './components/ResultsGrid'
import { slicerMapCreation, parameterValidations } from './helperFunctions'

import theme from './theme/index'
function App() {

  const [slicerMaps,setSlicerMaps] = useState({
    map1:null,
    map2:null,
    map3:null
  })

  useEffect(() => {
     fetch('http://localhost:5000', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json()).then(jsonRes =>   slicerMapCreation(2,jsonRes["payerData"], setSlicerMaps,slicerMaps)).then(console.log(slicerMaps));
  },[1])

 
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
    <ThemeProvider theme={theme}>
      <div id='app'>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <DimensionFilter toggleParameters={toggleParameters} />
            <QueryMonitor />
          </Grid>  
          {/* className="content-area" */}
          <Grid item xs={9}>
            <Grid container spacing={1}>
              <Grid item  sm={12} md={9}>
                <TimeFilter toggleParameters={toggleParameters} />
              </Grid>
              <Grid item  sm={12} md={3}>
                  <QueryEngine toggleParameters={toggleParameters} handleExecute={handleExecute}  />
              </Grid>
            </Grid>
            <ResultsGrid data={parameters.result}/>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
