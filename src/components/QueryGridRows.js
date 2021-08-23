export const QueryGridRows = (data = null) => {
    let dataSet = []
    if (data === null || data === undefined){

    }else{
        for (let i = 0; i < data.length; i++){
            let paramArr = []
            for (const [key,val] of Object.entries(data[data.length-i-1].parameters)){
                if(val === null || key === 'engine'){
                }else {
                    paramArr.push(val)
                }
            }
            let row = {
                id: data[data.length-i-1].id,
                timestamp: data[data.length-i-1].timestamp,
                runtime: data[data.length-i-1].runtime,
                parameters:paramArr,
                engine:data[data.length-i-1].parameters.engine
            }
            dataSet.push(row)
        }
    }
    return dataSet
}