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
        fontWeight:"400",
        textAlign: "justify",
        boxSizing: "border-box",
        padding:"1.2rem",
        fontSize: "0.9rem",
        [theme.breakpoints.between('sm','md')]:{
            padding: "1.7rem",
            fontSize: "1rem"
        },
        [theme.breakpoints.between('md','xl')]:{
            padding: "2.3rem",
            fontSize: "1.1rem"
        },
        [theme.breakpoints.up('xl')]:{
            padding: "3rem",
            fontSize: "1.25rem"
        }
    },
    bold:{
        fontWeight:"900",
    }
}));

//----------------------------------------------------------------------------- Samo logo i tekst za home stranicu

const Banner = () => {
    
  const classes = useStyles();

  return (
    <div>
        <Grid container justify="center" alignItems="center" style={{justifyContent:"center", marginTop:"5rem"}}>
            <Grid item xs={11} md={5}>
                <img className={classes.image} src={footfeedDouble} alt='FootFeed'/>
            </Grid>
            <Grid item xs={11} md={7}>
                <Typography className={classes.paragraph} variant="h6" color="textPrimary"><strong className={classes.bold}>FootFeed</strong> is a place for any football fan. If you want to see the <strong className={classes.bold}>statistics</strong> of your teams last match, we got you. If you want to read an <strong>article</strong> about some game, we got you. You can do all that <strong className={classes.bold}>live</strong>, while the ball is still being kicked around. It all comes to your screen, no need for refreshing. FootFeed also lets you fullfill your dream of being a pundit, sign up with your email and <strong className={classes.bold}>cover  your favorite games</strong> by yourself.</Typography>
        </Grid>        </Grid>

    </div>
  );
};

export default Banner;