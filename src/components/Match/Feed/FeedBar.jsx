import React, { Fragment } from 'react';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import offside from '../../../images/offside.png';
import kit from '../../../images/kit.png';
import field from '../../../images/field.png';
import fulltime from '../../../images/fulltime.png';
import halftime from '../../../images/halftime.png';
import red from '../../../images/red.png';
import score from '../../../images/score.png';
import shoe from '../../../images/shoe.png';
import substitution from '../../../images/substitution.png';
import target from '../../../images/target.png';
import trophy from '../../../images/trophy.png';
import whistle from '../../../images/whistle.png';
import yellow from '../../../images/yellow.png';
import added from '../../../images/offside.png';
import FootyFeedIconNoFF from '../../../images/FootyFeedIconNoFF.ico';
import clsx from  'clsx';


const useStyles = makeStyles((theme)=>({
    home:{

        borderColor:theme.palette.divider,
        borderTop: "0.05px solid",
        background: "linear-gradient(115deg, rgba(0,150,136,0.6951155462184874) 0%, rgba(255,255,255,0) 20%)",
        borderRadius:"5px"
    },
    away:{
        borderColor: theme.palette.divider,
        borderTop: "0.05px solid",
        background: "linear-gradient(63deg, rgba(255,255,255,0) 80%, rgba(255,97,34,0.8911939775910365) 100%)",
        alignItems:"right",
        borderRadius:"5px"
    },
    awayText:{
        textAlign:"right",
    },
    awayTextBold:{
        textAlign:"right",
        paddingRight:"0.1rem",
        [theme.breakpoints.between('sm','md')]:{
            paddingRight:"0.2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            paddingRight:"0.3rem", 
        },
        [theme.breakpoints.up('xl')]:{
            paddingRight:"0.5rem",
        }    },
    homeText:{
        paddingLeft:"0.1rem",
        [theme.breakpoints.between('sm','md')]:{
            paddingLeft:"0.2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            paddingLeft:"0.3rem", 
        },
        [theme.breakpoints.up('xl')]:{
            paddingLeft:"0.5rem",
        }
    },
    text:{
        padding:"0.2rem",
        fontSize:"0.8rem",
        fontWeight:"100",
        [theme.breakpoints.between('sm','md')]:{
          fontSize:"1rem",
          padding:"0.3rem",
        },
        [theme.breakpoints.between('md','xl')]:{
          fontSize:"1.2rem",
          padding:"0.4rem",
        },
        [theme.breakpoints.up('xl')]:{
          fontSize:"1.4rem",
          padding:"0.6rem",
        }    
    },
    boldText:{
        fontWeight:"bolder",
    },
    icon:{
        height:"1.3rem",
        padding:"0.4rem 1rem 0.4rem 0.4rem",
        [theme.breakpoints.between('sm','md')]:{
            height:"1.75rem",
            padding:"0.5rem 1.3 rem 0.5rem 0.5rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"2.3rem ",
            padding:"0.6rem 1.6rem 0.6rem 0.6rem",        
        },
        [theme.breakpoints.up('xl')]:{
            height:"2.85rem",
            padding:"0.75rem 1.8rem 0.75rem 0.75rem",        
        }
    },
    iconLeft:{
        height:"1.3rem",
        padding:"0.4rem 0.4rem 0.4rem 1rem",
        [theme.breakpoints.between('sm','md')]:{
            height:"1.75rem",
            padding:"0.5rem 0.5rem 0.5rem 1.3rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"2.3rem ",
            padding:"0.6rem 0.6rem 0.6rem 1.6rem",        
        },
        [theme.breakpoints.up('xl')]:{
            height:"2.85rem",
            padding:"0.75rem 0.75rem 0.75rem  1.8rem",        
        }
    },
}));

//----------------------------------------------------------------------------------- Ovisno o postotku rendera Zelenu ili Narančastu letvicu => za domaćina lijevo za gosta u desno (rotirana)

const getIcon = (type) =>{
    let icon;

    if( type.includes("Goal")){ icon = FootyFeedIconNoFF;}
    else if( ["Offside "].includes(type)){ icon = offside; }
    else if( ["Duel ", "Duel In air","Dribling","Tackle"].includes(type)){ icon = kit; }
    else if( [].includes(type)){ icon = field; }
    else if( ["Second half "].includes(type)){ icon = fulltime; }
    else if( ["Halftime "].includes(type)){ icon = halftime; }
    else if( type==="Red card "){ icon = red; }
    else if( ["End"].includes(type)){ icon = score; }
    else if( ["Substitution"].includes(type)){ icon = substitution; }
    else if( ["Save","Save Outside the box","Save  Big chance","Save Outside the box Big chance","Shot off target","Shot off target Outside the box","Shot off target Big chance","Shot off target Outside the box Big chance", "Shot blocked","Shot blocked Outside the box","Shot blocked Big chance","Shot blocked Outside the box Big chance"].includes(type)){ icon = target; }
    // else if( [].includes(props2.eventType)){ icon = trophy; }
    else if( ["Corner ","Warning ","Penalty ", "Free kick "].includes(type)){ icon = whistle; }
    else if( ["Added time "].includes(type)){ icon = added; }
    else if( ["Yellow card "].includes(type)){ icon = yellow; }
    else{icon = shoe};
    console.log(JSON.stringify(type));
    return icon;
};
    

const FeedBar = (props) => {

    const classes = useStyles();

    return (
        <Fragment>
            {props.event.home_team?
                    <ListItem className={classes.home}>
                            <img src={getIcon(props.event.type)} className={classes.icon} alt="TypeIcon"/>
                            <span className={clsx(classes.text,classes.boldText,classes.homeText)}>{props.event.time} </span>
                            <span className={clsx(classes.text,classes.boldText,classes.homeText)} style={{marginRight:"1.5rem"}}>{props.event.players[0]?props.event.players[0].surname:props.event.type} </span>
                        <ListItemText className={classes.homeText}>

                            <span className={clsx(classes.text,classes.homeText)}>{props.event.article} </span>
                        </ListItemText>
                    </ListItem>
                    :<ListItem className={classes.away}>
                        <ListItemText className={classes.awayText}>
                            <span className={clsx(classes.text,classes.awayText)}>{props.event.article} </span>


                        </ListItemText >                    
                        <span className={clsx(classes.text,classes.boldText,classes.awayTextBold,classes.bold)} style={{marginLeft:"1.5rem"}}>{props.event.players[0]?props.event.players[0].surname:props.event.type} </span>
                            <span className={clsx(classes.text,classes.boldText,classes.awayTextBold,classes.bold)}>{props.event.time}  </span>   
                            <img src={getIcon(props.event.type)} className={clsx(classes.icon, classes.iconLeft)}  alt="kit"/>
                    </ListItem>
            }
        </Fragment>
    );
};

export default FeedBar;


// event_id: events[i].event_id,
// type: events[i].type,
// time: events[i].time,
// match_id: matchId,
// players: players,
// article: events[i].article,