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

  const toggleParameters = (e,name) => {
    let dimension = name.name.split(' ').join('');
    let values;
    if (typeof e === 'object') {
      values = e.map(val => {
        return val.value
      });
    }
    setParameters({ ...parameters, [dimension]:values })
  }
  
  return (  
    <div id='app'>
      <TimeFilter />
      <DimensionFilter toggleParameters={toggleParameters}/>
      <ResultsGrid />
      <QueryEngine />
      <QueryMonitor />
    </div>  
  );
}

export default App;
