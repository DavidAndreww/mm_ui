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



export const slicerMapCreation = (queryNumber, jsonSlicer, jsonSlicer2, setSlicerMaps, slicerMaps) => {
  switch(queryNumber){

    case 1:
      let result={}
      // for(Keys in jsonSlicer){
          
      // }
      break;

    case 2:
      const map1 = new Map();
      const map2 = new Map();
      const map3 = new Map();
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

      for(let objects in jsonSlicer2){
        let payer = jsonSlicer2[objects]["PAYER_ENTITY"];
        let bobArr = jsonSlicer2[objects]["BOB_ARR"];
        map2.set(payer,bobArr);
      }

      for( let Ent of map1.keys()){
        for(let bobs of map1.get(Ent).keys()){
          // console.log(`${Ent} and bob : ${bobs}`)
          // map2.set(map1.get(Objects).get(bobs),bobs);
          map3.set(bobs, Ent);  
        }}

      
      
      // console.log(map1.get("CVS Health"));
      // sessionStorage.setItem("MasterPayerMap", JSON.stringify(map1));
      // const map = new Map(sessionStorage.getItem("MasterPayerMap"))
      // console.log(sessionStorage.getItem("MasterPayerMap"));
      setSlicerMaps({map1:map1});
      setSlicerMaps({map2:map2});
      setSlicerMaps({map3:map3});

      // setSlicerMaps(slicerMaps.set('map1',map1));
      // setSlicerMaps(slicerMaps.set('map2',map2));
      // setSlicerMaps(slicerMaps.set('map3',map3));
    break;

    default:
      return null;
      break;

  }

}