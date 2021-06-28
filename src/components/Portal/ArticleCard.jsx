import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar, Typography, CardActionArea } from '@material-ui/core';
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import back from '../../images/backgroundLight.png';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'left',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: "1rem",
    [theme.breakpoints.between('sm','md')]:{
      margin: "1.5rem",
    },
    [theme.breakpoints.between('md','xl')]:{
      margin: "2rem",
    },
    [theme.breakpoints.up('xl')]:{
      margin: "2.5rem",
    }  
  },
  media: {
    height: 'auto',
    width: 'fill-available',
    maxWidth: '66%',
    minWidth:"40%",
    backgroundPositionY: 'top',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight:"1rem",
  },
  avatarSmall: {
    backgroundColor: theme.palette.secondary.main,
    height:"1.5rem",
    width:"1.5rem",
    fontSize:"1rem",
    padding: "0 !important",
  },
  actions: {
    justifyContent: 'flex-end',

  },
  textPart: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.between('sm','md')]:{
      padding: "0.5rem",
      fontSize: "1rem"
    },
    [theme.breakpoints.between('md','xl')]:{
        padding: "1rem",
        fontSize: "1.1rem"
    },
    [theme.breakpoints.up('xl')]:{
        padding: "1.5rem",
        fontSize: "1.25rem"
    }
  },
  feature:{
    fontSize: "0.8rem",
    paddingTop:"1rem",
    [theme.breakpoints.between('sm','md')]:{
      fontSize: "1.1rem"
    },
    [theme.breakpoints.between('md','xl')]:{
        fontSize: "1.25rem"
    },
    [theme.breakpoints.up('xl')]:{
        fontSize: "1.5rem"
    }
  },
  article:{
    fontSize: "0.5rem",
    [theme.breakpoints.between('sm','md')]:{
      fontSize: "0.625rem"
    },
    [theme.breakpoints.between('md','xl')]:{
        fontSize: "0.75rem"
    },
    [theme.breakpoints.up('xl')]:{
        fontSize: "0.875rem"
    }  
  },
  competition:{
    padding:"0rem 0 0.75rem 0",
    fontSize: "0.65rem",
    [theme.breakpoints.between('sm','md')]:{
      fontSize: "0.7rem"
    },
    [theme.breakpoints.between('md','xl')]:{
        fontSize: "0.85rem"
    },
    [theme.breakpoints.up('xl')]:{
        fontSize: "1rem"
    }  
  },
}));

//----------------------------------------------------------------------------------- Kartica koja predstavlja članak na home pageu


const ArticleCard = (props) => {

    const classes = useStyles(); //DODAJ KLIK I LINK slike

    return (
        <Card className={classes.root}>
                <CardMedia className={classes.media} image={ (props.match.photos.length>0)?`http://localhost:3001/photo/get/${props.match.photos[0].id}`:back} title="Match"/>
                <div className={classes.textPart}>
                    <CardActionArea >
                    <Link to={`/match/${props.match.match_id}`}>
                        <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.feature}>
                                    {`${props.match.home_team.name} VS. ${props.match.guest_team.name}`}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="p" className={classes.competition}>
                                    {props.match.competition.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.article}>
                                    {props.match.article.length>150?`${props.match.article.slice(0,140)} ...`:(props.match.article + "..." + '\u00A0'.repeat(150-props.match.article.length))}
                                </Typography>
                        </CardContent>
                    </Link>
                    </CardActionArea>
                        <CardActions className={classes.actions} disableSpacing>
                                {window.innerWidth<=850 && <CardHeader avatar={ <Avatar aria-label="Author" className={classes.avatarSmall}> { props.match.user.username[0].toUpperCase()} </Avatar> } />}
                                <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                {window.innerWidth>850 && <CardHeader avatar={ <Avatar aria-label="Author" className={classes.avatar}> { props.match.user.username[0].toUpperCase()} </Avatar> }  title={props.match.user.username} subheader={props.match.date_time}/>}
                        </CardActions>
                </div>
        </Card>
    );
};

export default ArticleCard;
