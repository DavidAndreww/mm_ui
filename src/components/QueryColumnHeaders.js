export const QueryColumnHeaders = (data = null) => {
    if (data === null){
        return []
    }else{
        return [
            {headerName: 'ID', field:'id'},
            {headerName: 'Timestamp', field:'timestamp'},
            {headerName: 'Runtime', field:'runtime'},
            {headerName: 'Parameters', field:'parameters'},
            {headerName: 'Engine', field:'engine'}
        ]
    }
}