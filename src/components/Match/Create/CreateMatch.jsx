import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Stepper, Step, StepLabel } from '@material-ui/core';
import match from '../../../images/match.png';
import SelectLeague from './SelectLeague';
import EditMatch from './EditMatch';


const HTTPAddPhotos = ( form, reset ) => {
    const requestOptions = {
        method: 'POST',
        mode:'cors',
        // headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: form
    };

    fetch('http://localhost:3001/photo/add', requestOptions)
    .then((response)=>{
    if(response.status===200) reset();
    else{
        let err = new Error(response.status + "Error adding match photos.");
        throw(err);
    };
    })
    .catch((error)=>{
        console.log('Error in/photo/add fetch function '+ error);
    });
};


const HTTPCompetitionsAndTeams = ( setData, setCompetition, setLoading ) => {

    const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
    };

    fetch('http://localhost:3001/competition/everything', requestOptions)
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response).then(response => response.json())
        .then(data => {
          setData(data);
          setLoading(false);
          setCompetition(data[0]);
        })
      }
      else{
        let err = new Error(response.status + "Error getting competitions and teams.");
        throw(err);
      };
    })
    .catch((error)=>{
        console.log('Error in /competition/everything fetch function '+ error);
    });
};


const HTTPCreateMatch = ( competition, home, guest, dateAndTime, stadium, headline, article, photos, reset  ) => {

    let toSend = {
        date_time: dateAndTime,
        article: article,
        stadium: stadium,
        home_team: home.AF_ID_team,
        guest_team: guest.AF_ID_team,
        competition: competition.AF_ID_competition,
        headline: headline,
    }

    const requestOptions = {
        method: 'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(toSend)
    };

    fetch('http://localhost:3001/match/create', requestOptions)
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response).then(response => response.json())
        .then(data => {
            let form = new FormData();
            form.append('match_id', data.match_id);
            for ( let photo of photos){form.append('photo',photo);};
            HTTPAddPhotos(form, reset);
        })
      }
      else{
        let err = new Error(response.status + "Error creating a match.");
        throw(err);
      };
    })
    .catch((error)=>{
        console.log('Error in /match/create. '+ error);
    });
};


const useStyles = makeStyles ((theme) => ({
    background:{
        [theme.breakpoints.down('sm')]:{
            padding:"1rem",
        },
        [theme.breakpoints.between('sm','lg')]:{
            padding:"2rem",
        },
        [theme.breakpoints.up('lg')]:{
            padding:"3rem",
        },
        borderRadius:"5px",
    },
    buttonRound:{
        borderRadius:"25px",
        backgroundColor:theme.palette.primary.main,
    },
    button:{
        borderRadius:"5px",
        fontSize:"1.2rem",
        [theme.breakpoints.down('sm')]:{
            fontSize:"0.9rem",
        },
        width:"6rem",
        margin:"3rem 1rem 0 1rem"
    },
    match:{
        [theme.breakpoints.down('sm')]:{
            margin: "0rem 0 2rem 0",
            width:"60%",
        },
        [theme.breakpoints.between('sm','lg')]:{
            margin: "1rem 0 2rem 0",
            width:"50%",
        },
        [theme.breakpoints.up('lg')]:{
            margin: "2rem 0 1rem 0",
            width:"45%",
        },
    },
    versus:{
        fontSize:"2rem",
        fontWeight:"bolder",
        padding:"0 2rem 5rem 2rem !important",
        color:"gray",
        [theme.breakpoints.down('sm')]:{
            display:"none",
        },
    },
    paper:{
        alignItems:"center !important",
        [theme.breakpoints.down('sm')]:{
            padding:"3rem 1rem",
            marginTop:"3rem",
        },
        [theme.breakpoints.between('sm','lg')]:{
            padding:"3rem 1rem",
            marginTop:"4rem",
        },
        [theme.breakpoints.up('lg')]:{
            padding:"4rem 3rem",
            marginTop:"3.5rem",
        },
    },
    stepper:{
        [theme.breakpoints.down('sm')]:{
            margin:"0 0 1rem 0",
        },
        [theme.breakpoints.between('sm','lg')]:{
            margin:"0 0 1.5rem 0",
        },
        [theme.breakpoints.up('lg')]:{
            margin:"0 0 4rem 0",
        },
    },
    teams:{
        [theme.breakpoints.down('sm')]:{
            margin:"3rem 0",
        },
        },
        teamsGrid:{
        [theme.breakpoints.up('md')]:{
            margin:"6rem 0 1rem 0",
        },
    },
  }));


