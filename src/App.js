import './App.css';
import clsx from 'clsx'; // A tiny (228B) utility for constructing className strings conditionally.Also serves as a faster & smaller drop-in replacement for the classnames module.
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import backgroundLight from './images/backgroundLight.png';
import backgroundDark from './images/backgroundDark.png';
import Banner from './components/Banner';
import Navbar from './components/Navigation/Navigation' ;
import { default as Drawer} from './components/Navigation/Drawer';

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
          main: teal[500],
        },
        secondary: {
          main: '#ff5722',
        },
    }
});

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: teal,
        secondary: {
          main: '#ff5722',
        },
    }
});

function App() {

  const darkMode =  useSelector( (store) => store.darkMode );
  let backgroundIMG = darkMode ? backgroundDark : backgroundLight;
  const [ openDrawer, setOpenDrawer ] = useState( () => false );
  const smallScreen = (window.innerWidth < 1200);
  const largeScreen = (window.innerWidth > 2050);
  const drawerWidth = smallScreen ? 240 : 360;
  
  const useStyles = makeStyles((theme) => ({
    background:{
      textAlign: "center",
      backgroundImage:"url("+ backgroundIMG +")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        minHeight: "100vh",
        overflowY: "show",
      },
      [theme.breakpoints.up('md')]: {
        minHeight: "200vh",
      },
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(3),
      margin: "auto",
      maxWidth: "1280px",
      transition: theme.transitions.create('margin', { // za tranzicije Material UI ima vlastite predefinirane vrijednosti unutar default theme objekta
        easing: theme.transitions.easing.sharp, //probaj easIn
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    mainShift: {
      transition: theme.transitions.create('margin', { // za tranzicije Material UI ima vlastite predefinirane vrijednosti unutar default theme objekta
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    mainShiftForLargeScreens: {
      transition: theme.transitions.create('margin', { // za tranzicije Material UI ima vlastite predefinirane vrijednosti unutar default theme objekta
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }));
  
  const classes = useStyles();

  return ( //PITAJ LUKSICA ZA safari-pinned-tab
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <div className={classes.background}>
              <Drawer openDrawer={openDrawer} handleDrawerClose={()=>setOpenDrawer(false)}/>
              <Navbar openDrawer={openDrawer} handleOpenDrawer={()=>setOpenDrawer(true)}/>
              <div className={clsx(classes.main, openDrawer && !smallScreen && !largeScreen && classes.mainShift, largeScreen && classes.mainShiftForLargeScreens )}> {/*{[classes.mainShift]: openDrawer,}*/}
                  <Banner/>
              </div>
          </div>
      </ThemeProvider>
  );
}

export default App;
//https://youtu.be/ZwFA3YMfkoc?t=3886