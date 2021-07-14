import './App.css';
import clsx from 'clsx'; // A tiny (228B) utility for constructing className strings conditionally.Also serves as a faster & smaller drop-in replacement for the classnames module.
import React, { useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, ThemeProvider, createMuiTheme, CircularProgress, Backdrop } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import backgroundLight from './images/backgroundLight.png';
import backgroundDark from './images/backgroundDark.png';
import Banner from './components/Banner';
import Navbar from './components/Navigation/Navigation' ;
import { default as Drawer} from './components/Navigation/Drawer';
import Articles from './components/Portal/Articles';
import Error from './components/Error';
import Login from './components/Account/Login';
import MatchTabs from './components/Match/Header/MatchTabs';
import { darkModeOn, lightModeOn } from './redux/actions/darkMode';
import { userLogIn } from './redux/actions/login';
import { imagesUnloaded } from './redux/actions/gallery';
import Carousel  from 'react-material-ui-carousel';
import CreateMatch  from './components/Match/Create/CreateMatch';
import Dial from './components/Dial';
import UserMatches from './components/Account/UserMatches';
import FilteredArticles from './components/Portal/FilteredArticles';
import Register from './components/Account/Register';
import Edit from './components/Match/Create/Edit';

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

  const dispatch = useDispatch();
  const darkModeFromStorage = localStorage.getItem('darkmode'); // za renderanje odabranog mode-a i nakon refresha
  if( darkModeFromStorage ){ 
    if( darkModeFromStorage === 'true') dispatch(darkModeOn());
    else if( darkModeFromStorage === 'true') dispatch(lightModeOn());
  }
  else dispatch(lightModeOn()); // iovako je light defaultna tema => ako nema nista u storageu postavi unutar akcije koju dispatchamo

  const darkMode = useSelector( (store) => store.darkMode );
  let gallery = useSelector( (store) => store.gallery );
  const login = useSelector( (store) => store.login );
  const userFeature = (login!==null); // login drži username
  let backgroundIMG = darkMode ? backgroundDark : backgroundLight;
  const [ openDrawer, setOpenDrawer ] = useState( () => false );
  const [ loading, setLoading ] = useState( () => true );
  const smallScreen = (window.innerWidth < 1200);
  const largeScreen = (window.innerWidth > 2050);
  const drawerWidth = smallScreen ? 300 : 360;
  
  const useStyles = makeStyles((theme) => ({
    background:{
      textAlign: "center",
      backgroundImage:"url("+ backgroundIMG +")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      width: "100%",
      minHeight: "100vh", 
      // [theme.breakpoints.down('xs')]: {
      //   minHeight: "150vh",
      //   // overflowY: "show",
      //   width: "150%",
      // },
      [theme.breakpoints.up('sm')]: {
        minHeight: "100vh", //200 bilo
      },
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(1),
      minHeight:"90vh",
      [theme.breakpoints.between('sm','md')]:{
        padding: theme.spacing(2),
      },
      [theme.breakpoints.between('md','xl')]:{
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up('xl')]:{
        padding: theme.spacing(3),
      },
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
    progress:{
      marginTop:"45vh",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "rgb(2 2 2 / 81%)",
    },
    image:{
      width:"85vw",
      height:"85vh",
      objectFit:"cover",
    },
    articles:{
      alignItems:"center",
      display:"flex",
      minHeight:"80vh",
      flexDirection:"column",
      justifyContent:"center",
    }
  }));

  if(loading){
      const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

      fetch(`http://localhost:3001/log/check`, requestOptions)//class_id subject_id course_id topic_id
      .then((response)=>{
        if(response.status===200)
        {
          Promise.resolve(response).then(response => response.json())
            .then(data => {
                dispatch(userLogIn(data.username));
                setLoading(false);
            })     
      }
      else if(response.status===403)
      {
        setLoading(false);
      }
    }).catch((error)=> { console.log('Error in fetch function '+ error);});
  };

  const classes = useStyles();

  return (
      <ThemeProvider theme={ darkMode ? darkTheme : lightTheme}>
              {loading? <div className={classes.background}><CircularProgress color="secondary" size="5rem"  className={classes.progress} /></div> 
              :<div className={classes.background}>
                  <Backdrop className={classes.backdrop} open={(gallery.length>0)} onClick={()=>dispatch(imagesUnloaded())}>
                     <Carousel  navButtonsAlwaysVisible={true} autoPlay={false} timeout={100}>
                       {
                         gallery.map( image => <img className={classes.image} src={image} alt="Fullscreens the match."/>)
                       }
                     </Carousel>
                  </Backdrop>
                  <Drawer openDrawer={openDrawer} handleDrawerClose={()=>setOpenDrawer(false)}/>
                  <Navbar openDrawer={openDrawer} handleOpenDrawer={()=>setOpenDrawer(true)}/>
                  <div id="background1950" className={clsx(classes.main, openDrawer && !smallScreen && !largeScreen && classes.mainShift, largeScreen && classes.mainShiftForLargeScreens )}> {/*{[classes.mainShift]: openDrawer,}*/}
                    <Switch>
                        <Route exact path='/'>
                            <Banner/>
                            <Articles perPage={5}/> 
                        </Route>
                        <Route exact path='/matches/:type/:value' component={FilteredArticles}/>
                        <Route exact path='/match/create' component={CreateMatch}/>
                        {userFeature && <Route exact path='/match/user' component={UserMatches}/>}
                        {userFeature && <Route exact path='/match/edit' component={Edit}/>}
                        {!userFeature && <Route exact path='/login' component={Login}/>}
                        {!userFeature && <Route exact path='/register' component={Register}/>}
                        <Route exact path='/match/:id' component={MatchTabs}/> 
                        <Route component={Error}/>  {/*Ovo se rendera kada zatraženi URI ne pripada nijednoj drugoj ruti switcha. */}
                    </Switch>
                    {userFeature && <Dial/>}
                  </div>
                </div>
              }
      </ThemeProvider>
  );
}

export default App;
//https://youtu.be/ZwFA3YMfkoc?t=3886