import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stat from './Stat';

const useStyles = makeStyles((theme)=>({
    empty:{
        height:"2rem",
        [theme.breakpoints.between('sm','md')]:{
            height:"3rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"3.5rem",
        },
        [theme.breakpoints.up('xl')]:{
            height:"4rem",
        }
    },
}));

//----------------------------------------------------------------------------------- Za svaki tip togađaja se rendera njegova statistika = 2 stats letvice

const StatsTab = () => {

    const classes = useStyles();

    return(
        <Fragment>
                <Stat name="Udarci" home={7} guest={3} />
                <Stat name="Udarci na gol" home={3} guest={2} />
                <Stat name="Udarci van gola" home={4} guest={1} />
                <Stat name="Blokirani udarci" home={1} guest={0} />
                <Stat name="Obrane" home={2} guest={1} />
                <Stat name="Udarci van 16 metara" home={2} guest={2} />

                <div className={classes.empty}/>
                
                <Stat name="Korneri" home={5} guest={4} />
                <Stat name="Ofsajdi" home={2} guest={1} />
                <Stat name="Prekršaji" home={7} guest={3} />
                <Stat name="Žuti kartoni" home={3} guest={2} />
                <Stat name="Crveni kartoni" home={1} guest={0} />
                <div className={classes.empty}/>

                <Stat name="Velike šanse" home={4} guest={1} />
                <Stat name="Neiskorištene velike šanse" home={1} guest={1} />
                <div className={classes.empty}/>

                <Stat name="Dodavanja" home={170} guest={138} />
                <Stat name="Uspješna dodavanja" home={136} guest={98} />
                <Stat name="Duga dodavanja" home={24} guest={35} />
                <Stat name="Ubačaji" home={7} guest={4} />

                <div className={classes.empty}/>

                <Stat name="Driblinzi" home={18} guest={9} />
                <Stat name="Dueli" home={36} guest={25} />
                <Stat name="Zračni dueli" home={7} guest={5} />
                <Stat name="Izgubljene lopte" home={7} guest={14} />
                <div className={classes.empty}/>

                <Stat name="Startovi" home={26} guest={15} />
                <Stat name="Presjecanja" home={7} guest={8} />
                <Stat name="Čišćenja" home={3} guest={9} />
        </Fragment>
    );
};

export default StatsTab;
                        
                        
    

