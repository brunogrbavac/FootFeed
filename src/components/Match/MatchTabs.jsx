import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab , Typography, Box } from '@material-ui/core';
import MatchHeader from './MatchHeader';
import StatsTab from './StatsTab';
import ArticleTab from './ArticleTab';

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

//----------------------------------------------------------------------------------- okvir za Tabove

const MatchTabs = ()=> {

  const classes = useStyles();
  const [value, setValue] = useState( () => 0 );

  const handleChange = (event, newValue) => { // minja stranicu koja se prikazuje ako kliknemo
    setValue(newValue);
  };

  const handleChangeIndex = index => { // minja stranicu koja se prikazuje ako swipeamo
    setValue(index);
  };

  return (
    <MatchHeader>
        <AppBar position="static" className={classes.appbar} elevation={0}>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary"  centered variant="centered" >
                        <Tab label="Article" {...generateProps(0)} className={classes.tab}/>
                        <Tab label="Feed" {...generateProps(1)} className={classes.tab}/>
                        <Tab label="Statistics" {...generateProps(2)} className={classes.tab}/>
                </Tabs>
        </AppBar>

        <SwipeableViews axis='x' index={value} onChangeIndex={handleChangeIndex} className={classes.swiper}>
                <TabPanel value={value} index={0}>
                    <ArticleTab/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <StatsTab/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                Item Three
                </TabPanel>
        </SwipeableViews>
    </MatchHeader>
  );
};

export default MatchTabs;