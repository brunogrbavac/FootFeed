import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import caveman from '../images/caveman.gif';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

    div:{
        width:"100%",
        height:"95vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontWeight:"balder",
        justifyContent: "center",
    },
    caveman:{
        width:"70%",
        height:"auto"
    },
    text:{
        display: "inline", 
        fontWeight: "300"
    },
    textGreen:{
        display: "inline", 
        fontWeight:"500"
    }
    }))

//----------------------------------------------------------------------------------- Komponenta koja se prikaže kada zatražimo nepostojeću stranicu ili neki  drugi error

function Error(props) {

    const classes = useStyles();

    return (
            <div className={classes.div}>
                            <img src={caveman} alt={"Oops, even the 404 got 404ed..."} className={classes.caveman}></img>
                            <Typography variant="h1"  color="textPrimary" style={{fontWeight:"500"}}> { props.code!==undefined ? props.code:"404" } </Typography>
                            <Typography variant="h4" color="textPrimary" className={classes.text}> It looks like we had <Typography variant="h4" color="primary" className={classes.textGreen}> trouble </Typography>getting You what you wanted. </Typography>
                            <Typography variant="h4" color="textPrimary" className={classes.text}> But it is definetly <Typography variant="h4" color="primary" className={classes.textGreen}>not our fault</Typography>. </Typography>
                            <Typography variant="h4" color="textPrimary" className={classes.text}> Probably an just a Neanderthal that <Typography variant="h4" color="primary" className={classes.textGreen}>bit into our wires</Typography> ...  </Typography>
            </div>
    );
}

export default Error;

//Oops, Homo neanderthalensis on the loose ...