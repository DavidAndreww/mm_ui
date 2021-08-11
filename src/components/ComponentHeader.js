import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, AppBar, Toolbar} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  border: {
    // borderRadius: '10px 10px 0px 0px',
    '& .MuiToolbar-gutters':{
      padding:'0 12px'
    }
  },
  flex:{
    flex: 1,
  },
  btnSmall:{
    padding: '4px 10px',
    fontSize: 12
  }
}));

export const ComponentHeader =({ label,action}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.border}>
        <Toolbar variant="dense">
          <Typography variant="body1" color="inherit">
            {label}
          </Typography>
          <div className={classes.flex}></div>
          {action && (
            <Button color='secondary' variant='contained' className={classes.btnSmall} onClick={action?.fn}>{action?.label}</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}