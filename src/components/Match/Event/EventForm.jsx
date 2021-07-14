import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles ((theme) => ({
  root: {
    margin: '25px auto',
    width: "80%",
    [theme.breakpoints.between('sm','md')]:{
        margin: '45px auto',
    },
    [theme.breakpoints.between('md','xl')]:{
        margin: '75px auto',
    },
    [theme.breakpoints.up('xl')]:{
        margin: '90px auto',
    }
  },
  fields: {
      display: 'block',
      width: "100%",
      marginBottom: "1rem",
  },
  fieldsBottom: {
    marginBottom: "3rem",
}, 
  checks:{
      margin:"0.2rem",
      [theme.breakpoints.up('sm')]:{
        margin:"1rem",

      }
  }
}));


const EventForm = (props) => {
  
    let classes = useStyles();

    const handleChange = ( val) => {
        let array = props.checkboxes.slice();
        array[val] = !array[val]; // kontra šta je bilo

        props.setCheckboxes(array);
    };


  return (
  <form onSubmit={(e)=>{}} className={classes.root} noValidate autoComplete="off"className={classes.root}>
        <TextField defaultValue={props.time} onChange={(e)=>{props.setTime(e.target.value)}} fullWidth className={classes.fields} type="text" label="Time" variant="filled"/>
        <TextField defaultValue={props.article}  onChange={(e)=>{props.setArticle(e.target.value)}} fullWidth className={clsx(classes.fields, classes.fieldsBottom)} type="text" label="Article" variant="filled" multiline rows={10}/>
        {props.checks.map(check => 
                <FormControlLabel className={classes.checks}
                    control={<Checkbox checked={props.checkboxes[props.checks.indexOf(check)]} onChange={()=>handleChange(props.checks.indexOf(check))} />}
                    label={check}
                />)}
    </form>
    

  );
};

export default EventForm;