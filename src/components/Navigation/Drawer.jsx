import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Collapse } from '@material-ui/core';
import { ChevronLeft, ExpandMore, ExpandLess } from '@material-ui/icons';
import unknown from '../../images/unknown.png';

//----------------------------------------------------------------------------------- Funkcija koja HTTP zahtjrvom puni Drawer sa natjecanjima i ekipama

 const HTTPCompetitionsAndTeams = ( setOpen , setData ) => {

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
          let allClosed = Array(data.length).fill(false);
          setOpen(allClosed);
          setData(data);
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

//----------------------------------------------------------------------------------- Drawer koji služi kao navigacija kroz natjecanja i klubove

const DrawerMenu = (props) => {
  
    const smallScreen = (window.innerWidth < 1200);
    const drawerWidth = smallScreen ? 300 : 360;
    const [ open, setOpen ] = useState(()=>[]);
    const [ data, setData ] = useState(()=>[]);

//----------------------------------------------------------------------------------- useStyles mora unutar komponente poradi DARKMODE-a

    const useStyles = makeStyles((theme) => ({
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      paper: {
        width: drawerWidth,
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // da sadržaj ostane ispod navbara
        ...theme.mixins.toolbar, // It simply adds a minimum height to an element. It's useful when you use the AppBar with a content section below, and you want to add a spacer at the top of your content so it doesn't disappear under the AppBar, for example.
        justifyContent: 'flex-end',
      },
      competitionName: {
        fontWeight: "500"
      },
      competitionLogoBox:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"4rem",
        height:"2.5rem",
        margin:"0.5rem 1rem",
      },
      competitionLogo:{
        maxWidth:"4rem",
        maxHeight:"2.5rem",
        height:"auto",
        marginRight:"2rem",
      },
      countryFlagBox:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"1.5rem",
        height:"1rem",
        margin:"0.5rem 1rem 0.5rem 0",
      },
      countryFlag:{
        maxWidth:"1.5rem",
        maxHeight:"1rem",
        height:"auto",
        marginRight:"2rem",
      },
      teamLogo:{
        width:"1.5rem",
        height:"auto",
        marginRight:"1rem",
      },
    }));
    
    let classes = useStyles();

    useEffect(()=>{
      HTTPCompetitionsAndTeams( (array) => {setOpen(array)}, (data) => {setData(data)}  );
    },[]);

    const handleExpandChange = (index) => {
      let temporary = open.slice(); // ovaj slice ne radi ništa, ali ako bi samo assignali niz na niz kopira bi referencu i react ne bi detektira promjenu stanja
      temporary[index] = !open[index];
      setOpen(temporary);
    };
    
    return(
        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={props.openDrawer} classes={{ paper: classes.paper,}}>
            <div className={classes.header}>
                <IconButton onClick={()=>props.handleDrawerClose()}>
                        <ChevronLeft  />
                </IconButton>
            </div>
            <Divider/>
            <List>
                {data.map( competition => (
                <Fragment>
                    <ListItem button onClick={() => handleExpandChange(data.indexOf(competition))}>
                        <div className={classes.competitionLogoBox}>
                            <img src={competition.logo!==null?competition.logo:unknown} className={classes.competitionLogo} alt={"Competition logo"}/>
                        </div>
                        <div className={classes.countryFlagBox}>
                            <img src={competition.country_flag!==null?competition.country_flag:unknown} className={classes.countryFlag} alt={"Country flag"}/>
                        </div>
                        <ListItemText primary={<span className={classes.competitionName}>{competition.name}</span>} />
                        {open[data.indexOf(competition)] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  <Collapse in={open[data.indexOf(competition)]} timeout="auto" unmountOnExit>
                    {competition.teams.map (team =>(
                      <Fragment>
                          <Divider/>
                          <List component="div" disablePadding>
                            <ListItem button style={{paddingLeft:"3rem"}}>
                              <img src={team.logo!==null?team.logo:unknown} className={classes.teamLogo} alt={"Team logo"}/>
                              <ListItemText primary={team.name} />
                            </ListItem>
                          </List>
                      </Fragment>
                    ))}
                  </Collapse>
                  <Divider/>
                </Fragment>
                ))}
            </List>
        </Drawer>
    );
};

export default DrawerMenu;