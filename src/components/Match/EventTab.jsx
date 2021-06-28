import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import EventButtonGrid from './EventButtonGrid';
import { ArrowBackOutlined } from '@material-ui/icons';
import Field from './Field';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        width:"100%"
    },
    image:{
        transform:"scale(1, 1)",
        transition: "0.3s",
        padding:"3rem",
        "&:hover": {
            transform:"scale(1.2, 1.2)",
        },
        height:"4rem", 
        [theme.breakpoints.between('sm','md')]:{
            height:"6rem",  
            padding:"3.7rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"8rem", 
            padding:"4.2rem",
        },
        [theme.breakpoints.up('xl')]:{
            height:"10rem", 
            padding:"5rem",
        }
    },
    selected:{
        transform:"scale(1.2, 1.2)",
    },
    notSelected:{
        filter:"grayscale(1)",
    },
    step2:{
        margin:"1rem 0 3rem 0",
        [theme.breakpoints.between('sm','md')]:{
            margin:"2rem 0 4rem 0",
        },
        [theme.breakpoints.between('md','xl')]:{
            margin:"3rem 0 5rem 0",
        },
        [theme.breakpoints.up('xl')]:{
            margin:"5rem 0 6rem 0",
        }  
        },
    pickTeam:{
        borderRadius:"5px",
        width:"100%", 
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"space-around", 
        background: "linear-gradient(125deg, rgba(255,87,34,1) 0%, rgba(0,150,136,1)  95%)",
    },
    stepper:{
        width:"90%", 
        alignItems:"center",
        margin:"auto",
    },
    versus:{
        color:"white",
        fontWeight:"bolder",
        alignSelf:"center",
        fontSize:"1.5rem",
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            fontSize:"2.5rem",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize:"3rem",
        }
    },
}));


// const HTTPRoster = ( props ) => {

// };

const EventTab = (props) => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
//   const [eventType, setEventType] = useState(()=>"");
  const [home, setHome] = useState(()=>null);
//   const [acters, setActers] = useState(()=>[null,null]);
//   const [details, setDetails] = useState(()=>{});
  const steps = ['Pick event type', 'Pick team', 'Pick the acters', 'Edit before publishing'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const GetStepContent = () => {

    switch (activeStep) {
    case 0:
        return (
            <EventButtonGrid handleNext={handleNext}/>
        );
    case 1:
        return (                
            <div className={clsx(classes.pickTeam,classes.step2)}>
                <Button>
                    <img src={props.home_team.logo} onClick={()=>{(home===true)?setHome(null):setHome(true);handleNext();}} alt="Home team" className={clsx(classes.image,home&&classes.selected,(!home&&home!==null)&&classes.notSelected)} />
                </Button>
                <Typography variant="h3" className={classes.versus}>VS</Typography>
                <Button>
                    <img src={props.guest_team.logo} onClick={()=>{(home===false)?setHome(null):setHome(false);handleNext();}} alt="Away team" className={clsx(classes.image,home&&classes.notSelected,(!home&&home!==null)&&classes.selected)} />
                </Button>
            </div>      
        );
    case 2:
        return (
            <Field/>
        );
    default:
      return 'Nothing.';
  }
};

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>

      <div>
          <div className={classes.stepper}>
            <GetStepContent/>
                <div>
                <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleBack} className={classes.backButton} startIcon={<ArrowBackOutlined/>}>
                    Back
                </Button>
                {(activeStep === steps.length - 1) && <Button variant="contained" color="primary" onClick={handleNext}>
                     'Finish'
                </Button>}
            </div>
          </div>
      </div>
    </div>
  );
};

export default EventTab;