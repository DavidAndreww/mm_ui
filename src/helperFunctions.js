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
      //let result={}
      // for(Keys in jsonSlicer){
          
      // }
      break;

    case 2:
      const entToBobToPay = new Map();
      const payToBob = new Map();
      const bobToEnt = new Map();
      for(let objects in jsonSlicer){
        let ent = jsonSlicer[objects]["ENTERPRISE"];
        let bob = jsonSlicer[objects]["BOB"];
        let payer = jsonSlicer[objects]["PAYER_ENTITY"];
        // console.log(`Enter: ${ent}, BOB: ${bob}, payer: ${payer}`);
          if(entToBobToPay.has(ent)){
            if(entToBobToPay.get(ent).has(bob)){
              entToBobToPay.get(ent).get(bob).push(payer);
            }else{
              entToBobToPay.get(ent).set(bob, []);
              entToBobToPay.get(ent).get(bob).push(payer);
            }
          }else{
            entToBobToPay.set(ent, new Map());
            entToBobToPay.get(ent).set(bob,[]);
            entToBobToPay.get(ent).get(bob).push(payer);
            }
      }

      for(let objects in jsonSlicer2){
        let payer = jsonSlicer2[objects]["PAYER_ENTITY"];
        let bobArr = jsonSlicer2[objects]["BOB_ARR"];
        payToBob.set(payer,bobArr);
      }

      for( let Ent of entToBobToPay.keys()){
        for(let bobs of entToBobToPay.get(Ent).keys()){
          // console.log(`${Ent} and bob : ${bobs}`)
          // payToBob.set(entToBobToPay.get(Objects).get(bobs),bobs);
          bobToEnt.set(bobs, Ent);  
        }}

      
        const slicers = {
          entToBobToPay: entToBobToPay,
          payToBob: payToBob,
          bobToEnt: bobToEnt
        }
        setSlicerMaps(slicers)
      
      // console.log(entToBobToPay.get("CVS Health"));
      // sessionStorage.setItem("MasterPayerMap", JSON.stringify(entToBobToPay));
      // const map = new Map(sessionStorage.getItem("MasterPayerMap"))
      // console.log(sessionStorage.getItem("MasterPayerMap"));
      // setSlicerMaps({entToBobToPay:entToBobToPay});
      // setSlicerMaps({payToBob:payToBob});
      // setSlicerMaps({bobToEnt:bobToEnt});

      // setSlicerMaps(slicerMaps.set('map1',map1));
      // setSlicerMaps(slicerMaps.set('map2',map2));
      // setSlicerMaps(slicerMaps.set('bobToEnt',map3));
    break;

    default:
      return null;
      break;

  }

}