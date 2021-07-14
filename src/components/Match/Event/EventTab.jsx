import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import EventButtonGrid from './EventButtonGrid';
import { ArrowBackOutlined } from '@material-ui/icons';
import Field from './Field';
import EventForm from './EventForm';
import { Socket } from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        width:"100%"
    },
    image:{
        transform:"scale(1, 1)",
        transition: "0.3s",
        padding:"3rem",
        "&:hover": {
            transform:"scale(1.2, 1.2)",
        },
        height:"4rem", 
        [theme.breakpoints.between('sm','md')]:{
            height:"6rem",  
            padding:"3.7rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"8rem", 
            padding:"4.2rem",
        },
        [theme.breakpoints.up('xl')]:{
            height:"10rem", 
            padding:"5rem",
        }
    },
    selected:{
        transform:"scale(1.2, 1.2)",
    },
    notSelected:{
        filter:"grayscale(1)",
    },
    step2:{
        margin:"1rem 0 3rem 0",
        [theme.breakpoints.between('sm','md')]:{
            margin:"2rem 0 4rem 0",
        },
        [theme.breakpoints.between('md','xl')]:{
            margin:"3rem 0 5rem 0",
        },
        [theme.breakpoints.up('xl')]:{
            margin:"5rem 0 6rem 0",
        }  
        },
    pickTeam:{
        borderRadius:"5px",
        width:"100%", 
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"space-around", 
        background: "linear-gradient(125deg, rgba(255,87,34,1) 0%, rgba(0,150,136,1)  95%)",
    },
    stepper:{
        width:"90%", 
        alignItems:"center",
        margin:"auto",
    },
    versus:{
        color:"white",
        fontWeight:"bolder",
        alignSelf:"center",
        fontSize:"1.5rem",
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            fontSize:"2.5rem",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize:"3rem",
        }
    },
}));


const HTTPRosters = ( home, guest, setHomeRoster, setGuestRoster ) => {

    const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

    fetch(`http://localhost:3001/player/all/${home}`, requestOptions)
    .then((response)=>{
        if(response.status===200)
        {
            Promise.resolve(response).then(response => response.json())
            .then(data => {
                setHomeRoster(data); 
            });     
        }
    }).catch((error)=> { console.log('Error in fetch Matches function '+ error);});

    fetch(`http://localhost:3001/player/all/${guest}`, requestOptions)
    .then((response)=>{
        if(response.status===200)
        {
            Promise.resolve(response).then(response => response.json())
            .then(data => {
                setGuestRoster(data); 
            });     
        }
    }).catch((error)=> { console.log('Error in fetch Matches function '+ error);});
};

