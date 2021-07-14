import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Button} from '@material-ui/core';
import field from '../../../images/field.png';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    field:{
        margin:" 2rem auto 2rem auto",
        width:"70vw",
        height:"50vw",
        backgroundImage:"url("+field+")",
        backgroundSize: "cover",
        [theme.breakpoints.between('sm','lg')]:{
            width:"77vw",
            height:"55vw",
            margin:"3rem auto 2rem auto",
        },
          [theme.breakpoints.between('lg','xl')]:{
            width:"56vw",
            height:"40vw",
            margin:"5rem auto 4rem auto",
        },
        [theme.breakpoints.up('xl')]:{
            width:"63rem",
            height:"45rem",
            margin:"8rem auto 5rem auto",
        }
    },
    avatar:{
        alignSelf: "center",
        height: "1rem",
        width:"1rem",
        fontWeight: "bolder",
        border: "white 2px solid",
        color: "white",
        fontSize:"0.7rem",
        [theme.breakpoints.between('sm','md')]:{
            height: "2rem",
            width:"2rem",
            fontSize:"1rem"
          },
          [theme.breakpoints.between('md','xl')]:{
            height: "2.5rem",
            width:"2.5rem",
            fontSize:"1.4rem"
          },
          [theme.breakpoints.up('xl')]:{
            height: "3rem",
            width:"3rem",
            fontSize:"1.5rem"
        }
    },
    home:{
        background: "linear-gradient(40deg, rgba(255,87,34,1) 0%, rgba(0,150,136,1)  50%)",
    },
    away:{
        background: "linear-gradient(40deg, rgba(0,150,136,1) 0%, rgba(255,87,34,1)  50%)",
    },
    nameText:{
        fontWeight:"500",
        marginTop:"0.1rem",
        color:"black",
        fontSize:"0.6rem",
        marginBottom:"0",
        [theme.breakpoints.between('sm','md')]:{
            marginTop:"0.2rem",
            fontSize:"0.85rem"
          },
          [theme.breakpoints.between('md','xl')]:{
            marginTop:"0.35rem",
            fontSize:"1rem"
          },
          [theme.breakpoints.up('xl')]:{
            marginTop:"0.5rem",
            fontSize:"1.1rem"
        }
    },
    avatarBox:{
        // margin:"0.5rem 0",
        "&:hover":{
            transform:"scale(1.2, 1.2)",
            cursor:"pointer",
            transition: "0.3s",
        }
    },
    selected:{
        // margin:"0.5rem 0",
            fontWeight:"bold",
            transform:"scale(1.2, 1.2)",
            filter:"grayscale(0) !important",
    },
    disabled:{
        filter:"grayscale(1)",
    },
    subButton:{
        borderRadius:"5px",
        width:"80%",
        justifyContent:"left",
        paddingLeft:"20px",
        paddingRight:"40px",
        textTransform: "none !important",
        backgroundColor:theme.palette.grey[700],
        margin:"5px",
        "&:hover":{
            backgroundColor:theme.palette.grey[800],
        }
    },
    subButtonLight:{
        backgroundColor:theme.palette.grey[300],
        "&:hover":{
            backgroundColor:theme.palette.grey[400],
        }
    },
    subText:{
        fontSize:"0.6rem",
        fontWeight: "400",
        paddingRight:"12px",
        color: theme.palette.text.primary,
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"0.9rem"
          },
          [theme.breakpoints.between('md','xl')]:{
            fontSize:"1rem"
          },
          [theme.breakpoints.up('xl')]:{
            fontSize:"1.1rem"
        }
    },
    bolder:{
        fontWeight:"bolder",
    },
    subAvatar:{
        marginRight:"1rem",
        height: "0.9rem",
        width:"0.9rem",
        fontWeight: "bolder",
        border: "white 2px solid",
        color: "white",
        fontSize:"0.6rem",
        [theme.breakpoints.between('sm','md')]:{
            height: "1.5rem",
            width:"1.5rem",
            fontSize:"0.75rem"
          },
          [theme.breakpoints.between('md','xl')]:{
            height: "1.8rem",
            width:"1.8rem",
            fontSize:"0.9rem"
          },
          [theme.breakpoints.up('xl')]:{
            height: "2rem",
            width:"2rem",
            fontSize:"1rem"
        }
    },
    subContainer:{
        marginBottom:"85px"
    }

}));



