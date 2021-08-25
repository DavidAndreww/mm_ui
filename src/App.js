import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import {Grid,CircularProgress} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { DimensionFilter } from './components/DimensionFilter';
import { TimeFilter } from './components/TimeFilter';
import { QueryMonitor } from './components/QueryMonitor';
import { MarketFilter } from './components/MarketFilter';
import { SelectedFilter } from './components/SelectedFilter';
import { QueryEngine } from './components/QueryEngine'
import { ResultsGrid } from './components/ResultsGrid'
import { slicerMapCreation, parameterValidations, payerFilter, parameterFormatter, geoFilter,teamFilter, marketFilter } from './helperFunctions';
import theme from './theme/index';


function App() {
  const [inProgressFlag, setInProgressFlag] = useState(false)
  const [payerSlicerMaps,setPayerSlicerMaps] = useState()
  const [timeSlicers, setTimeSlicers] = useState()
  const [payerFilterArrays, setPayerFilterArrays] = useState()
  const [geoSlicerMaps,setGeoSlicerMaps] = useState()
  const [geoFilterArrays,setGeoFilterArrays] = useState()
  const [teamSlicersMaps,setTeamSlicersMaps] = useState()
  const [teamFilterArrays, setTeamFilterArrays] = useState()
  const [brandMarketSlicers, setBrandMarketSlicers] = useState()
  const [brandMarketFilterArrays,setBrandMarketFilterArrays] = useState()
  const [queryMonitorData, setQueryMonitorData] = useState([])
  const [date,setDate] = useState({
    currStartDate: null,
    currEndDate: null,
    prevStartDate: null,
    prevEndDate: null,
  })
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
    engine: 'Snowflake L2',
  });
  const [result, setResults] = useState({
    result: null
  })

  const [loader,setLoader] = useState(true);

  useEffect(async() => {
    setLoader(true);
    await fetch('http://localhost:5000', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json()).then(jsonRes =>   {
        setLoader(false);
        slicerMapCreation(1, jsonRes['brandMkt'], null, setBrandMarketSlicers, brandMarketSlicers)
        slicerMapCreation(4, jsonRes['timePer'], null, setTimeSlicers, timeSlicers)
        
        slicerMapCreation(3,jsonRes['catTeam'],null,setTeamSlicersMaps, teamSlicersMaps)
        slicerMapCreation(6,jsonRes['geoData'],jsonRes['terrmaptostate'],setGeoSlicerMaps,geoSlicerMaps)
        slicerMapCreation(2,jsonRes["payerData"],jsonRes["PayerMapToBob"], setPayerSlicerMaps,payerSlicerMaps)
      }).then(console.log(payerSlicerMaps))
      .catch((error) => {
        setLoader(false);
        console.error('Error:', error);
      });
  },[1])
  
  useEffect(async() => {
    marketFilter(brandMarketSlicers, parameters, brandMarketFilterArrays, setBrandMarketFilterArrays);
    // setParameters({...parameters, brand:[brandMarketFilterArrays.brands[0].value]})
  },[brandMarketSlicers,parameters])

  useEffect(async() => {
    teamFilter(teamSlicersMaps, parameters, teamFilterArrays, setTeamFilterArrays);
  },[teamSlicersMaps, parameters])

  useEffect(async() => {
    geoFilter(geoSlicerMaps, parameters, geoFilterArrays, setGeoFilterArrays);
  },[geoSlicerMaps, parameters])

  useEffect(async() => {
    payerFilter(payerSlicerMaps, parameters, payerFilterArrays, setPayerFilterArrays);
  },[payerSlicerMaps, parameters])
  
  const toggleParameters = (e, name = null) => {
    setDate({...date , [name.name]:name.value})
    setParameters(parameterFormatter(e, name, parameters, timeSlicers,brandMarketFilterArrays))
  }
  const handleExecute = () => {
    if (parameterValidations(parameters)) {
      let url = 'http://localhost:5000/';
      if (parameters.engine === 'QE-2') url = 'http://localhost:5000/qe2';
      if (parameters.engine === 'Snowflake L2') url = 'http://localhost:5000/'
      
      setInProgressFlag(true)
      
      let id = queryMonitorData.length > 0 ? queryMonitorData[queryMonitorData.length-1].id + 1: 1;
      let currTimeStamp = new Date();
      let param = parameters;
      let endTimeStamp;
      
      const newQueryHist = {id:id,timestamp:currTimeStamp.toLocaleString(),parameters:param,runtime:'Calculating...'}
      setQueryMonitorData([...queryMonitorData, newQueryHist])

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parameters
        })
      }).then(res => res.json()).then(json => {
        console.log('JSON: ', json)
        endTimeStamp = new Date();
        let runtimes = (endTimeStamp.getTime() - currTimeStamp.getTime())/1000;
        const newQueryHist = {id:id,timestamp:currTimeStamp.toLocaleString(),parameters:param,runtime:runtimes}
        setQueryMonitorData([...queryMonitorData, newQueryHist])
        setResults({ result: json })
        setInProgressFlag(false)
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div id='app' className={loader ? '':'gray-bg'  }>        
        {loader? 
        <Grid  container className="loader">
          <CircularProgress color="secondary" />
        </Grid>
        :(<div><Grid container spacing={1}>
            <Grid item xs={2}>
              <DimensionFilter toggleParameters={toggleParameters} teamFilterArrays={teamFilterArrays} geoFilterArrays={geoFilterArrays} payerFilterArrays={payerFilterArrays} handleSelect={handleExecute} data={parameters}/>            
            </Grid> 
            <Grid item xs={6}>
              <TimeFilter toggleParameters={toggleParameters} timeSlicers={timeSlicers}  data={parameters} handleExecute={handleExecute} />
            </Grid> 
            <Grid item xs={2}>
              <MarketFilter toggleParameters={toggleParameters} brandMarketFilterArrays={brandMarketFilterArrays} handleExecute={handleExecute} data={parameters}/>
            </Grid>   
            <Grid item xs={2}>
              <QueryEngine toggleParameters={toggleParameters} handleExecute={handleExecute} inProgressFlag={inProgressFlag} />
            </Grid>           
          </Grid>
            <Grid container spacing={1}>
            <Grid item xs={12}>            
              <ResultsGrid data={result.result}/>
            </Grid> 
            <Grid item xs={6}>  
              <SelectedFilter data={parameters} date={date}/>
            </Grid> 
            <Grid item xs={6}>            
              <QueryMonitor data={queryMonitorData} date={date}/>
            </Grid>            
          </Grid></div>) 
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
