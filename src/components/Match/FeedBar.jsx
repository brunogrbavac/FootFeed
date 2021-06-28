import React, { Fragment } from 'react';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import offside from '../../images/offside.png';
import kit from '../../images/kit.png';
import clsx from  'clsx';


const useStyles = makeStyles((theme)=>({
    home:{

        borderColor:theme.palette.divider,
        borderTop: "0.05px solid",
        background: "linear-gradient(115deg, rgba(0,150,136,0.6951155462184874) 0%, rgba(255,255,255,0) 20%)",
        borderRadius:"5px"
    },
    away:{
        borderColor: theme.palette.divider,
        borderTop: "0.05px solid",
        background: "linear-gradient(63deg, rgba(255,255,255,0) 80%, rgba(255,97,34,0.8911939775910365) 100%)",
        alignItems:"right",
        borderRadius:"5px"
    },
    awayText:{
        textAlign:"right",
    },
    awayTextBold:{
        textAlign:"right",
        paddingRight:"0.1rem",
        [theme.breakpoints.between('sm','md')]:{
            paddingRight:"0.2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            paddingRight:"0.3rem", 
        },
        [theme.breakpoints.up('xl')]:{
            paddingRight:"0.5rem",
        }    },
    homeText:{
        paddingLeft:"0.1rem",
        [theme.breakpoints.between('sm','md')]:{
            paddingLeft:"0.2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            paddingLeft:"0.3rem", 
        },
        [theme.breakpoints.up('xl')]:{
            paddingLeft:"0.5rem",
        }
    },
    text:{
        padding:"0.2rem",
        fontSize:"0.8rem",
        fontWeight:"100",
        [theme.breakpoints.between('sm','md')]:{
          fontSize:"1rem",
          padding:"0.3rem",
        },
        [theme.breakpoints.between('md','xl')]:{
          fontSize:"1.2rem",
          padding:"0.4rem",
        },
        [theme.breakpoints.up('xl')]:{
          fontSize:"1.4rem",
          padding:"0.6rem",
        }    
    },
    boldText:{
        fontWeight:"bolder",
    },
    icon:{
        height:"1.3rem",
        padding:"0.4rem 1rem 0.4rem 0.4rem",
        [theme.breakpoints.between('sm','md')]:{
            height:"1.75rem",
            padding:"0.5rem 1.3 rem 0.5rem 0.5rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"2.3rem ",
            padding:"0.6rem 1.6rem 0.6rem 0.6rem",        
        },
        [theme.breakpoints.up('xl')]:{
            height:"2.85rem",
            padding:"0.75rem 1.8rem 0.75rem 0.75rem",        
        }
    },
    iconLeft:{
        height:"1.3rem",
        padding:"0.4rem 0.4rem 0.4rem 1rem",
        [theme.breakpoints.between('sm','md')]:{
            height:"1.75rem",
            padding:"0.5rem 0.5rem 0.5rem 1.3rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"2.3rem ",
            padding:"0.6rem 0.6rem 0.6rem 1.6rem",        
        },
        [theme.breakpoints.up('xl')]:{
            height:"2.85rem",
            padding:"0.75rem 0.75rem 0.75rem  1.8rem",        
        }
    },
}));

//----------------------------------------------------------------------------------- Ovisno o postotku rendera Zelenu ili Narančastu letvicu => za domaćina lijevo za gosta u desno (rotirana)

const FeedBar = (props) => {

    const classes = useStyles();

    return (
        <Fragment>
            {props.home?
                    <ListItem className={classes.home}>
                            <img src={offside} className={classes.icon} alt="offside"/>
                            <span className={clsx(classes.text,classes.boldText,classes.homeText)}>83'  </span>
                            <span className={clsx(classes.text,classes.boldText,classes.homeText)} style={{marginRight:"1.5rem"}}>EVENT </span>
                        <ListItemText className={classes.homeText}>

                            <span className={clsx(classes.text,classes.homeText)}>Lorem ipsum dolor sit amet, labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  </span>
                        </ListItemText>
                    </ListItem>
                    :<ListItem className={classes.away}>
                        <ListItemText className={classes.awayText}>
                            <span className={clsx(classes.text,classes.awayText)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  </span>


                        </ListItemText >                    
                        <span className={clsx(classes.text,classes.boldText,classes.awayTextBold,classes.bold)} style={{marginLeft:"1.5rem"}}>EVENT  </span>
                            <span className={clsx(classes.text,classes.boldText,classes.awayTextBold,classes.bold)}>83'  </span>   
                            <img src={kit} className={clsx(classes.icon, classes.iconLeft)}  alt="kit"/>
                    </ListItem>
            }
        </Fragment>
    );
};

export default FeedBar;