const EventTab = (props) => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [homeRoster, setHomeRoster] = useState([]);
  const [guestRoster, setGuestRoster] = useState([]);
  const [eventType, setEventType] = useState(()=>"");
  const [home, setHome] = useState(()=>null);
  const [acters, setActers] = useState(()=>[null,null]);
  const [twoActers, setTwoActers] = useState(()=>false);
  const [checks, setChecks] = useState(()=>[]);
  const [checkboxes, setCheckboxes] = useState(()=>[]);
  const [article, setArticle] = useState(()=>"a");
  const [time, setTime] = useState(()=>"");
  const steps = ['Pick event type', 'Pick team', 'Pick the acters', 'Edit details'];

  useEffect(()=>{
    HTTPRosters(props.home_team.AF_ID_team, props.guest_team.AF_ID_team, (val)=>setHomeRoster(val), (val)=>setGuestRoster(val));
  },[]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleArticleNext = ( acters2 ) =>{
    switch(eventType){
        case "Goal":
            setArticle(`Prekrasan pogodak zabio je ${acters2[0].surname}!` );
            console.log("golazo");
            break;
        case "Goal Outside the Box":
            setArticle(`Iz daljine golčinu zabiva ${acters2[0].surname}!` );
            break;
        case "Goal Big chance":
            setArticle(`Zicer je realizirao ${acters2[0].surname}!` );
            break;
        case "Goal Outside the box Big chance":
            setArticle(`Prekrasan pogodak izvan šesnaesterca zabio je ${acters2[0].surname}!` );
            break;
        case "Save":
            setArticle(`Pucao je ${acters2[1].surname}, ali brani ${acters2[0].surname}. ` );
            break;
        case "Save Outside the Box":
            setArticle(`Iz daljine je pucao  ${acters2[1].surname}, ali siguran je ${acters2[0].surname}. ` );
            break;
        case "Save Big chance":
            setArticle(`Kakva prilika! Stopostotnu šansu imao je ${acters2[1].surname}, ali ${acters2[0].surname} ju je obranio. ` );
            break;
        case "Save Outside the box Big chance":
            setArticle(`Velika prilika! Izdaleka je pucao ${acters2[1].surname}, izgledalo je kao da ulazi, ali brani ${acters2[0].surname}. ` );
            break;
        default:
            setArticle(`Zanimljiv događaj.` );
            break;
            //itd.          
    };
    console.log(acters2);
    handleNext();
  };

  const handleSaveEvent = () => {


    if( eventType === "Yellow card" ){
        if(home){
            let i = homeRoster.firstXI.indexOf(acters[0]);
            let arr = [...homeRoster.firstXI];
            if( arr[i].yellow === true ){ // drugi žuti
                arr[i].disabled = true;
            }else{
                arr[i].yellow = true;
            };
            setHomeRoster({firstXI: arr, substitutes: homeRoster.substitutes });
        }else{
            let i = guestRoster.firstXI.indexOf(acters[0]);
            let arr = [...guestRoster.firstXI];
            if( arr[i].yellow === true ){ // drugi žuti
                arr[i].disabled = true;
            }else{
                arr[i].yellow = true;
            };
            setGuestRoster({firstXI: arr, substitutes: homeRoster.substitutes });
        };
    };

    if( eventType === "Red card" ){
        if(home){
            let i = homeRoster.firstXI.indexOf(acters[0]);
            let arr = [...homeRoster.firstXI];
            arr[i].disabled = true;
            setHomeRoster({firstXI: arr, substitutes: homeRoster.substitutes });
        }else{
            let i = guestRoster.firstXI.indexOf(acters[0]);
            let arr = [...guestRoster.firstXI];
            arr[i].disabled = true;
            setGuestRoster({firstXI: arr, substitutes: homeRoster.substitutes });
        };
    };

    if( eventType === "Substitution" ){
        if(home){
            console.log(acters);
            let i = homeRoster.firstXI.indexOf(acters[1]);
            let j = homeRoster.substitutes.indexOf(acters[0]);
            console.log(j);
            let arr1 = [...homeRoster.firstXI];
            let arr2 = [...homeRoster.substitutes];
            arr1[i].disabled = true;
            let temp = arr1[i];
            arr1[i] = arr2[j];
            console.log(arr2[j]);
            arr2[j] = temp;
            console.log(arr1);
            setHomeRoster({firstXI: arr1, substitutes: arr2 });
        }else{
            let i = guestRoster.firstXI.indexOf(acters[1]);
            let j = guestRoster.substitutes.indexOf(acters[0]);
            let arr1 = [...guestRoster.firstXI];
            let arr2 = [...guestRoster.substitutes];
            arr1[i].disabled = true;
            let temp = {...arr1[i]};
            arr1[i] = {...arr2[j]};
            arr2[j] = temp;
            setGuestRoster({firstXI: arr1, substitutes: arr2 });
        };
    };

    let res;
    if( eventType === "Goal"){
        if(home){
            let newRes = parseInt(props.result[0])+1;
            res = newRes + ':' + props.result[2];
        }
        else{
            let newRes = parseInt(props.result[2])+1;
            res = props.result[0]+ ':' +newRes  ;
        }
    };


    let players_id = [];
    for ( let acter of acters){
        if(acter!==null) players_id.push( acter.AF_ID_player);
    };
    let string = checks.map( check => {if(checkboxes[checks.indexOf(check)]){return check}}).join(' ');
    if(string.length<2){string=''}
    else {string=' '+ string};

    props.emitCreateEvent({
        msg:{
            type: eventType + string,
            article: article,
            time: time,
            players_id: players_id,
            home_team: home,
            match_id: props.match_id,
            result: res,
        },
        room: props.match_id,
    });


    setActiveStep(0);
    setEventType("");
    setHome(null);
    setActers([null,null]);
    setTwoActers(false);
    setChecks([]);
    setCheckboxes([]);
    setArticle("");
    setTime("");

  };


  return (
    <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

        <div>
            <div className={classes.stepper}>
                    {(activeStep === 0) && <EventButtonGrid handleNext={()=>{handleNext();setTime(Math.floor((new Date() - new Date(props.start))/60000));}} setEventType={setEventType} setTwoActers={setTwoActers} setChecks={setChecks}/>}
                    {(activeStep === 1) && 
                        <div className={clsx(classes.pickTeam,classes.step2)}>
                            <Button disabled={eventType==="End"|| eventType==="Halftime" || eventType==="Added time" || eventType==="Second half"}>
                                <img src={props.home_team.logo} onClick={()=>{(home===true)?setHome(null):setHome(true);handleNext();}} alt="Home team" className={clsx(classes.image,home&&classes.selected,((!home&&home!==null)||eventType==="End"|| eventType==="Halftime" || eventType==="Added time" || eventType==="Second half")&&classes.notSelected)} />
                            </Button>
                            <Typography variant="h3" className={classes.versus}>VS</Typography>
                            <Button disabled={eventType==="End"|| eventType==="Halftime" || eventType==="Added time" || eventType==="Second half"}>
                                <img src={props.guest_team.logo} onClick={()=>{(home===false)?setHome(null):setHome(false); handleNext();}} alt="Away team" className={clsx(classes.image,(home || eventType==="End"|| eventType==="Halftime" || eventType==="Added time" || eventType==="Second half" )&&classes.notSelected,(!home&&home!==null)&&classes.selected)} />
                            </Button>
                        </div>     
                    }
                    {(activeStep === 2) && <Field handleNext={handleArticleNext} homeTeam={home} twoActers={twoActers} eventType={eventType} home={homeRoster} guest={guestRoster} acters={acters} setActers={setActers}/>}
                    {(activeStep === 3) && <EventForm  setArticle={setArticle} setTime={setTime} checkboxes={checkboxes} setCheckboxes={setCheckboxes} checks={checks} eventType={eventType} acters={acters} time={time} article={article}/>}
                    <div>
                        <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleBack} className={classes.backButton} startIcon={<ArrowBackOutlined/>}>
                            Back
                        </Button>
                        {(activeStep === steps.length - 1) && <Button variant="contained" color="primary" onClick={()=>handleSaveEvent()}>
                            Finish
                        </Button>}
                        {((activeStep === 2 || activeStep === 1) && (eventType==="Added time" || eventType==="End" || eventType==="Halftime"|| eventType==="Second half")) && <Button variant="contained" color="primary" onClick={handleNext}>
                            Skip
                        </Button>}
                    </div>
            </div>
        </div>
    </div>
  );
};

export default EventTab;