const Field = (props) => {

    const [counter, setCounter] = useState(() => props.twoActers ? 2 : 1);
    const [currentTeam, setCurrentTeam] = useState(()=> props.homeTeam); 
    const [acters,setActers] = useState(()=>props.acters);
    const referee = (props.eventType==="Added time" || props.eventType==="End" || props.eventType==="Halftime" || props.eventType==="Second half");

    const darkMode = useSelector( (store) => store.darkMode );

    const smallScreen = window.innerWidth<900 ? true : false;
    const classes = useStyles();

    const Player = (props2) => {

        const notDisabled =  (props2.home===currentTeam && !referee && !(props.eventType==="Substitution" &&  counter===2 ) && props2.player.disabled!==true);
        return(
                <Grid item xs={12} 
                    className={clsx(
                        acters.includes(props2.player) && classes.selected,  
                        notDisabled ? classes.avatarBox : classes.disabled,
                    )} 
                    onClick={()=>{
                        if(notDisabled){
                            if(counter===2){
                                setActers([props2.player,props.acters[1]]);
                                setCounter(1);
                                setCurrentTeam(!currentTeam);
                            }
                            else { 
                                if(props.twoActers){ props.setActers([acters[0], props2.player]);props.handleNext([acters[0], props2.player]);}
                                else { props.setActers([ props2.player, acters[1] ]);props.handleNext([ props2.player, acters[1] ]);};
                                
                            };      
                        }

                }}>
                    <Avatar color="secondary" className={clsx(classes.avatar,props2.home?classes.home:classes.away)}>{props2.player.number}</Avatar>
                    <p className={classes.nameText}>{props2.player.surname}</p>
                </Grid>
        );
    };

    const Substitute = (props2) => {
        const classes = useStyles();
        return(
            <Button variant="contained" 
                className = {clsx(
                    ((props.eventType!=="Substitution")||(props.homeTeam!==props2.home)||counter!==2||props2.player.disabled===true) && classes.disabled ,
                    classes.subButton,
                    !darkMode && classes.subButtonLight,
                    acters.includes(props2.player) && classes.selected)
                   }
                disabled = {
                    (props.eventType!=="Substitution")
                    ||(props.homeTeam!==props2.home)
                    ||counter!==2
                    ||props2.player.disabled===true}
                onClick={()=>{
                    setActers([props2.player,props.acters[1]]);
                    setCounter(1);
                }}>
                <Avatar color="secondary" className={clsx(
                    classes.subAvatar,
                    props.home? classes.home: classes.away)}>
                        {props2.player.number}</Avatar>
                <span className={clsx(classes.bolder,classes.subText)}> {props2.player.position} </span>
                <span className={classes.subText}>{props2.player.name + " "+ props2.player.surname}</span>
            </Button>
        );
    };

    return (<React.Fragment>
        <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.field}>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" >
                    <Player player={props.home.firstXI[0]} home={true}  handleNext={props.handleNext}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player player={props.home.firstXI[1]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[2]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[3]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[4]} home={true} handleNext={props.handleNext}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player player={props.home.firstXI[5]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[6]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[7]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[8]} home={true} handleNext={props.handleNext}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player player={props.home.firstXI[9]} home={true} handleNext={props.handleNext}/>
                    <Player player={props.home.firstXI[10]} home={true} handleNext={props.handleNext}/>
                </Grid>



                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player player={props.guest.firstXI[10]} home={false} handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[9]} home={false} handleNext={props.handleNext}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player player={props.guest.firstXI[8]} home={false}  handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[7]} home={false} handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[6]} home={false} handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[5]} home={false} handleNext={props.handleNext}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player player={props.guest.firstXI[4]} home={false} handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[3]} home={false} handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[2]} home={false} handleNext={props.handleNext}/>
                    <Player player={props.guest.firstXI[1]} home={false} handleNext={props.handleNext}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center">
                    <Player player={props.guest.firstXI[0]} home={false} handleNext={props.handleNext}/>
                </Grid>
        </Grid>

        <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.subContainer}>
            <Grid item container xs={6} direction="column" justify="center" alignItems="center" >
                <Substitute player={props.home.firstXI[0]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[1]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[2]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[3]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[4]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[5]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[6]} home={true}  handleNext={props.handleNext} />
                <Substitute player={props.home.substitutes[7]} home={true}  handleNext={props.handleNext} />
            </Grid>
            <Grid item container xs={6} direction="column" justify="center" alignItems="center" >
                <Substitute player={props.guest.substitutes[0]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[1]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[2]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[3]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[4]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[5]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[6]} home={false}  handleNext={props.handleNext} />
                <Substitute player={props.guest.substitutes[7]} home={false}  handleNext={props.handleNext} />
            </Grid>
        </Grid>
</React.Fragment>

    );
};

export default Field;

