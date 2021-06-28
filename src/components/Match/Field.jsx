import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar} from '@material-ui/core';
import field from '../../images/field.png';
import clsx from 'clsx';

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
            margin:" 2rem auto 2rem auto",
        },
          [theme.breakpoints.between('lg','xl')]:{
            width:"56vw",
            height:"40vw",
            margin:" 3rem auto 4rem auto",
        },
        [theme.breakpoints.up('xl')]:{
            width:"63rem",
            height:"45rem",
            margin:" 5rem auto 5rem auto",
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
        marginTop:"0.1rem",
        textAlign:"center",
        fontWeight:"bolder",
        fontSize:"0.6rem",
        marginBottom:"0",
        [theme.breakpoints.between('sm','md')]:{
            marginTop:"0.2rem",
            fontSize:"1rem"
          },
          [theme.breakpoints.between('md','xl')]:{
            marginTop:"0.35rem",
            fontSize:"1.2rem"
          },
          [theme.breakpoints.up('xl')]:{
            marginTop:"0.5rem",
            fontSize:"1.35rem"
        }
    },
    avatarBox:{
        // margin:"0.5rem 0",
        "&:hover":{
            transform:"scale(1.2, 1.2)",
            cursor:"pointer",
            transition: "0.3s",
        }
    }
}));


const Player = (props) => {
    const classes = useStyles();

    return(
            <Grid item xs={12} className={classes.avatarBox} onClick>
                <Avatar color="secondary" className={clsx(classes.avatar,props.away?classes.away:classes.home)}>{props.number}</Avatar>
                <p className={classes.nameText}>{props.name}</p>
            </Grid>
    );
};


const Field = (props) => {

    const classes = useStyles();

    const smallScreen = window.innerWidth<900?true:false;
    return (
        <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.field}>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" >
                    <Player number={1} name={"Pkro"}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player number={2} name={"Pkro"}/>
                    <Player number={3} name={"Pkro"}/>
                    <Player number={4} name={"Pkro"}/>
                    <Player number={5} name={"Pkro"}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player number={2} name={"Pkro"}/>
                    <Player number={3} name={"Pkro"}/>
                    <Player number={4} name={"Pkro"}/>
                    <Player number={5} name={"Pkro"}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player number={11} name={"Pkro"}/>
                    <Player number={10} name={"Pkro"}/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player number={11} name={"Pkro"} away/>
                    <Player number={10} name={"Pkro"} away/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player number={9} name={"Pkro"} away/>
                    <Player number={8} name={"Pkro"} away/>
                    <Player number={7} name={"Pkro"} away/>
                    <Player number={6} name={"Pkro"} away/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center" spacing={smallScreen?1:5}>
                    <Player number={2} name={"Pkro"} away/>
                    <Player number={3} name={"Pkro"} away/>
                    <Player number={4} name={"Pkro"} away/>
                    <Player number={5} name={"Pkro"} away/>
                </Grid>
                <Grid item container xs={1} direction="column" justify="center" alignItems="center">
                    <Player number={1} name={"Pkro"} away/>
                </Grid>
            </Grid>
    );
};

export default Field;

