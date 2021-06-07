import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography} from '@material-ui/core';
import footfeedDouble from '../images/footfeedDouble.png'


const useStyles = makeStyles((theme) => ({
    image: {
        padding: "3rem",
        width: "fill-available",
        boxSizing: "border-box",
    },
    paragraph: {
        padding: "3rem",
        textAlign: "justify",
        boxSizing: "border-box",
    },
}));

const Banner = () => {
    
  const classes = useStyles();

  return (
    <div>
        <Grid container justify="center" alignItems="center" style={{justifyContent:"center", marginTop:"5rem"}}>
            <Grid item xs={11} md={5}>
                <img className={classes.image} src={footfeedDouble} alt='FootFeed'/>
            </Grid>
            <Grid item xs={11} md={7}>
                <Typography className={classes.paragraph} variant="h6" color="textPrimary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            </Grid>
        </Grid>
    </div>
  );
};

export default Banner;