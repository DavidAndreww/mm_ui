import './App.css';
import { useState } from 'react'
import { DimensionFilter } from './components/DimensionFilter';
import { TimeFilter } from './components/TimeFilter';
import { QueryMonitor } from './components/QueryMonitor';
import { QueryEngine } from './components/QueryEngine'
import { ResultsGrid } from './components/ResultsGrid'

function App() {

  const [parameters, setParameters] = useState({
    enterprise: [],
    bob: [],
    payerentity: [],
    region: [],
    state: [],
    territory: [],
    category: [],
    team: [],
    currStartDate: '',
    currEndDate: '',
    prevStartDate: '',
    prevEndDate: '',
    engine: '' 
  })

  const toggleParameters = (e,name = null) => {
    let dimension;
    let values;
    console.log(e)
    if (name) {
      dimension = name.name.split(' ').join('')
    } else {
      dimension = e.target.id
    }

    if (e.length !== undefined) {
      values = e.map(val => {
        return val.value
      });
    } else {
      values = e.target.value;
    }
    setParameters({ ...parameters, [dimension]:values })
  }
  
  return (  
    <div id='app'>
      <TimeFilter toggleParameters={toggleParameters} />
      <DimensionFilter toggleParameters={toggleParameters}/>
      <ResultsGrid />
      <QueryEngine toggleParameters={toggleParameters}/>
      <QueryMonitor />
    </div>  
  );
}

export default App;
