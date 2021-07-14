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

const StatsTab = (props) => {

    const classes = useStyles();

    const count = ( type, home ) => {
        let arr = [];

        for (let ev of props.events){
            if(ev.type.includes(type) && ev.home_team === home){
                arr.push(ev);
            };
        }
            console.log(arr);
            return arr.length;

        };

    return(
        <Fragment>
                <Stat name="Udarci" home={count("Shot",true)+count("Save",true)+count("Goal",true)}  guest={count("Shot",false)+count("Save",false)+count("Goal",false)} />
                <Stat name="Udarci na gol" home={count("Shot on target",true)+count("Goal",true)}  guest={count("Shot on target",false)+count("Goal",false)}/>
                <Stat name="Udarci van gola"  home={count("Shot off target",true)}  guest={count("Shot off target",false)}/>
                <Stat name="Blokirani udarci" home={count("Shot blocked",true)}  guest={count("Shot blocked",false)} />
                <Stat name="Obrane"  home={count("Save",true)}  guest={count("Save",false)} />
                <Stat name="Udarci van 16 metara"  home={count("Outside the box",true)}  guest={count("Outside the box",false)}  />

                <div className={classes.empty}/>
                
                <Stat name="Korneri" home={count("Corner",true)}  guest={count("Corner",false)} />
                <Stat name="Ofsajdi"  home={count("Offside",true)}  guest={count("Offside",false)} />
                <Stat name="Prekršaji"  home={count("Warning",true)+count("Red card",true)+count("Yellow card",true)}  guest={count("Warning",false)+count("Red card",false)+count("Yellow card",false)} />
                <Stat name="Žuti kartoni"  home={count("Yellow card",true)}  guest={count("Yellow card",false)} />
                <Stat name="Crveni kartoni"  home={count("Red card",true)}  guest={count("Red card",false)} />
                <div className={classes.empty}/>

                <Stat name="Velike šanse" home={count("Big chance",true)}  guest={count("Big chance",false)} />
                <Stat name="Neiskorištene velike šanse"  home={ (count("Big chance",true)-count("Goal",true))>0?(count("Big chance",true)-count("Goal",true)):0}  guest={(count("Big chance",false)-count("Goal",false))>0?(count("Big chance",false)-count("Goal",false)):0} />
                <div className={classes.empty}/>

                <Stat name="Dodavanja"  home={count("pass",true)}  guest={count("pass",false)} />
                <Stat name="Uspješna dodavanja"  home={count("Succesfull pass",true)}  guest={count("Succesfull pass",false)} />
                <Stat name="Duga dodavanja"  home={count("Succesfull pass Long",true)}  guest={count("Succesfull pass Long",false)} />
                <Stat name="Ubačaji"  home={count("Succesfull pass Cross",true)}  guest={count("Succesfull pass Cross",false)} />

                <div className={classes.empty}/>

                <Stat name="Driblinzi"  home={count("Dribling",true)}  guest={count("Dribling",false)} />
                <Stat name="Dueli"  home={count("Duel",true)}  guest={count("Duel",false)} />
                <Stat name="Zračni dueli"   home={count("Duel In air",true)}  guest={count("Duel In air",false)} />
                <Stat name="Izgubljene lopte"  home={count("Tackle",false)+count("Missed",true)+count("Intercepted",true)+count("Duel",false)}  guest={count("Tackle",true)+count("Missed",false)+count("Intercepted",false)+count("Duel",true)} />
                <div className={classes.empty}/>

                <Stat name="Startovi"  home={count("Tackle",true)}  guest={count("Tackle",false)} />
                <Stat name="Presjecanja"  home={count("Intercepted pass",false)}  guest={count("Intercepted pass",true)} />
                <Stat name="Čišćenja"  home={count("Clearance",true)}  guest={count("Clearance",false)} />
        </Fragment>
    );
};

export default StatsTab;
                        
                        
    

