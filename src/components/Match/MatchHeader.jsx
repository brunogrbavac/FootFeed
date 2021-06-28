import React from 'react';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper:{
        padding:"1rem 2rem 2rem 2rem",
        marginTop:"5rem",
        [theme.breakpoints.between('sm','lg')]:{
            padding:"2rem 3rem 3rem 3rem",
        },
        [theme.breakpoints.between('lg','xl')]:{
            padding:"3.75rem 3rem 3rem 3rem",
        },
        [theme.breakpoints.up('xl')]:{
            padding:"4.25rem 3rem 3rem 3rem",
        }
    },
    teamName:{
        fontSize:"0.7rem",
        padding: theme.spacing(1)+"px 0px "+theme.spacing(1)+"px 0px",
        [theme.breakpoints.between('sm','lg')]:{
            fontSize: "1.5rem",
            padding: theme.spacing(3)+"px 0px "+theme.spacing(3)+"px 0px",
        },
        [theme.breakpoints.between('lg','xl')]:{
            fontSize: "2.2rem",
            padding: theme.spacing(4)+"px 0px "+theme.spacing(4)+"px 0px",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize: "2.8rem",
            padding: theme.spacing(4)+"px 0px "+theme.spacing(4)+"px 0px",
        }
    },
    result:{
        alignSelf:"center",
    },
    resultText:{
        fontSize:"2rem",
        [theme.breakpoints.between('sm','lg')]:{
            fontSize: "3.5rem",
        },
        [theme.breakpoints.between('lg','xl')]:{
            fontSize: "4rem",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize: "4.5rem",
        }
    },
    infoText:{
        fontSize:"0.5rem",
        [theme.breakpoints.between('sm','md')]:{
            fontSize: "1rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            fontSize: "1.2rem",
            margin:" 0.1rem 0",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize: "1.3rem",
            margin:" 0.2rem 0",

        }
    },
    divider:{
        margin:"0.5rem 0",
        [theme.breakpoints.between('sm','md')]:{
            margin:"0.8rem 0",
        },
        [theme.breakpoints.between('md','xl')]:{
            margin:"1rem 0",
        },
        [theme.breakpoints.up('xl')]:{
            margin:"1.5rem 0",
        }
    },
}));

//----------------------------------------------------------------------------------- Header koji ostaje fixan za sve tabove - rezultat, timovi, datum, stadion ...

const MatchHeader = (props) => {

    const classes = useStyles();
    console.log(props);

    return(
        <Paper elevation={3} className={classes.paper}>
                <Grid container direction="row" justify="center" alignItems="flex-start" style={{paddingTop:"2rem"}}>
                         <Grid item xs={4}>
                                <img src={props.home_team.logo} style={{width:"50%"}} alt="Home team logo"/>
                                <Typography variant="h3" className={classes.teamName} > {props.home_team.name} </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.result}>
                                <Typography variant="h3" className={classes.resultText} >{props.result}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                                <img src={props.guest_team.logo} style={{width:"50%"}} alt="Home team logo"/>
                                <Typography variant="h3" className={classes.teamName} > {props.guest_team.name} </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.infoText}>
                                <Divider className={classes.divider}/>                          
                                <Typography className={classes.infoText} > {props.date_time} </Typography>
                        </Grid>
                        <Grid item xs={12} >
                                <Typography  className={classes.infoText} > {props.stadium} </Typography>  
                        </Grid>
                        <Grid item xs={12} className={classes.infoText}>
                                <Typography className={classes.infoText}> {props.competition.name} </Typography>      
                                <Divider className={classes.divider}/>                          
                        </Grid> 
                        <React.Fragment>
                                {props.children}
                        </React.Fragment>
                </Grid>
        </Paper>

    );

};

export default MatchHeader;