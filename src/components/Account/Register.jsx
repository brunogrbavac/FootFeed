import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import register from '../../images/register.png';
import CustomSnackbar from '../Snackbar';

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
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [bio, setBio] = useState("");
    const [open, setOpen] = useState(()=>false);
    const [snack, setSnack] = useState(()=>"");
    const [snackType, setSnackType] = useState(()=>"error");
    let classes = useStyles();


    const HTTPRegister = (event,object) => {

        event.preventDefault();

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //regex
        if(!re.test(email)){
            setSnack("Please use a valid email!");
            setOpen(true);
            return ;
        };

        if(password1!==password2){
            setSnack("Passwords dont match!");
            setOpen(true);
            return ;
        };

        if(username==="" || name===""|| email==="" || surname==="" || password1===""){
            setSnack("Please fill all the required fields!");
            setOpen(true);
            return ;
        };

        if(password1.length<6){
            setSnack("Passwords must be at least 6 characters!");
            setOpen(true);
            return ;
        };

        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                name: name,
                surname: surname,
                email: email,
                password: password1,
            }),
            credentials: 'include'
        };

        fetch('http://localhost:3001/user/create', requestOptions)
        .then((response)=>{
            if(response.status===200){
                setSnack("Succesfully registered to FootFeed, please log in!");
                setSnackType("success");
                setOpen(true);
                setUsername("");
                setName("");
                setSurname("");
                setEmail("");
                setPassword1("");
                setPassword2("");
            }
            else  {
                setSnack("User with selected username or email already exists!");
                setOpen(true);
            };
        })
        .catch((error)=>{
            console.log('Error in fetch function '+ error);
        });
    }

    return (
        <Grid container direction="colmun" justify="center" alignItems="center" style={{height:"95vh"}}>
                <Grid item xs={10} sm={7} md={6} lg={4}>
                        <Paper elevation={3} style={{padding:"2rem 0.5rem"}} >
                                <img src={register} alt="Register" className={classes.loginHeadline} />
                                <form onSubmit={(e)=>{HTTPRegister(e)}} className={classes.root} noValidate autoComplete="off">
                                        <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth className={classes.fields} type="text" label="Username*" variant="filled"/>
                                        <TextField onChange={(e)=>{setEmail(e.target.value)}} fullWidth className={classes.fields} type="text" label="E-mail*" variant="filled"/>
                                        <TextField onChange={(e)=>{setName(e.target.value)}} fullWidth className={classes.fields} type="text" label="Name*" variant="filled"/>
                                        <TextField onChange={(e)=>{setSurname(e.target.value)}} fullWidth className={classes.fields} type="text" label="Surname*" variant="filled"/>
                                        <TextField onChange={(e)=>{setPassword1(e.target.value)}} fullWidth  className={classes.fields} type="password" label="Password*" variant="filled"/>
                                        <TextField onChange={(e)=>{setPassword2(e.target.value)}} fullWidth  className={classes.fields} type="password" label="Password*" variant="filled"/>
                                        {/* <div className={classes.link}><a href={"/forgot"} style={{color:"grey"}}>Forgot your password?</a></div> */}
                                        <Button variant="contained" color="secondary" size="large" className={classes.loginButton} type="submit">
                                            Sign In
                                        </Button>
                                </form>
                        </Paper>
                </Grid>
                <CustomSnackbar type={snackType} open={open} message={snack} setOpen={(val) => setOpen(val)}/>
        </Grid>

    );
};
export default Login;