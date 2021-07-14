import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />; 
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: "7%",
        right: "5%"  
    },
}));

const CustomSnackbar = (props) => {
  
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
    console.log("closing");
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={3500} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={props.type}> {/*error, warning, info, succes*/}
            {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
