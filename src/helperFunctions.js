export const parameterValidations = (parameters) => {
  // ensures user has selected a query engine
  if (parameters.engine === null) {
    window.alert('Please select a processing engine...')
    return false
  }
  // ensures user has selected a market
  if (parameters.market === null) {
    window.alert('Please select a market...')
    return false
  }
  // ensures user has selected a brand
  if (parameters.brand === null) {
    window.alert('Please select a brand...')
    return false
  }
  // ensures user has selected a current date range
  if (parameters.currStartDate === null || parameters.currEndDate === null) {
    window.alert('Please select a valid date range for current period')
    return false
  }
  // ensures user has selected both 'prev' date ranges if one has been selected 
  if (parameters.prevStartDate !== null)  {
    if (parameters.prevEndDate === null) {
      window.alert('Please select a valid date range for prior period')
      return false
    }
  } else if (parameters.prevStartDate === null) {
    if (parameters.prevEndDate !== null) {
      window.alert('Please select a valid date range for prior period')
      return false
    }
  }
  return true
}



export const slicerMapCreation = (queryNumber, jsonSlicer, setSlicerMaps, slicerMaps) => {
  switch(queryNumber){

    case 1:
      let result={}
      // for(Keys in jsonSlicer){
          
      // }
      break;

    case 2:
      const map1 = new Map();
      let map2 = new Map();
      let map3 = {}
      for(let objects in jsonSlicer){
        let ent = jsonSlicer[objects]["ENTERPRISE"];
        let bob = jsonSlicer[objects]["BOB"];
        let payer = jsonSlicer[objects]["PAYER_ENTITY"];
        // console.log(`Enter: ${ent}, BOB: ${bob}, payer: ${payer}`);
          if(map1.has(ent)){
            if(map1.get(ent).has(bob)){
              map1.get(ent).get(bob).push(payer);
            }else{
              map1.get(ent).set(bob, []);
              map1.get(ent).get(bob).push(payer);
            }
          }else{
            map1.set(ent, new Map());
            map1.get(ent).set(bob,[]);
            map1.get(ent).get(bob).push(payer);
            }
      }
      
      // console.log(map1.get("CVS Health"));
      // sessionStorage.setItem("MasterPayerMap", JSON.stringify(map1));
      // const map = new Map(sessionStorage.getItem("MasterPayerMap"))
      // console.log(sessionStorage.getItem("MasterPayerMap"));
      setSlicerMaps({...slicerMaps, map1:"map1"});
    break;

    default:
      return null;
      break;

  }

}