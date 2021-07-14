import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import offside from '../../../images/added.png';
import added from '../../../images/added.png';
import kit from '../../../images/kit.png';
import field from '../../../images/field.png';
import fulltime from '../../../images/fulltime.png';
import halftime from '../../../images/halftime.png';
import red from '../../../images/red.png';
import score from '../../../images/score.png';
import shoe from '../../../images/shoe.png';
import substitution from '../../../images/substitution.png';
import target from '../../../images/target.png';
// import trophy from '../../images/trophy.png';
import whistle from '../../../images/whistle.png';
import yellow from '../../../images/yellow.png';
import FootyFeedIconNoFF from '../../../images/FootyFeedIconNoFF.ico';

const useStyles = makeStyles((theme) => ({
    eventButton:{
      width:"100%", 
      height:"4em", 
      fontSize:"0.9rem",
    },
    eventIcon:{
      height:"1.5rem",
      verticalAlign:"middle",

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


const EventButtonGrid = (props) => {

    const classes = useStyles();

    const EventButton = (props2) => {    
        let icon;
    
        if( ["Goal"].includes(props2.eventType)){ icon = FootyFeedIconNoFF;}
        else if( ["Offside"].includes(props2.eventType)){ icon = offside; }
        else if( ["Duel","Dribling","Tackle"].includes(props2.eventType)){ icon = kit; }
        else if( [].includes(props2.eventType)){ icon = field; }
        else if( ["Second half"].includes(props2.eventType)){ icon = fulltime; }
        else if( ["Halftime"].includes(props2.eventType)){ icon = halftime; }
        else if( ["Red card"].includes(props2.eventType)){ icon = red; }
        else if( ["End"].includes(props2.eventType)){ icon = score; }
        else if( ["Substitution"].includes(props2.eventType)){ icon = substitution; }
        else if( ["Save","Shot off target", "Shot blocked"].includes(props2.eventType)){ icon = target; }
        // else if( [].includes(props2.eventType)){ icon = trophy; }
        else if( ["Corner","Warning","Penalty", "Free kick"].includes(props2.eventType)){ icon = whistle; }
        else if( ["Added time"].includes(props2.eventType)){ icon = added; }
        else if( ["Yellow card"].includes(props2.eventType)){ icon = yellow; }
        else{icon = shoe};
    
        return(
            <Grid item xs={10} sm={5} lg={3}>
                <Button variant="contained" color="secondary" className={classes.eventButton} onClick={()=> { props.setEventType(props2.eventType); props.setChecks(props2.checks); props.setTwoActers(props2.twoActers); props2.handleNext()}}>
                    <Grid  container direction="row" justify="center" alignItems="center" >
                        <Grid item xs={3}>
                                <img src={icon} alt="Event type" className={classes.eventIcon}/>
                        </Grid>
                        <Grid item xs={9} className={classes.buttonText} >
                                {props2.eventType}
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        );
    };
    

    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={3} className={classes.step} >
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Goal"  handleNext={props.handleNext} checks={["Outside the box", "Big chance"]} twoActers={false}/>
                        <EventButton eventType="Save" handleNext={props.handleNext} checks={["Outside the box", "Big chance"]} twoActers={true}/>
                        <EventButton eventType="Shot off target" handleNext={props.handleNext} checks={["Outside the box", "Big chance"]} twoActers={false}/>
                        <EventButton eventType="Shot blocked" handleNext={props.handleNext} checks={["Outside the box", "Big chance"]} twoActers={true}/>
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Substitution" handleNext={props.handleNext} checks={[]} twoActers={true}/>
                        <EventButton eventType="Added time" handleNext={props.handleNext} checks={[]} twoActers={false}/>
                        <EventButton eventType="Offside" handleNext={props.handleNext} checks={[]} twoActers={false}/>
                        <EventButton eventType="Corner" handleNext={props.handleNext} checks={[]} twoActers={false}/>
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Warning" handleNext={props.handleNext} checks={[]} twoActers={true}/>
                        <EventButton eventType="Red card" handleNext={props.handleNext} checks={[]} twoActers={true}/>
                        <EventButton eventType="Yellow card" handleNext={props.handleNext} checks={[]} twoActers={true}/>
                        <EventButton eventType="Duel" handleNext={props.handleNext} checks={['In air']} twoActers={true}/>
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Dribling" handleNext={props.handleNext} checks={[]} twoActers={true}/>
                        <EventButton eventType="Clearance" handleNext={props.handleNext} checks={[]} twoActers={false}/>
                        <EventButton eventType="Tackle" handleNext={props.handleNext} checks={[]} twoActers={false}/> {/*samo uspješni*/}
                        <EventButton eventType="Penalty"  handleNext={props.handleNext} checks={["Scored"]} twoActers={true}/>
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Free kick"  handleNext={props.handleNext} checks={["Scored"]} twoActers={true}/>
                        <EventButton eventType="Succesfull pass" handleNext={props.handleNext} checks={["Cross", "Long"]} twoActers={false}/>
                        <EventButton eventType="Intercepted pass" handleNext={props.handleNext} checks={["Cross", "Long"]} twoActers={false}/>
                        <EventButton eventType="Missed pass" handleNext={props.handleNext} checks={["Cross", "Long"]} twoActers={false}/>
                </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                        <EventButton eventType="Halftime"  handleNext={props.handleNext} checks={[]} twoActers={false}/>
                        <EventButton eventType="Second half"  handleNext={props.handleNext} checks={[]} twoActers={false}/>
                        <EventButton eventType="End" handleNext={props.handleNext} checks={[]} twoActers={false}/>
                </Grid>
        </Grid> 
    );
};

export default EventButtonGrid;

