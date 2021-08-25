export const QueryGridRows = (data = null, date = null) => {
    let dataSet = []
    if (data === null || data === undefined || date === null || date === undefined){

    }else{
        for (let i = data.length-1; i >= 0; i--){
            let paramArr = []
            for (const [key,val] of Object.entries(data[i].parameters)){
                if(val === null || val === [] || key === 'engine' || key === 'brand' || key === 'currStartDate' || key === 'currEndDate' || key === 'prevStartDate' || key === 'prevEndDate'){
                }else{
                    paramArr.push(val)
                }
            }
            for (const [key,val] of Object.entries(date)){
                if(val === null ||  val === undefined){
                }else{
                    paramArr.push(val)
                }
            }
            console.log('i',i,'paramArr',paramArr)
            let row = {
                id: data[i].id,
                timestamp: data[i].timestamp,
                runtime: data[i].runtime,
                parameters:paramArr,
                engine:data[i].parameters.engine
            }
            dataSet.push(row)
        }
    }
    return dataSet
}