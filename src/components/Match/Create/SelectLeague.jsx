import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowLeft, KeyboardArrowRight}  from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';



const useStyles = makeStyles ((theme) => ({
    buttonRound:{
        borderRadius:"25px",
        backgroundColor:theme.palette.primary.main,
        "&:hover":{
            backgroundColor:theme.palette.primary.dark,
        }
    },
    button:{
        borderRadius:"5px",
        fontSize:"1.2rem",
        [theme.breakpoints.down('sm')]:{
            fontSize:"0.9rem",
        },
    },
    title: {
        margin:"2rem auto 0rem auto",
        fontWeight:"bolder",
        fontSize:"1.8rem",
        [theme.breakpoints.down('sm')]:{
            fontSize:"1.2rem",
            margin:"0rem auto",
        },
        alignSelf:"bottom",
        filter: "drop-shadow(3px 5px 2px rgba(0,0,0,0.35))",
        "-webkit-filter": "drop-shadow(3px 5px 2px rgba(0,0,0,0.35))",
        "-moz-filter": "drop-shadow(3px 5px 2px rgba(0,0,0,0.35))",
      },
      img: {
        margin:"auto",
        maxWidth: '100%',
        maxHeight: '50%',
        paddingBottom:"1rem",
        filter: "drop-shadow(3px 5px 3px rgba(0,0,0,0.35))",
        "-webkit-filter": "drop-shadow(3px 5px 3px rgba(0,0,0,0.35))",
        "-moz-filter": "drop-shadow(3px 5px 3px rgba(0,0,0,0.35))",
      },
  }));


const SelectLeague = (props) => {

    let classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.data.length;

    console.log(props);
    const handleNext = () => {
        props.setSelected(activeStep===maxSteps-1 ? props.data[0] : props.data[activeStep + 1]);
        setActiveStep((activeStep) => activeStep===maxSteps-1 ? 0 : activeStep + 1);
    };

    const handleBack = () => {
        console.log(props.data[activeStep-1]);
        props.setSelected(props.data[activeStep-1]);
        setActiveStep((activeStep) => activeStep===0 ? maxSteps-1 :  activeStep - 1);
    };

    const handleStepChange = (step) => {
        props.setSelected(props.data[step]);
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={3}>
                            <IconButton variant="contained" size="small" onClick={handleBack} className={classes.buttonRound}>
                                    <KeyboardArrowLeft />         
                            </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
                                    {props.data.map(item => (
                                            <img key={item.AF_ID_team} className={classes.img} src={item.logo} alt={"Competition or team"} />
                                    ))}
                            </SwipeableViews>
                    </Grid>
                    <Grid item xs={3}>
                            <IconButton variant="contained" size="small" onClick={handleNext} className={classes.buttonRound}>
                                    <KeyboardArrowRight /> 
                            </IconButton>
                    </Grid> 
            </Grid>
            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
                    {props.data.map(item => (
                            <Typography className={classes.title}>{props.data[activeStep].name}</Typography>
                    ))}
            </SwipeableViews>
        </div>
    );
};
export default SelectLeague;



