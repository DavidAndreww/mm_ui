export const parameterValidations = (parameters) => {
  // ensures user has selected a query engine
  if (parameters.engine === null) {
    window.alert('Please select a processing engine...')
    return false
  }
  // ensures user has selected a market
  // if (parameters.market === null) {
  //   window.alert('Please select a market...')
  //   return false
  // }
  // // ensures user has selected a brand
  // if (parameters.brand === null) {
  //   window.alert('Please select a brand...')
  //   return false
  // }
  // ensures user has selected a current date range
  if (parameters.currStartDate === null || parameters.currEndDate === null) {
    window.alert('Please select a valid date range for current period')
    return false
  }
  // ensures user has selected both 'prev' date ranges if one has been selected
  if (parameters.prevStartDate !== null) {
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

export const slicerMapCreation = (
  queryNumber,
  jsonSlicer,
  jsonSlicer2,
  slicerCallback,
  payerSlicerMaps
) => {
  switch (queryNumber) {
    case 1:
      /* 

    
    
    */
      break
    // map for payer dimension
    case 2:
      const entToBobToPay = new Map()
      const payToBob = new Map()
      const bobToEnt = new Map()
      for (let objects in jsonSlicer) {
        let ent = jsonSlicer[objects]['ENTERPRISE']
        let bob = jsonSlicer[objects]['BOB']
        let payer = jsonSlicer[objects]['PAYER_ENTITY']
        if (entToBobToPay.has(ent)) {
          if (entToBobToPay.get(ent).has(bob)) {
            entToBobToPay.get(ent).get(bob).push(payer)
          } else {
            entToBobToPay.get(ent).set(bob, [])
            entToBobToPay.get(ent).get(bob).push(payer)
          }
        } else {
          entToBobToPay.set(ent, new Map())
          entToBobToPay.get(ent).set(bob, [])
          entToBobToPay.get(ent).get(bob).push(payer)
        }
      }

      for (let objects in jsonSlicer2) {
        let payer = jsonSlicer2[objects]['PAYER_ENTITY']
        let bobArr = jsonSlicer2[objects]['BOB_ARR']
        payToBob.set(payer, bobArr)
      }

      for (let Ent of entToBobToPay.keys()) {
        for (let bobs of entToBobToPay.get(Ent).keys()) {
          bobToEnt.set(bobs, Ent)
        }
      }

      slicerCallback({ entToBobToPay: entToBobToPay,  payToBob: payToBob, bobToEnt: bobToEnt })
      break

    case 3:
      break
      // map for time dimension
    case 4:
      let startDateMap = new Map()
      let endDateMap = new Map()
      for (let rowNum in jsonSlicer) {
        let row_number = jsonSlicer[rowNum]['ROW_NUMBER']
        let s_w_s_d = jsonSlicer[rowNum]['SPLIT_WEEK_START_DATE']
        let s_w_e_d = jsonSlicer[rowNum]['SPLIT_WEEK_END_DATE']

        startDateMap.set(s_w_s_d, row_number)
        endDateMap.set(s_w_e_d, row_number)
      }
      const dates = {
        splitWeekStart: startDateMap,
        splitWeekEnd: endDateMap,
      }
      slicerCallback(dates)
      break

    default:
      return null
  }
}

export const payerFilter = (maps, obj, statePayerArrays, setStatePayerArrays) => {
  if(maps === undefined || maps === null) {
    return
  }
  // case when no values are selected
  if ((obj.enterprise === null || obj.enterprise.length < 1) && (obj.bob === null || obj.bob.length < 1) && (obj.payerentity === null || obj.payerentity.length < 1)) {
      let enterprises = []
      let bobs = []
      let payers = []
      let uniqueEnt = new Set()
      let uniqueBob = new Set()
      let uniquePay = new Set()
      for (let ent of maps.entToBobToPay.keys()) {
        if (uniqueEnt.has(ent)) {
        } else {
          uniqueEnt.add(ent)
          enterprises.push({ value: ent, label: ent })
        }
        for (let bob of maps.entToBobToPay.get(ent).keys()) {
          if (uniqueBob.has(maps.entToBobToPay.get(ent).get(bob))) {
          } else {
            uniqueBob.add(bob)
            bobs.push({ value: bob, label: bob })
          }
          for (let i in maps.entToBobToPay.get(ent).get(bob)) {
            if (uniquePay.has(maps.entToBobToPay.get(ent).get(bob)[i])) {
            } else {
              uniquePay.add(maps.entToBobToPay.get(ent).get(bob)[i])
              payers.push({ value: maps.entToBobToPay.get(ent).get(bob)[i], label: maps.entToBobToPay.get(ent).get(bob)[i] })
            }
          }
        }
      }
      setStatePayerArrays ({
        enterprises:enterprises,
        bobs:bobs,
        payers:payers
      })
      // case when user selects only an enterprise
    } else if (obj.enterprise && (obj.bob === null || obj.bob.length < 1) && (obj.payerentity === null || obj.payerentity.length < 1)) {
    let bobsArr = []
    let payersArr = []
    let uniqueBob = new Set()
    let uniquePay = new Set()
    obj.enterprise.forEach(enterprise => {
      for(let bobs of maps.entToBobToPay.get(enterprise.toString()).keys()) {
        if(uniqueBob.has(bobs)) {
  
        }else{
          uniqueBob.add(bobs)
          bobsArr.push({ value: bobs, label: bobs })
        }
        for (let i in maps.entToBobToPay.get(enterprise).get(bobs)) {
          if (uniquePay.has(maps.entToBobToPay.get(enterprise).get(bobs)[i])) {
          } else {
            uniquePay.add(maps.entToBobToPay.get(enterprise).get(bobs)[i])
            payersArr.push({ value: maps.entToBobToPay.get(enterprise).get(bobs)[i], label: maps.entToBobToPay.get(enterprise).get(bobs)[i] })
          }
        }
      }      
    });

    setStatePayerArrays ({
      ...statePayerArrays,
      bobs:bobsArr,
      payers:payersArr
    })
    // case when user has selected only a BOB
  } else if ((obj.enterprise === null || obj.enterprise.length < 1) && obj.bob && (obj.payerentity === null || obj.payerentity < 1)) {
    let entArr = []
    let payersArr = []
    let uniqueEnt = new Set()
    let uniquePay = new Set()
    obj.bob.forEach(bob => {
      let entName;
      if (uniqueEnt.has(maps.bobToEnt.get(bob))) {
      } else {
        uniqueEnt.add(maps.bobToEnt.get(bob));
        entArr.push({ value: maps.bobToEnt.get(bob), label: maps.bobToEnt.get(bob) });
        entName = maps.bobToEnt.get(bob);
      }
      for (let i in maps.entToBobToPay.get(entName).get(bob)) {
        if (uniquePay.has(maps.entToBobToPay.get(entName).get(bob)[i])) {
        } else {
          uniquePay.add(maps.entToBobToPay.get(entName).get(bob)[i])
          payersArr.push({ value: maps.entToBobToPay.get(entName).get(bob)[i], label: maps.entToBobToPay.get(entName).get(bob)[i] })
        }
      }
    })
    setStatePayerArrays({
      ...statePayerArrays,
      enterprises: entArr,
      payers: payersArr
    })
    // case when user has selected only a payer
  } else if ((obj.enterprise === null || obj.enterprise.length < 1) && (obj.bob === null || obj.bob.length <1) && obj.payerentity) {
    let entArr = []
    let bobArr = []
    let uniqueEnt = new Set()
    let uniqueBob = new Set()

    obj.payerentity.forEach(payer => {
      let bobName;
      if(uniqueBob.has(maps.payToBob.get(payer))) {
      } else {
        for (let i in maps.payToBob.get(payer)) {
          uniqueBob.add(maps.payToBob.get(payer)[i]);
          bobArr.push({ value: maps.payToBob.get(payer)[i], label: maps.payToBob.get(payer)[i] });
          bobName = maps.payToBob.get(payer)[i];
        }
      }
      if (uniqueEnt.has(maps.bobToEnt.get(bobName))) {
      } else {
        uniqueEnt.add(maps.bobToEnt.get(bobName))
        entArr.push({ value: maps.bobToEnt.get(bobName), label: maps.bobToEnt.get(bobName) })
      }
    })
    setStatePayerArrays({
      ...statePayerArrays,
      enterprises: entArr,
      bobs: bobArr
    })
  }
  // case when user selects enterprise and a BOB
  else if(obj.enterprise && obj.bob && (obj.payerentity === null || obj.payerentity.length < 1)){
    let payerArr = []
    let entArr = []
    let uniquePayer = new Set();
    obj.enterprise.forEach(enterprise => {
      entArr.push({ value: enterprise, label: enterprise })
    })
    obj.enterprise.forEach(enterprise => {
      for(let bobs of maps.entToBobToPay.get(enterprise.toString()).keys()) {
        if(obj.bob.includes(bobs)) {
          for(let i in maps.entToBobToPay.get(enterprise).get(bobs)) {
            if(!uniquePayer.has(maps.entToBobToPay.get(enterprise).get(bobs)[i])){
              uniquePayer.add(maps.entToBobToPay.get(enterprise).get(bobs)[i])
              payerArr.push({ value: maps.entToBobToPay.get(enterprise).get(bobs)[i], label: maps.entToBobToPay.get(enterprise).get(bobs)[i] })
            }
          }
        }
      }
    })
    setStatePayerArrays({
      ...statePayerArrays,
      enterprises: entArr,
      payers: payerArr
    })
    // case when user selects enterprise and payer
  } else if (obj.enterprise && (obj.bob === null || obj.bob.length <1) && obj.payerentity) {
    let entArr = []
    let bobArr = []
    let payerArry = []
    let uniqueEnt = new Set()
    let uniqueBob = new Set()
    let uniquePayer = new Set()

    obj.enterprise.forEach(enterprise => {
      
    })
    // case when user selects BOB and payer
  } else if ((obj.enterprise === null || obj.enterprise.length <1) && obj.bob && obj.payerentity) {

  }
}

