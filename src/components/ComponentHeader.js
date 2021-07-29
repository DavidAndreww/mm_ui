import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  border: {
    borderRadius: '10px 10px 0px 0px'
  }
}));

export const ComponentHeader =({ label }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.border}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            {label}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}