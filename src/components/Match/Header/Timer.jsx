import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    timer:{
        textAlign:"center",
        fontSize:"0.5rem",
        marginBottom:"1rem",
        [theme.breakpoints.between('sm','lg')]:{
            fontSize: "1rem",
            marginBottom:"1.2rem",
        },
        [theme.breakpoints.between('lg','xl')]:{
            fontSize: "1.3rem",
            marginBottom:"1.5rem",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize: "1.5rem",
            marginBottom:"1.8rem",
        }
    },
}));

function diffDates(a, b) {    

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()); // UTC itself never has DST. It is the constant frame of reference other time zones are expressed relative to.
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());

    
    const secondsTotal = Math.floor((utc2 - utc1) / 1000);
    const minutes = Math.floor(secondsTotal/60);
    const seconds = secondsTotal%60;
console.log(secondsTotal);
    return { minutes, seconds };
};

const Timer = (props) =>{ // JavaScript counts months from 0 to 11. January is 0. December is 11.
 
    const [time, setTime] = useState(()=>"");
    const classes = useStyles();

    useEffect(() => {
        setTimeout(() => {
            let dif = diffDates( new Date(props.date), new Date());
            dif.minutes>50?setTime('HALFTIME'):setTime(dif.minutes+':'+dif.seconds);
        }, 1000);
    });

    return (
        <span className={classes.timer}>{time}</span>
    );
};


export default Timer;


