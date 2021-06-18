import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StatsBar from './StatsBar';

const useStyles = makeStyles((theme)=>({
    stat:{
        fontSize:"0.6rem",
        margin:"0.5rem 0",
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"0.7rem",
            margin:"1rem 0",
        },
        [theme.breakpoints.between('md','xl')]:{
            fontSize:"0.85rem",
            margin:"1rem 0",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize:"1rem",
            margin:"1.2rem 0",
        }
    },
}));
//----------------------------------------------------------------------------------- Komponenta koja uzima 2 vrijednosti i za poziva StatsBar (bar chart) komponentu

const Stat = (props) => {

    const classes = useStyles();

    return(
        <Grid item container direction="row" justify="center" alignItems="center" xs={12} className={classes.stat}>
            <Grid item container direction="row" justify="center" alignItems="center" xs={4} md={5}>
                    <Grid item xs={3}>
                        {props.home}
                    </Grid>
                    <Grid item xs={9}>
                            <StatsBar value={(props.home/(props.home+props.guest))*100} left={true} />
                    </Grid>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center" xs={4} md={2}>
                {props.name}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="center" xs={4} md={5}>
                    <Grid item xs={9}>
                            <StatsBar value={(props.guest/(props.home+props.guest))*100} />
                    </Grid>                                    
                    <Grid item xs={3}>
                        {props.guest}
                    </Grid>
            </Grid>
        </Grid>
    );
};

export default Stat;