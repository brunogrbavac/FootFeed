import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { userLogIn } from '../../redux/actions/login';
import login from '../../images/login.png';

const useStyles = makeStyles ((theme) => ({
    root: {
      margin: '0 auto',
      width: "80%",
    },
    fields: {
        display: 'block',
        width: "100%",
        marginBottom: "1rem",
    }, 
    loginHeadline:{
        margin: "2rem 0 3rem 0",
        width:"50%",
    },
    loginButton:{
        margin: "auto",
        marginTop: "2.5em",
        marginBottom: "2em",
        borderRadius: "18px",
    },
    link:{
        margin:"1.5rem auto 0.5rem auto",
        textAlign: "center",
    }
  }));


function Login(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let classes = useStyles();
    const redirectUri = '/'; //useSelector(state => state.redirect);
    const dispatch = useDispatch();



    const HTTPLogin = (event,object) => {

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password}),
            credentials: 'include'
        };

        fetch('http://localhost:3001/log/in', requestOptions)
        .then((response)=>{
            if(response.status===200)
            {
                dispatch(userLogIn(username));
                console.log(props);
                props.history.push(redirectUri);
            }
            else  props.history.push('/login');
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
        });
    }

    return (
        <Grid container direction="colmun" justify="center" alignItems="center" style={{height:"95vh"}}>
                <Grid item xs={10} sm={7} md={6} lg={4}>
                        <Paper elevation={3} style={{padding:"2rem 0.5rem"}} >
                                <img src={login} alt="Login" className={classes.loginHeadline} />
                                <form onSubmit={(e)=>{HTTPLogin(e)}} className={classes.root} noValidate autoComplete="off">
                                        <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth className={classes.fields} type="text" label="Username" variant="filled"/>
                                        <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth  className={classes.fields} type="password" label="Password" variant="filled"/>
                                        <div className={classes.link}><a href={"/forgot"} style={{color:"grey"}}>Forgot your password?</a></div>
                                        <Button variant="contained" color="secondary" size="large" className={classes.loginButton} type="submit">
                                            Log in
                                        </Button>
                                </form>
                        </Paper>
                </Grid>
        </Grid>

    );
};
export default Login;