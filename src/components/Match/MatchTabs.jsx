import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab , Typography, Box, CircularProgress } from '@material-ui/core';
import MatchHeader from './MatchHeader';
import StatsTab from './StatsTab';
import ArticleTab from './ArticleTab';
import FeedTab from './FeedTab';
import EventTab from './EventTab';

const useStyles = makeStyles(theme => ({
  appbar:{
    backgroundColor:theme.palette.background.paper,
    zIndex:3,
  },
  swiper:{
    width:"100%",
    paddingTop:"3rem"
  },
  tab:{
    fontSize:"0.6rem",
    padding:"0.4rem",
    [theme.breakpoints.between('sm','md')]:{
      fontSize:"0.9rem",
      padding:"0.6rem",    
    },
    [theme.breakpoints.between('md','xl')]:{
      fontSize:"1.3rem",
      padding:"1rem",    
    },
    [theme.breakpoints.up('xl')]:{
      fontSize:"1.5rem",
      padding:"1rem",
    }
  },
}));

//----------------------------------------------------------------------------------- prilagođeni pojedini TabPanel

const TabPanel = (props) => {

  const { children, value, index, ...other } = props; // destrukturiranje

  return (
    <div
      role = "tabpanel"
      hidden = {value !== index}
      id = {`full-width-tabpanel-${index}`}
    //   aria-labelledby = {`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box > {/*padding = theme.spacing(3)*/}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

//PropTypes is a library that helps in minimizing this problem in React by checking the types passed in the props object against a specification we set beforehand and to raise a warning if the types passed don't match the types expected.
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired, 
  value: PropTypes.any.isRequired
};

//----------------------------------------------------------------------------------- samo generira propse dinamički ovisno o indexu

const generateProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    // 'aria-controls': `full-width-tabpanel-${index}`
  };
};
//----------------------------------------------------------------------------------- HTTP zahtjev za podacima o utakmici

const HTTPMatch = (id, setMatch, setLoading) => {

    const requestOptions = {
      method: 'GET',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    };

    fetch(`http://localhost:3001/match/events/${id}`, requestOptions)
    .then((response)=>{
      if(response.status===200)
      {
        Promise.resolve(response).then(response => response.json())
          .then(data => {
            setMatch(data);
            setLoading(false);
          })     
    }
    else if(response.status===403)
    {
      setLoading(false);
    }
  }).catch((error)=> { console.log('Error in fetch function '+ error);});
};

//----------------------------------------------------------------------------------- okvir za Tabove

const MatchTabs = (props)=> {

  const classes = useStyles();
  const [value, setValue] = useState( () => 0 );
  const [match, setMatch] = useState( () => {} );
  const [loading, setLoading] = useState( () => true );
  const user = useSelector ( store => store.login );

  useEffect(()=>{
    HTTPMatch( props.match.params.id, (val)=>setMatch(val), (val)=>setLoading(val));
  },[props.match.params.id]);

  const handleChange = (event, newValue) => { // minja stranicu koja se prikazuje ako kliknemo
    setValue(newValue);
  };

  const handleChangeIndex = index => { // minja stranicu koja se prikazuje ako swipeamo
    setValue(index);
  };

  return (
    loading ?
    <CircularProgress/>
    :
    <React.Fragment>
        <MatchHeader home_team={match.home_team} guest_team={match.guest_team} user={match.user} result={match.result} stadium={match.stadium} date_time={match.date_time} competition={match.competition} >
            <React.Fragment >
                <AppBar position="static" className={classes.appbar} elevation={0}>
                        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary"  centered  >
                                <Tab label="Article" {...generateProps(0)} className={classes.tab}/>
                                <Tab label="Feed" {...generateProps(1)} className={classes.tab}/>
                                <Tab label="Statistics" {...generateProps(2)} className={classes.tab}/>
                                {(user!==null) && <Tab label="Create eventS" {...generateProps(3)} className={classes.tab}/>}
                        </Tabs>
                </AppBar>

                <SwipeableViews axis='x' index={value} onChangeIndex={handleChangeIndex} className={classes.swiper}>
                        <TabPanel value={value} index={0}>
                            <ArticleTab article={match.article} headline={match.headline} photos={match.photos}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <FeedTab/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <StatsTab/>
                        </TabPanel>
                        {(user!==null) &&
                        <TabPanel value={value} index={3}>
                          <EventTab home_team={match.home_team} guest_team={match.guest_team}/>
                        </TabPanel>}
                </SwipeableViews>
            </React.Fragment>
        </MatchHeader>
    </React.Fragment>

  );
};

export default MatchTabs;
//home_team={match.home_team} guest_team={match.guest_team} user={match.user} result={match.result} stadium={match.stadium} date_time={match.date_time} competition={match.competition} 