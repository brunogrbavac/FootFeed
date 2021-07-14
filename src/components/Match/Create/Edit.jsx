import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Stepper, Step, StepLabel } from '@material-ui/core';
import match from '../../../images/match.png';
import { useSelector, useDispatch } from 'react-redux';
import EditMatch from './EditMatch';
import { matchUnloaded } from '../../../redux/actions/toEdit';

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



const HTTPEditMatch = ( match_id, dateAndTime, stadium, headline, article, photos, reset  ) => {

    let toSend = {
        match_id: match_id,
        date_time: dateAndTime,
        article: article,
        stadium: stadium,
        headline: headline,
    }

    const requestOptions = {
        method: 'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(toSend)
    };

    fetch('http://localhost:3001/match/edit', requestOptions)
    .then((response)=>{
      if(response.status===200){
            let form = new FormData();
            form.append('match_id', match_id);
            for ( let photo of photos){form.append('photo',photo);};
            HTTPAddPhotos(form, reset);
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


const  Edit = (props) => {

    const matchToEdit = useSelector (store => store.match);
    const [stadium, setStadium] = useState(()=>matchToEdit.stadium);
    const [headline, setHeadline] = useState(()=>matchToEdit.headline);
    const [article, setArticle] = useState(()=>matchToEdit.article);
    const [dateAndTime, setDateAndTime] = useState(()=>matchToEdit.date_time);
    const [files, setFiles] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();

    const reset = () => {
        dispatch(matchUnloaded());
        props.history.push('/match/user');
    };

    return (
        <Grid container direction="colmun" justify="center" alignItems="center" style={{minHeight:"120vh",alignItems:"flex-start !important"}}>
                <Grid item xs={10} sm={9} md={8} lg={7}>
                        <Paper elevation={3} className={classes.paper} >
                                <Fragment>
                                        <img src={match} alt="match" className={classes.match} />
                                        <div className={classes.background}>
                                            <EditMatch dateAndTime={dateAndTime} headline={headline} article={article} stadium={stadium} setDateAndTime={setDateAndTime} setStadium={setStadium} setHeadline={setHeadline} setFiles={setFiles} files={files} setArticle={setArticle}/>
                                        </div>
                                        <Button variant="contained" color="secondary" className={classes.button} onClick={()=>HTTPEditMatch(matchToEdit.match_id, dateAndTime, stadium, headline, article, files, reset )}>SAVE</Button>
                                </Fragment>
                            </Paper>
                </Grid>
        </Grid>
    );
};
export default Edit;
