import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import kit from '../../images/kit.png';
import offside from '../../images/offside.png';
import red from '../../images/red.png';
import whistle from '../../images/whistle.png';

const useStyles = makeStyles((theme) => ({
    eventButton:{
      width:"100%", 
      height:"4em", 
      fontSize:"0.9rem",
    },
    eventIcon:{
      height:"1.5rem",
    },
    step:{
      margin:"2rem 0 2rem 0",
      [theme.breakpoints.between('sm','md')]:{
          margin:"3rem 0 3rem 0",
      },
      [theme.breakpoints.between('md','xl')]:{
          margin:"4rem 0 4rem 0",
      },
      [theme.breakpoints.up('xl')]:{
          margin:"5rem 0 5rem 0",
      }
    },
    buttonText:{
        padding:"2rem 2rem 2rem 0"
    }
}));


const EventButton = (props) => {
    const classes = useStyles();

    let icon;

    if( ["Prekršaj","Korner", "Opomena", "Prekid"].includes(props.eventType)) icon = whistle;
    else if( ["Offside"].includes(props.eventType)) icon = offside;
    else if( ["Crveni","Žuti"].includes(props.eventType)) icon = red;
    else if( ["Uspješo dodavanje","Presječeno dodavanje","Promašeno dodavanje", "Ubačaj", "Gol", "Obrana", "Udarac van gola", "Blokiran udarac", "Dribling", "Duel","Uspješan start","Presječena lopta", "Čišćenje" ].includes(props.eventType)) icon = kit;

    return(
        <Grid item xs={10} sm={5} lg={3}>
            <Button variant="contained" color="secondary" className={classes.eventButton} onClick={()=>props.handleNext()}>
                <Grid  container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={3}>
                            <img src={icon} alt="Tip događaja" className={classes.eventIcon}/>
                    </Grid>
                    <Grid item xs={9} className={classes.buttonText} >
                            {props.eventType}
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    );
};


const EventButtonGrid = (props) => {

    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={3} className={classes.step} >
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Gol" handleNext={props.handleNext}/>
                        <EventButton eventType="Obrana" handleNext={props.handleNext}/>
                        <EventButton eventType="Udarac van gola" handleNext={props.handleNext}/>
                        <EventButton eventType="Blokiran udarac" handleNext={props.handleNext}/>
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Prekršaj" handleNext={props.handleNext} />
                        <EventButton eventType="Korner" handleNext={props.handleNext} />
                        <EventButton eventType="Opomena" handleNext={props.handleNext} />
                        <EventButton eventType="Prekid" handleNext={props.handleNext} />
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Offside" handleNext={props.handleNext} /> 
                        <EventButton eventType="Crveni" handleNext={props.handleNext} />
                        <EventButton eventType="Žuti" handleNext={props.handleNext} />
                        <EventButton eventType="Duel" handleNext={props.handleNext} />
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Dribling" handleNext={props.handleNext} />
                        <EventButton eventType="Čišćenje" handleNext={props.handleNext} />
                        <EventButton eventType="Uspješan start" handleNext={props.handleNext} />
                        <EventButton eventType="Presječena lopta" handleNext={props.handleNext} />
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Uspješo dodavanje" handleNext={props.handleNext} />
                        <EventButton eventType="Presječeno dodavanje" handleNext={props.handleNext} />
                        <EventButton eventType="Promašeno dodavanje" handleNext={props.handleNext} />
                        <EventButton eventType="Ubačaj" handleNext={props.handleNext} />
                </Grid>
        </Grid> 
    );
};

export default EventButtonGrid;

