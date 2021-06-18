import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar, Typography } from '@material-ui/core';
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@material-ui/icons';
import back from '../../images/backgroundLight.png';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2.5rem",
    textAlign:'left',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  media: {
    height: 'auto',
    width: 'fill-available',
    maxWidth: '66%',
    backgroundPositionY: 'top',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  actions: {
    justifyContent: 'flex-end'
  },
  textPart: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

//----------------------------------------------------------------------------------- Kartica koja predstavlja članak na home pageu


const ArticleCard = (props) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
                <CardMedia className={classes.media} image={ (props.match.photos.length>0)?`http://localhost:3001/photo/get/${props.match.photos[0].id}`:back} title="Match"/>
                <div className={classes.textPart}>
                        <CardHeader avatar={ <Avatar aria-label="Author" className={classes.avatar}> { props.match.user.username[0].toUpperCase()} </Avatar> }  title={props.match.user.username} subheader={props.match.date_time}/>
                        <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {`${props.match.home_team.name} VS. ${props.match.guest_team.name}`}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="p" style={{padding:"0rem 0 0.75rem 0"}}>
                                    {props.match.competition.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.match.article.length>150?`${props.match.article.slice(0,140)} ...`:(props.match.article + "..." + '\u00A0'.repeat(150-props.match.article.length))}
                                </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableSpacing>
                                <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                        </CardActions>
                </div>
        </Card>
    );
};

export default ArticleCard;
