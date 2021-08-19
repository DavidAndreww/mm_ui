// import { getBoundingClientObj } from "react-select/src/utils"

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
      const entToPayToBob = new Map()
      const payToBobToEnt = new Map()
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

      for (let objects in jsonSlicer) {
        let ent = jsonSlicer[objects]['ENTERPRISE']
        let bob = jsonSlicer[objects]['BOB']
        let payer = jsonSlicer[objects]['PAYER_ENTITY']
        if (entToPayToBob.has(ent)) {
          if (entToPayToBob.get(ent).has(payer)) {
            entToPayToBob.get(ent).get(payer).push(bob)
          } else {
            entToPayToBob.get(ent).set(payer, [])
            entToPayToBob.get(ent).get(payer).push(bob)
          }
        } else {
          entToPayToBob.set(ent, new Map())
          entToPayToBob.get(ent).set(payer, [])
          entToPayToBob.get(ent).get(payer).push(bob)
        }
      }

      for (let objects in jsonSlicer) {
        let ent = jsonSlicer[objects]['ENTERPRISE']
        let bob = jsonSlicer[objects]['BOB']
        let payer = jsonSlicer[objects]['PAYER_ENTITY']
        if (payToBobToEnt.has(payer)) {
          if (payToBobToEnt.get(payer).has(bob)) {
            payToBobToEnt.get(payer).get(bob).push(ent)
          } else {
            payToBobToEnt.get(payer).set(bob, [])
            payToBobToEnt.get(payer).get(bob).push(ent)
          }
        } else {
          payToBobToEnt.set(payer, new Map())
          payToBobToEnt.get(payer).set(bob, [])
          payToBobToEnt.get(payer).get(bob).push(ent)
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

      slicerCallback({ entToBobToPay: entToBobToPay,  payToBob: payToBob, bobToEnt: bobToEnt, entToPayToBob:entToPayToBob, payToBobToEnt:payToBobToEnt  })
      break

    case 3:
      const categoryToTeam = new Map()
      const teamToCat = new Map()

      for(let Objects in jsonSlicer){
        let teams = jsonSlicer[Objects]['TEAM_NAME']
        let cat = jsonSlicer[Objects]['CATEGORY']
        if(categoryToTeam.has(cat)){
          categoryToTeam.get(cat).push(teams)
        }else{
          categoryToTeam.set(cat, [])
          categoryToTeam.get(cat).push(teams)
        }
      }
      for(let Objects in jsonSlicer){
        let teams = jsonSlicer[Objects]['TEAM_NAME']
        let cat = jsonSlicer[Objects]['CATEGORY']
        if(teamToCat.has(teams)){
          teamToCat.get(teams).push(cat)
        }else{
          teamToCat.set(teams, [])
          teamToCat.get(teams).push(cat)
        }
      }
      slicerCallback({categoryToTeam: categoryToTeam, teamToCat:teamToCat})
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

      //map for geo dimension
      case 6:
      const regTostToterr = new Map()
      const terrTost = new Map()
      const stToReg = new Map()
      const regToTerrToSt = new Map()
      const terrToStToReg = new Map()

      for (let objects in jsonSlicer) {
        let reg = jsonSlicer[objects]['REGION']
        let st = jsonSlicer[objects]['STATE']
        let terr = jsonSlicer[objects]['TERRITORY_NAME']
        if (regTostToterr.has(reg)) {
          if (regTostToterr.get(reg).has(st)) {
            regTostToterr.get(reg).get(st).push(terr)
          } else {
            regTostToterr.get(reg).set(st, [])
            regTostToterr.get(reg).get(st).push(terr)
          }
        } else {
          regTostToterr.set(reg, new Map())
          regTostToterr.get(reg).set(st, [])
          regTostToterr.get(reg).get(st).push(terr)
        }
      }

      for (let objects in jsonSlicer) {
        let reg = jsonSlicer[objects]['REGION']
        let st = jsonSlicer[objects]['STATE']
        let terr = jsonSlicer[objects]['TERRITORY_NAME']
        if (regToTerrToSt.has(reg)) {
          if (regToTerrToSt.get(reg).has(terr)) {
            regToTerrToSt.get(reg).get(terr).push(st)
          } else {
            regToTerrToSt.get(reg).set(terr, [])
            regToTerrToSt.get(reg).get(terr).push(st)
          }
        } else {
          regToTerrToSt.set(reg, new Map())
          regToTerrToSt.get(reg).set(terr, [])
          regToTerrToSt.get(reg).get(terr).push(st)
        }
      }

      for (let objects in jsonSlicer) {
        let reg = jsonSlicer[objects]['REGION']
        let st = jsonSlicer[objects]['STATE']
        let terr = jsonSlicer[objects]['TERRITORY_NAME']
        if (terrToStToReg.has(terr)) {
          if (terrToStToReg.get(terr).has(st)) {
            terrToStToReg.get(terr).get(st).push(reg)
          } else {
            terrToStToReg.get(terr).set(st, [])
            terrToStToReg.get(terr).get(st).push(reg)
          }
        } else {
          terrToStToReg.set(terr, new Map())
          terrToStToReg.get(terr).set(st, [])
          terrToStToReg.get(terr).get(st).push(reg)
        }
      }

      for (let objects in jsonSlicer2) {
        let terr = jsonSlicer2[objects]['TERRITORY_NAME']
        let stArr = jsonSlicer2[objects]['ST_ARR']
        terrTost.set(terr, stArr)
      }

      for (let reg of regTostToterr.keys()) {
        for (let st of regTostToterr.get(reg).keys()) {
          stToReg.set(st, reg)
        }
      }

      slicerCallback({ regTostToterr: regTostToterr,  terrTost: terrTost, stToReg: stToReg, regToTerrToSt:regToTerrToSt, terrToStToReg:terrToStToReg })
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
  }
     // case when user selects enterprise and payer
     else if (obj.enterprise && (obj.bob === null || obj.bob.length <1) && obj.payerentity) {
      let bobArr = []
      let entArr = []
      let uniqueBob = new Set();
      obj.enterprise.forEach(enterprise => {
        entArr.push({ value: enterprise, label: enterprise })
      })
      obj.enterprise.forEach(enterprise => {
        for(let payer of maps.entToPayToBob.get(enterprise.toString()).keys()) {
          if(obj.payerentity.includes(payer)) {
            for(let i in maps.entToPayToBob.get(enterprise).get(payer)) {
              if(!uniqueBob.has(maps.entToPayToBob.get(enterprise).get(payer)[i])){
                uniqueBob.add(maps.entToPayToBob.get(enterprise).get(payer)[i])
                bobArr.push({ value: maps.entToPayToBob.get(enterprise).get(payer)[i], label: maps.entToPayToBob.get(enterprise).get(payer)[i] })
              }
            }
          }
        }
      })
      setStatePayerArrays({
        ...statePayerArrays,
        enterprises: entArr,
        bobs: bobArr
      })
     }
    // case when user selects BOB and payer
    else if ((obj.enterprise === null || obj.enterprise.length <1) && obj.bob && obj.payerentity) {
      let entArr = []
      let payerArr = []
      let uniqueEnt = new Set();
      obj.payerentity.forEach(payerentity => {
        payerArr.push({ value: payerentity, label: payerentity })
      })
      obj.payerentity.forEach(payerentity => {
        for(let bo of maps.payToBobToEnt.get(payerentity.toString()).keys()) {
          if(obj.bob.includes(bo)) {
            for(let i in maps.payToBobToEnt.get(payerentity).get(bo)) {
              if(!uniqueEnt.has(maps.payToBobToEnt.get(payerentity).get(bo)[i])){
                uniqueEnt.add(maps.payToBobToEnt.get(payerentity).get(bo)[i])
                entArr.push({ value: maps.payToBobToEnt.get(payerentity).get(bo)[i], label: maps.payToBobToEnt.get(payerentity).get(bo)[i] })
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
    }
  }

export const geoFilter = (maps, obj, stateGeoArrays, setStateGeoArrays) => {
  if(maps === undefined || maps === null) {
    return
  }
  // case when no values are selected
  if ((obj.region === null || obj.region.length < 1) && (obj.state === null || obj.state.length < 1) && (obj.territory === null || obj.territory.length < 1)) {
      let regions = []
      let states = []
      let territorys = []
      let uniqueReg = new Set()
      let uniqueSt = new Set()
      let uniqueTerr = new Set()
      for (let reg of maps.regTostToterr.keys()) {
        if (uniqueReg.has(reg)) {
        } else {
          uniqueReg.add(reg)
          regions.push({ value: reg, label: reg })
        }
        for (let st of maps.regTostToterr.get(reg).keys()) {
          if (uniqueSt.has(maps.regTostToterr.get(reg).get(st))) {
          } else {
            uniqueSt.add(st)
            states.push({ value: st, label: st })
          }
          for (let i in maps.regTostToterr.get(reg).get(st)) {
            if (uniqueTerr.has(maps.regTostToterr.get(reg).get(st)[i])) {
            } else {
              uniqueTerr.add(maps.regTostToterr.get(reg).get(st)[i])
              territorys.push({ value: maps.regTostToterr.get(reg).get(st)[i], label: maps.regTostToterr.get(reg).get(st)[i] })
            }
          }
        }
      }
      setStateGeoArrays ({
        regions:regions,
        states:states,
        territorys:territorys
      })
      // case when user selects only an Region
    } else if (obj.region && (obj.state === null || obj.state.length < 1) && (obj.territory === null || obj.territory.length < 1)) {
    let stArr = []
    let terrArr = []
    let uniqueSt = new Set()
    let uniqueTerr = new Set()
    obj.region.forEach(region => {
      for(let st of maps.regTostToterr.get(region.toString()).keys()) {
        if(uniqueSt.has(st)) {
  
        }else{
          uniqueSt.add(st)
          stArr.push({ value: st, label: st })
        }
        for (let i in maps.regTostToterr.get(region).get(st)) {
          if (uniqueTerr.has(maps.regTostToterr.get(region).get(st)[i])) {
          } else {
            uniqueTerr.add(maps.regTostToterr.get(region).get(st)[i])
            terrArr.push({ value: maps.regTostToterr.get(region).get(st)[i], label: maps.regTostToterr.get(region).get(st)[i] })
          }
        }
      }      
    });

    setStateGeoArrays ({
      ...stateGeoArrays,
      states:stArr,
      territorys:terrArr
    })
    // case when user has selected only a state
  } else if ((obj.region === null || obj.region.length < 1) && obj.state && (obj.territory === null || obj.territory < 1)) {
    let regArr = []
    let terrArr = []
    let uniqueReg = new Set()
    let uniqueTerr = new Set()
    obj.state.forEach(state => {
      let regName;
      if (uniqueReg.has(maps.stToReg.get(state))) {
      } else {
        uniqueReg.add(maps.stToReg.get(state));
        regArr.push({ value: maps.stToReg.get(state), label: maps.stToReg.get(state) });
        regName = maps.stToReg.get(state);
      }
      for (let i in maps.regTostToterr.get(regName).get(state)) {
        if (uniqueTerr.has(maps.regTostToterr.get(regName).get(state)[i])) {
        } else {
          uniqueTerr.add(maps.regTostToterr.get(regName).get(state)[i])
          terrArr.push({ value: maps.regTostToterr.get(regName).get(state)[i], label: maps.regTostToterr.get(regName).get(state)[i] })
        }
      }
    })
    setStateGeoArrays({
      ...stateGeoArrays,
      regions: regArr,
      territorys: terrArr
    })
    // case when user has selected only a territory
  } else if ((obj.region === null || obj.region.length < 1) && (obj.state === null || obj.state.length <1) && obj.territory) {
    let regArr = []
    let stArr = []
    let uniqueReg = new Set()
    let uniqueSt = new Set()

    obj.territory.forEach(territory => {
      let stName;
      if(uniqueSt.has(maps.terrTost.get(territory))) {
      } else {
        for (let i in maps.terrTost.get(territory)) {
          uniqueSt.add(maps.terrTost.get(territory)[i]);
          stArr.push({ value: maps.terrTost.get(territory)[i], label: maps.terrTost.get(territory)[i] });
          stName = maps.terrTost.get(territory)[i];
        }
      }
      if (uniqueReg.has(maps.stToReg.get(stName))) {
      } else {
        uniqueReg.add(maps.stToReg.get(stName))
        regArr.push({ value: maps.stToReg.get(stName), label: maps.stToReg.get(stName) })
      }
    })
    setStateGeoArrays({
      ...stateGeoArrays,
      regions: regArr,
      states: stArr
    })
  }
  // case when user selects Region and a State
  else if(obj.region && obj.state && (obj.territory === null || obj.territory.length < 1)){
    let terrArr = []
    let regArr = []
    let uniqueTerr = new Set();
    obj.region.forEach(region => {
      regArr.push({ value: region, label: region })
    })
    obj.region.forEach(region => {
      for(let st of maps.regTostToterr.get(region.toString()).keys()) {
        if(obj.state.includes(st)) {
          for(let i in maps.regTostToterr.get(region).get(st)) {
            if(!uniqueTerr.has(maps.regTostToterr.get(region).get(st)[i])){
              uniqueTerr.add(maps.regTostToterr.get(region).get(st)[i])
              terrArr.push({ value: maps.regTostToterr.get(region).get(st)[i], label: maps.regTostToterr.get(region).get(st)[i] })
            }
          }
        }
      }
    })
    setStateGeoArrays({
      ...stateGeoArrays,
      regions: regArr,
      territorys: terrArr
    })
  }
      // case when user selects Region and territory
  else if (obj.region && (obj.state === null || obj.state.length <1) && obj.territory) {
    let stArr = []
    let regArr = []
    let uniqueSt = new Set();
    obj.region.forEach(region => {
      regArr.push({ value: region, label: region })
    })
    obj.region.forEach(region => {
      for(let terr of maps.regToTerrToSt.get(region.toString()).keys()) {
        if(obj.territory.includes(terr)) {
          for(let i in maps.regToTerrToSt.get(region).get(terr)) {
            if(!uniqueSt.has(maps.regToTerrToSt.get(region).get(terr)[i])){
              uniqueSt.add(maps.regToTerrToSt.get(region).get(terr)[i])
              stArr.push({ value: maps.regToTerrToSt.get(region).get(terr)[i], label: maps.regToTerrToSt.get(region).get(terr)[i] })
            }
          }
        }
      }
    })
    setStateGeoArrays({
      ...stateGeoArrays,
      regions: regArr,
      states: stArr
    })
      
      // case when user selects state and territory
    } 
    else if ((obj.region === null || obj.region.length <1) && obj.state && obj.territory) {
    let regArr = []
    let terrArr = []
    let uniqueReg = new Set();
    obj.territory.forEach(territory => {
      terrArr.push({ value: territory, label: territory })
    })
    obj.territory.forEach(territory => {
      for(let st of maps.terrToStToReg.get(territory.toString()).keys()) {
        if(obj.state.includes(st)) {
          for(let i in maps.terrToStToReg.get(territory).get(st)) {
            if(!uniqueReg.has(maps.terrToStToReg.get(territory).get(st)[i])){
              uniqueReg.add(maps.terrToStToReg.get(territory).get(st)[i])
              regArr.push({ value: maps.terrToStToReg.get(territory).get(st)[i], label: maps.terrToStToReg.get(territory).get(st)[i] })
            }
          }
        }
      }
    })
    setStateGeoArrays({
      ...stateGeoArrays,
      regions: regArr,
      territorys: terrArr
    })
    }
  }
  
export const datetorow = (dim,obj, maps) => {
  if (dim === 'currStartDate'){
    if(maps.splitWeekStart.has(obj)){
      return maps.splitWeekStart.get(obj)
    }
  }
  else if (dim === 'currEndDate'){
    if(maps.splitWeekEnd.has(obj)){
      return maps.splitWeekEnd.get(obj)
    }
  }
  else if (dim === 'prevStartDate'){
    if(maps.splitWeekStart.has(obj)){
      return maps.splitWeekStart.get(obj)
    }
  }
  else if (dim === 'prevEndDate'){
    if(maps.splitWeekEnd.has(obj)){
      return maps.splitWeekEnd.get(obj)
    }
  }
  else{
    return
  }
}

export const teamFilter = (maps, obj, stateTeamArrays, setStateTeamArrays) =>{
  console.log('maps',maps)
  if(maps === undefined || maps === null) {
    return
  }
  // Case when user select nothing
  if((obj.category === null || obj.category.length <1) && (obj.team === null || obj.team.length < 1)){
    let categories = []
    let teamss = []
    let uniqueCat = new Set();
    let uniqueTeam = new Set();

    for(let c of maps.categoryToTeam.keys()){
      if(uniqueCat.has(c)){
      }else{
        uniqueCat.add(c)
        categories.push({ value:c, label:c })
      }
      for(let te of maps.categoryToTeam.get(c).keys()){
        if(uniqueTeam.has(te)){
        }else{
          uniqueTeam.add(te)
          teamss.push({ value: maps.categoryToTeam.get(c)[te], value: maps.categoryToTeam.get(c)[te]})
        }
      }
    }
    
    setStateTeamArrays ({
      categories:categories,
      teamss:teamss
    })
  }
  //Case when user selects category
  else if(obj.category && (obj.team === null || obj.team.length < 1)){
    let teamArr = []
    let uniqueTeam = new Set();
    obj.category.forEach(category => {
      for(let te of maps.categoryToTeam.get(category)){
        if(!uniqueTeam.has(maps.categoryToTeam.get(category)[te])){
          uniqueTeam.add(maps.categoryToTeam.get(category))
          teamArr.push({ value:maps.categoryToTeam.get(category), label:maps.categoryToTeam.get(category)})
        }
      }
    })
    console.log('unique',uniqueTeam)
    setStateTeamArrays ({
      ...stateTeamArrays,
      teamss:teamArr
    })
  }else if((obj.category === null || obj.category.length <1) && obj.team){
    let catArr = []
    let uniqueCat = new Set();
    obj.team.forEach(team => {
      for(let c of maps.teamToCat.get(team)){
        if(!uniqueCat.has(maps.teamToCat.get(team)[c])){
          uniqueCat.add(maps.teamToCat.get(team))
          catArr.push({ value:maps.teamToCat.get(team), label:maps.teamToCat.get(team)})
        }
      }
    })
    setStateTeamArrays({
      ...stateTeamArrays,
      categories:catArr
    })
  }
}