const  CreateMatch = () => {

    let classes = useStyles();
    const [data, setData] = useState(()=>[]);
    const [loading, setLoading] = useState(()=>true);
    const steps = ['Pick a competition', 'Pick teams', 'Edit details'];
    const [activeStep, setActiveStep] = useState(()=>0);
    const [competition, setCompetition] = useState(()=>null);
    const [home, setHome] = useState(()=>null);
    const [guest, setGuest] = useState(()=>null);
    const [stadium, setStadium] = useState(()=>"");
    const [headline, setHeadline] = useState(()=>"");
    const [article, setArticle] = useState(()=>"");
    const [dateAndTime, setDateAndTime] = useState(()=>null);
    const [files, setFiles] = useState([]);


    useEffect(()=>{
        HTTPCompetitionsAndTeams((data) => {setData(data)}, (item)=>{setCompetition(item);setHome(item.teams[0]);setGuest(item.teams[0])}, (bool) => {setLoading(bool)});
    },[]);

    const reset = () => {
        setActiveStep(0);
        setCompetition(data[0]);
        setHome(data[0].teams[0]);
        setGuest(data[0].teams[0]);
        setHeadline("");
        setArticle("");
        setDateAndTime(null);
        setFiles([]);
    }

    return (
        <Grid container direction="colmun" justify="center" alignItems="center" style={{minHeight:"120vh",alignItems:"flex-start !important"}}>
                <Grid item xs={10} sm={9} md={8} lg={7}>
                        <Paper elevation={3} className={classes.paper} >
                                    {loading? null:
                                        <Fragment>
                                                <img src={match} alt="match" className={classes.match} />
                                                <div className={classes.background}>
                                                        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                                                        {steps.map((label) => (
                                                                <Step key={label}>
                                                                    <StepLabel >{label}</StepLabel>
                                                                </Step>
                                                        ))}
                                                        </Stepper>
                                                        {activeStep===0 && <SelectLeague data={data} setSelected={(item)=>{ setCompetition(item);setHome(item.teams[0]);setGuest(item.teams[0]);}}/>}
                                                        {activeStep===1 && 
                                                                <Grid container direction="row" justify="center" alignItems="center" className={classes.teamsGrid}>
                                                                        <Grid item xs={10} md={5} className={classes.teams}>
                                                                                <SelectLeague data={data[data.indexOf(competition)].teams} setSelected={(item)=>setHome(item)}/>
                                                                        </Grid>
                                                                        <Grid item xs={2} className={classes.versus}>
                                                                                VS
                                                                        </Grid>
                                                                        <Grid item xs={10} md={5}>
                                                                                <SelectLeague data={data[data.indexOf(competition)].teams} setSelected={(item)=>setGuest(item)}/>
                                                                        </Grid>
                                                                </Grid>
                                                        }
                                                        {activeStep===2 && <EditMatch dateAndTime={dateAndTime} setDateAndTime={setDateAndTime} setStadium={setStadium} setHeadline={setHeadline} setFiles={setFiles} files={files} setArticle={setArticle}/>}
                                                </div>
                                                <Button variant="contained" color="secondary" disabled={activeStep===0} className={classes.button} onClick={()=>setActiveStep(activeStep-1)} > Back </Button>
                                                <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{if(activeStep===2){HTTPCreateMatch(competition, home, guest, dateAndTime, stadium, headline, article, files, reset)}else{setActiveStep(activeStep+1)};}}> {activeStep===2?"Finish":"Select"} </Button>
                                            </Fragment>
                                    }
                            </Paper>
                </Grid>
        </Grid>
    );
};
export default CreateMatch;
