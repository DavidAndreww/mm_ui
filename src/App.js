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
    
    if (name) {
      dimension = name.name.split(' ').join('')
    } else {
      dimension = e.target.id
    }

    if(dimension === 'engine') {
      values = e.value
    } else if (e.length !== undefined) {
      values = e.map(val => {
        return val.value
      })
    } else {
      values = e.target.value
    }
    setParameters({ ...parameters, [dimension]:values })
  }

  const handleExecute = () => {
    if (parameters.engine === '') {
      window.alert('Please select an engine')
    } else {
      fetch('http://localhost:5000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parameters
        })
      }).then(res => res.json()).then(json => console.log(json))
    }
  }
  
  return (  
    <div id='app'>
      <TimeFilter toggleParameters={toggleParameters} />
      <DimensionFilter toggleParameters={toggleParameters}/>
      <ResultsGrid />
      <QueryEngine toggleParameters={toggleParameters} handleExecute={handleExecute}/>
      <QueryMonitor />
    </div>  
  );
}

export default App;
