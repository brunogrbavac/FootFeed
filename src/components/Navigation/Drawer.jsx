import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer,List, ListItem, ListItemText, ListItemIcon, Divider, IconButton } from '@material-ui/core';
import {ChevronLeft} from '@material-ui/icons';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';


const DrawerMenu = (props) => {

    const smallScreen = (window.innerWidth < 1200);
    const drawerWidth = smallScreen ? 240 : 360;
    
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
    }));
    
    let classes = useStyles();

    
    return(
        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={props.openDrawer} classes={{ paper: classes.paper,}}>
            <div className={classes.header}>
                <IconButton onClick={()=>props.handleDrawerClose()}>
                        <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Prva HNL', 'UEFA Champions League', 'Barclays Premier League'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><SportsSoccerIcon/></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default DrawerMenu;