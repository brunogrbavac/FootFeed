import React from 'react';
import hrLocale from "date-fns/locale/hr";
import { KeyboardArrowLeft, KeyboardArrowRight, Event, AddPhotoAlternate}  from '@material-ui/icons';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { IconButton, InputAdornment } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles ((theme) => ({
  root: {
    margin: '0 auto',
    width: "80%",
  },
  fields: {
      display: 'block',
      width: "100%",
      marginBottom: "1rem",
  }, 
  input:{
      backgroundColor:theme.palette.secondary.main,
  },
  chooseFile:{
    display: 'flex',
    margin:"auto",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: "10px 25px 10px 20px",
    borderRadius: 5,
    fontWeight:450,
    // width: "fit-content",
    color:"white",
    filter: "drop-shadow(0px 2px 1px rgba(0,0,0,0.31))",
    "-webkit-filter": "drop-shadow(0px 2px 1px rgba(0,0,0,0.31))",
    "-moz-filter": "drop-shadow(0px 2px 1px rgba(0,0,0,0.31))",
    backgroundColor: theme.palette.primary.main,
    "&:hover":{
      cursor:"pointer",
      backgroundColor: theme.palette.primary.dark,
    }
  },
  para:{
    textAlign:"left",
    width:"fit-content",
    marginLeft:"auto",
    marginRight:"auto",
  }
}));


const EditMatch = (props) => {
  let classes = useStyles();

  const FilesOut = () => {
    let arr = [];
    for(let i=0; i<props.files.length;i++){ 
      arr.push(<p className={classes.para}>✔️{props.files[i].name.slice(0,15)}{props.files[i].name.length>15?"...":""}</p>);
    };
    return <div style={{marginTop:"2rem"}}>{arr}</div>;
  };

  return (
    <form onSubmit={(e)=>{}} className={classes.root} noValidate autoComplete="off">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={hrLocale} >
          <DateTimePicker className={classes.fields} hideTabs ampm={false} value={props.dateAndTime} inputVariant="filled" onChange={props.setDateAndTime} format="d. MMMM yyyy." allowKeyboardControl={true} minDate={new Date()} label="Match date and time" leftArrowIcon={<KeyboardArrowLeft />} leftArrowButtonProps={{ "aria-label": "Prev month" }} rightArrowButtonProps={{ "aria-label": "Next month" }} rightArrowIcon={<KeyboardArrowRight />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Event />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </MuiPickersUtilsProvider >

        <TextField defaultValue={props.stadium ? props.stadium :"" } onChange={(e)=>{props.setStadium(e.target.value)}} fullWidth className={classes.fields} type="text" label="Stadium" variant="filled"/>
        <TextField defaultValue={props.headline ? props.headline :""} onChange={(e)=>{props.setHeadline(e.target.value)}} fullWidth  className={classes.fields} type="text" label="Headline" variant="filled"/>
        <TextField defaultValue={props.article ? props.article :""} onChange={(e)=>{props.setArticle(e.target.value)}} fullWidth className={classes.fields} type="text" label="Article" variant="filled" multiline rows={6}/>
        <input id="upload-button" style={{display: 'none'}} accept="image/*"  multiple type="file" onInput={(event)=>{ if(event.target.files && event.target.files[0]) {let photos = event.target.files; props.setFiles(photos);}}}/>
        <label htmlFor={'upload-button'} style={{alignSelf:"center"}}>
          <div className={classes.chooseFile}>
              <AddPhotoAlternate style={{marginRight: 10}}/> Photos
          </div>
        </label>
        <FilesOut/>
    </form>
    

  );
};

export default EditMatch;