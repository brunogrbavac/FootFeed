import React, { Fragment } from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const BetterBar = withStyles((theme) => ({
    root: {
        height:3,
        [theme.breakpoints.between('sm','md')]:{
            height:6,
        },
        [theme.breakpoints.between('md','xl')]:{
            height:8,
        },
        [theme.breakpoints.up('xl')]:{
            height:10,
        },    
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700], 
    },
    bar: {
      backgroundColor: theme.palette.primary.main,
    },
}))(LinearProgress);

const WorseBar = withStyles((theme) => ({
    root: {
        height:3,
        [theme.breakpoints.between('sm','md')]:{
            height:5,
        },
        [theme.breakpoints.between('md','xl')]:{
            height:7,
        },
        [theme.breakpoints.up('xl')]:{
            height:10,
        },    
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700], 
    },
    bar: {
      backgroundColor: theme.palette.secondary.main,
    },
}))(LinearProgress);

//----------------------------------------------------------------------------------- Ovisno o postotku rendera Zelenu ili Narančastu letvicu => za domaćina lijevo za gosta u desno (rotirana)

const StatsBar = (props) => {
    return (
        <Fragment>
                {props.value<50?
                    <Fragment>
                    {props.left?
                            <WorseBar variant="determinate" value={props.value} style={{transform:"rotate(180deg)"}}/>
                            :<WorseBar variant="determinate" value={props.value}/>
                    }
                    </Fragment>
                    :<Fragment>
                    {props.left?
                            <BetterBar variant="determinate" value={props.value} style={{transform:"rotate(180deg)"}}/>
                            :<BetterBar variant="determinate" value={props.value}/>
                    }</Fragment>
                }
        </Fragment>
    );
};

export default StatsBar;



