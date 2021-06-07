import React, { useState } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Menu as MenuIcon, Search, AccountCircle, WbSunnyOutlined, NightsStayOutlined, Notifications }  from '@material-ui/icons';
import logo from '../../images/footfeed.png';
import logoIcon from '../../images/footfeedIcon.png';
import { lightModeOn, darkModeOn } from '../../redux/actions/darkMode';


export default function Navbar(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector( (store) => store.darkMode );
  const [anchor, setAnchor] = useState(null);
  const accountMenuOpen = Boolean(anchor);
  const smallScreen = (window.innerWidth < 1200);
  const drawerWidth = smallScreen ? 240 : 360;

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
      width: '100%',
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
              <img className={classes.logo}  src={logo}  alt="FootFeed"/> {/*ovo je kada je width > 600px*/}
              <img className={classes.logoIcon}  src={logoIcon}  alt="FootFeed"/> {/*mala slika zamanje od 600px*/}
              <div style={{flexGrow: 1}} /> {/*trik za odvojit livo i desno grupe */}
              <Tooltip title="Search league, team or article" arrow>
                  <div className={classes.searchBox}>
                      <div className={classes.searchIcon}>
                          <Search/>
                      </div>
                      <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} classes={{root: classes.inputRoot, input: classes.inputInput,}} />
                  </div>
              </Tooltip>
              <Tooltip title="Your unseen notifications" arrow>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <Notifications/>
                    </Badge>
                </IconButton>
              </Tooltip>
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
              <Tooltip title="Manage your account" arrow>
                  <IconButton onClick={profileMenuOpen} color="inherit">
                      <AccountCircle/>
                  </IconButton>
              </Tooltip>
              <Button edge="end" variant="contained" color="secondary"  className={classes.logout}>
                  Logout
              </Button>
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
}