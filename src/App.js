import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import {Grid} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { DimensionFilter } from './components/DimensionFilter';
import { TimeFilter } from './components/TimeFilter';
import { QueryMonitor } from './components/QueryMonitor';
import { MarketFilter } from './components/MarketFilter';
import { SelectedFilter } from './components/SelectedFilter';
import { QueryEngine } from './components/QueryEngine'
import { ResultsGrid } from './components/ResultsGrid'
import { slicerMapCreation, parameterValidations, payerFilter, datetorow } from './helperFunctions';
import theme from './theme/index';

function App() {
  const [payerSlicerMaps,setPayerSlicerMaps] = useState()
  const [timeSlicers, setTimeSlicers] = useState()
  const [payerFilterArrays, setPayerFilterArrays] = useState()
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
  });
  const [result, setResults] = useState({
    result: null
    // result: {
    //   current: [
    //     {
    //       "BRAND_TRXEQ": 234,
    //       "BRAND_TRXEQ_PER_1000_LIVES": 152,
    //       "COVERAGE_TYPE": 'Tier 1',
    //       "ENTERPRISE_BENTYPE": 'CVS Health - Commercial',
    //       "LIVES": 1924,
    //       "LIVES_SHARE_ALL_PLANS": 526346,
    //       "MARKET_TRXEQ": 352344,
    //       "PA": "Y",
    //       "PAYER": "AbbVie (CSV Health) - Commercial",
    //       "PBM": "CVS Health",
    //       "REJECT_RATE": 352,
    //       "REVERSAL_RATE": 235 
    //     },{
    //       "BRAND_TRXEQ": 234,
    //       "BRAND_TRXEQ_PER_1000_LIVES": 152,
    //       "COVERAGE_TYPE": 'Tier 2',
    //       "ENTERPRISE_BENTYPE": 'Aetna',
    //       "LIVES": 141,
    //       "LIVES_SHARE_ALL_PLANS": 5266,
    //       "MARKET_TRXEQ": 3544,
    //       "PA": "Y",
    //       "PAYER": "Aetna of Texas - Medicare",
    //       "PBM": "Walgreens",
    //       "REJECT_RATE": 32,
    //       "REVERSAL_RATE": 35 
    //     }
    //   ],
    //   previous: [
    //     {
    //       "BRAND_TRXEQ": 234,
    //       "BRAND_TRXEQ_PER_1000_LIVES": 152,
    //       "COVERAGE_TYPE": 'Tier 1',
    //       "ENTERPRISE_BENTYPE": 'CVS Health - Commercial',
    //       "LIVES": 1924,
    //       "LIVES_SHARE_ALL_PLANS": 526346,
    //       "MARKET_TRXEQ": 352344,
    //       "PA": "Y",
    //       "PAYER": "AbbVie (CSV Health) - Commercial",
    //       "PBM": "CVS Health",
    //       "REJECT_RATE": 352,
    //       "REVERSAL_RATE": 235 
    //     },
    //     {
    //       "BRAND_TRXEQ": 234,
    //       "BRAND_TRXEQ_PER_1000_LIVES": 152,
    //       "COVERAGE_TYPE": 'Tier 2',
    //       "ENTERPRISE_BENTYPE": 'Aetna',
    //       "LIVES": 141,
    //       "LIVES_SHARE_ALL_PLANS": 5266,
    //       "MARKET_TRXEQ": 3544,
    //       "PA": "Y",
    //       "PAYER": "Aetna of Texas - Medicare",
    //       "PBM": "Walgreens",
    //       "REJECT_RATE": 32,
    //       "REVERSAL_RATE": 35 
    //     }
    //   ]
    // }
  })

  useEffect(async() => {
     await fetch('http://localhost:5000', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json()).then(jsonRes =>   {
        console.log(jsonRes)
        slicerMapCreation(4, jsonRes['timePer'], null, setTimeSlicers, timeSlicers)
        slicerMapCreation(2,jsonRes["payerData"],jsonRes["PayerMapToBob"], setPayerSlicerMaps,payerSlicerMaps)
      }).then(console.log(payerSlicerMaps));
  },[1])
  
  useEffect(async() => {
    payerFilter(payerSlicerMaps, parameters, payerFilterArrays, setPayerFilterArrays);
  },[payerSlicerMaps, parameters])
  
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
    }
    else if (dimension === 'currStartDate'){
      values = datetorow(dimension,e.target.value,timeSlicers)
    }
    else if(dimension === 'currEndDate'){
      values = datetorow(dimension,e.target.value,timeSlicers)
    }
    else if(dimension === 'prevStartDate'){
      values = datetorow(dimension,e.target.value,timeSlicers)
    }
    else if(dimension === 'prevEndDate'){
      values = datetorow(dimension,e.target.value,timeSlicers)
    }
    else if (e.length !== undefined) {
      values = e.map(val => {
        return val.value
      })
    }
     else {
      values = e.target.value
    }
    setParameters({ ...parameters, [dimension]: values })
  }

  const handleExecute = () => {
    if (true) {
      let url;
      if (parameters.engine === 'QE-2') url = 'http://localhost:5000/qe2';
      if (parameters.engine === 'Snowflake') url = 'http://localhost:5000/'

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parameters
        })
      }).then(res => res.json()).then(json => {
        console.log('JSON: ', json)
        setResults({ result: json })
      })
      // .then(payerFilter(payerSlicerMaps, parameters, payerFilterArrays, setPayerFilterArrays))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div id='app'>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <DimensionFilter toggleParameters={toggleParameters} payerFilterArrays={payerFilterArrays}   handleSelect={handleExecute} data={parameters}/>            
          </Grid> 
           <Grid item xs={6}>
            <TimeFilter toggleParameters={toggleParameters} timeSlicers={timeSlicers}/>
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
            <ResultsGrid data={result.result}/>
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
