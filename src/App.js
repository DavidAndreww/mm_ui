import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import {Grid} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { DimensionFilter } from './components/DimensionFilter';
import { TimeFilter } from './components/TimeFilter';
import { QueryMonitor } from './components/QueryMonitor';
import { SelectedFilter } from './components/SelectedFilter';
import { MarketFilter } from './components/MarketFilter';
import { QueryEngine } from './components/QueryEngine'
import { ResultsGrid } from './components/ResultsGrid'
import { slicerMapCreation, parameterValidations } from './helperFunctions'

import theme from './theme/index'
function App() {

const [payerSlicerMaps,setPayerSlicerMaps] = useState()
  // const [slicerMaps, setSlicerMaps] = useState(new Map())

 

  useEffect(() => {
     fetch('http://localhost:5000', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json()).then(jsonRes =>   slicerMapCreation(2,jsonRes["payerData"],jsonRes["PayerMapToBob"], setPayerSlicerMaps,payerSlicerMaps)).then(console.log(payerSlicerMaps));
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
    // should run function to update params object by searching the slicerMaps 
    // var for restrictions, then update paremeters accordingly
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
          <Grid item xs={2}>
            <DimensionFilter toggleParameters={toggleParameters} payerSlicerMaps={payerSlicerMaps}   handleSelect={handleExecute} data={parameters}/>            
          </Grid> 
           <Grid item xs={6}>
            <TimeFilter toggleParameters={toggleParameters} />
          </Grid> 
          <Grid item xs={2}>
            <MarketFilter toggleParameters={toggleParameters} handleExecute={handleExecute}  />
          </Grid>   
          <Grid item xs={2}>
            <QueryEngine toggleParameters={toggleParameters} handleExecute={handleExecute}  />
          </Grid>           
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>            
            <ResultsGrid data={parameters.result}/>
          </Grid> 
          <Grid item xs={6}>            
            <QueryMonitor />
          </Grid> 
          <Grid item xs={6}>            
            <SelectedFilter data={parameters}/>
          </Grid>            
        </Grid>        
      </div>
    </ThemeProvider>
  );
}

export default App;
