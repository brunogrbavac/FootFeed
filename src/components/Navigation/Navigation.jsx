import React, { useState } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Menu as MenuIcon, Search, AccountCircle, WbSunnyOutlined, NightsStayOutlined, Notifications }  from '@material-ui/icons';
import logo from '../../images/footfeed.png';
import logoIcon from '../../images/footfeedIcon.png';
import { lightModeOn, darkModeOn } from '../../redux/actions/darkMode';
import { userLogOut } from '../../redux/actions/login';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.


const Navbar = (props) => {
  const dispatch = useDispatch();
  const darkMode = useSelector( (store) => store.darkMode );
  const login = useSelector( (store) => store.login );
  const [ anchor, setAnchor] = useState(null);
  const accountMenuOpen = Boolean(anchor);
  const smallScreen = (window.innerWidth < 1200);
  const drawerWidth = smallScreen ? 300 : 360;

  const HTTPlogout = () => {

    const requestOptions = {
      method: 'HEAD',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    };

    fetch(`http://localhost:3001/log/out`, requestOptions)
    .then((response)=> dispatch(userLogOut()))
    .catch( (error) => { console.log('Error in fetch function '+ error);});
  };

  const profileMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const profileMenuClose = () => {
    setAnchor(null);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1, // svima rast ujednjačen -> inače nered
    },
    navbar: {
      left:0,
      width:"100vw",
      transition: theme.transitions.create(['margin', 'width'], { // tranzicija dijeluje na margine i širinu
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    navbarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], { // tranzicija dijeluje na margine i širinu
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      height: '2rem',
      [theme.breakpoints.down('sm')]:{
        display:'none'
      }
    },
    logoIcon: {
      height: '2.4rem',
      [theme.breakpoints.up('md')]:{
        display:'none'
      }
    },
    searchBox: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(3),
      width: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    logout: {
      height:"2rem",
      marginTop: "auto",
      marginBottom: "auto",
      marginRight: "auto",
      marginLeft: theme.spacing(2),
      borderRadius: "17px",
      fontSize:"0.7rem",
      // fontFamily: "Bungee Shade"
      fontFamily: "Roboto",
      fontWeight:"bold",
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    hide: {
      display: 'none'
    },
  }));

  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar elevation={3} position="fixed" className={clsx(classes.navbar, !smallScreen && props.openDrawer && classes.navbarShift )}>
          <Toolbar>
              <IconButton edge="start" disabled={props.openDrawer} className={clsx(classes.menuButton)}  color="inherit" onClick={()=>props.handleOpenDrawer()}> {/*anulira padding od parrenta - da nan je lipo uz rub livi*/} 
                  <MenuIcon/>
              </IconButton>
              <Link to='/'> <img className={classes.logo}  src={logo}  alt="FootFeed" /> {/*ovo je kada je width > 600px*/} </Link>
              <Link to='/'> <img className={classes.logoIcon}  src={logoIcon}  alt="FootFeed"/> {/*mala slika zamanje od 600px*/} </Link>
              <div style={{flexGrow: 1}} /> {/*trik za odvojit livo i desno grupe */}
              <Tooltip title="Search league, team or article" arrow>
                  <div className={classes.searchBox}>
                      <div className={classes.searchIcon}>
                          <Search/>
                      </div>
                      <InputBase placeholder="Search…" aria-label='search' onKeyUp={(e)=>{console.log("hej"); if(e.which === 13 ){window.location.assign("/matches/any/"+e.target.value);}}} classes={{root: classes.inputRoot, input: classes.inputInput,}} />
                  </div>
              </Tooltip>
              {/* {(login !== null) && 
                  <Tooltip title="Your unseen notifications" arrow>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <Notifications/>
                        </Badge>
                    </IconButton>
                  </Tooltip>
              } */}
              {darkMode?
                  <Tooltip title="Light mode" arrow>
                      <IconButton color="inherit" onClick={()=>dispatch(lightModeOn())}> {/*NE ZABORAVI () od actiona*/}
                          <WbSunnyOutlined/>
                      </IconButton>
                  </Tooltip>:
                  <Tooltip title="Dark mode" arrow>
                      <IconButton color="inherit" onClick={()=>dispatch(darkModeOn())}> {/*NE ZABORAVI () od actiona*/}
                          <NightsStayOutlined/>
                      </IconButton>
                  </Tooltip>
              }
              {(login !== null) && 
                  <Tooltip title="Manage your account" arrow>
                      <IconButton onClick={profileMenuOpen} color="inherit">
                          <AccountCircle/>
                      </IconButton>
                  </Tooltip>
              }
              {(login !== null) && 
                  <Button edge="end" variant="contained" color="secondary" className={classes.logout} onClick={()=>HTTPlogout()}>
                      LOGOUT               
                  </Button>
              }
              {(login === null) && 
                  <Link to="/register">
                        <Button edge="end" variant="contained" color="secondary" className={classes.logout}>
                            REGISTER               
                        </Button>
                  </Link>
              }
              {(login === null) && 
                  <Link to="/login">
                        <Button edge="end" variant="contained" color="secondary" className={classes.logout}>
                            LOGIN               
                        </Button>
                  </Link>
              }
        </Toolbar>
      </AppBar>
      <Menu
          anchorEl={anchor} // html element koji je lokacija -> klikon na taj element se i otvara
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // u odnosu na ANchorEl di ga displaya
          // id={menuId}
          keepMounted // uvik drži u DOM stablu ( i kad nije displayan) radi search engine optiizacije
          transformOrigin={{ vertical: 'top', horizontal: 'right' }} // u odnosu na ANchorEl di ga displaya
          open={accountMenuOpen}
          onClose={profileMenuClose}
      >
          <MenuItem onClick={profileMenuClose}>Account settings</MenuItem>
          <MenuItem onClick={profileMenuClose}>Log out</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(Navbar);