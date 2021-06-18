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

    return(
        <Paper elevation={3} className={classes.paper}>
                <Grid container direction="row" justify="center" alignItems="flex-start" style={{paddingTop:"2rem"}}>
                        <Grid item xs={4}>
                                <img src={'https://media.api-sports.io/football/teams/608.png'} style={{width:"50%"}} alt="Home team logo"/>
                                <Typography variant="h3" className={classes.teamName} >HNK Hajduk Split</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.result}>
                                <Typography variant="h3" className={classes.resultText} >0-0</Typography>
                        </Grid>
                        <Grid item xs={4}>
                                <img src={'https://media.api-sports.io/football/teams/620.png'} style={{width:"50%"}} alt="Home team logo"/>
                                <Typography variant="h3" className={classes.teamName} > GNK Dinamo</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.infoText}>
                                <Divider className={classes.divider}/>                          
                                <Typography className={classes.infoText} >{"19:30     29. Veljače 2024."}</Typography>
                        </Grid>
                        <Grid item xs={12} >
                                <Typography  className={classes.infoText} >Stadion Poljud - Split, Croatia</Typography>  
                        </Grid>
                        <Grid item xs={12} className={classes.infoText}>
                                <Typography className={classes.infoText}>Prva HNL</Typography>      
                                <Divider className={classes.divider}/>                          
                        </Grid>
                        {props.children}
                </Grid>
        </Paper>

    );
};

export default MatchHeader;