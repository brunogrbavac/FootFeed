import React/*, { useState }*/ from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Carousel  from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { imagesLoaded } from '../../redux/actions/gallery';

const useStyles = makeStyles((theme) => ({
    whole:{
        padding:"0.15rem 0 0 0",
        [theme.breakpoints.between('sm','md')]:{
            padding:"0.3rem 1.2rem 0 1.2rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            padding:"0.7rem 2rem 0 2rem",
        },
        [theme.breakpoints.up('xl')]:{
            padding:"1.1rem 2.4rem 0 2.4rem",
        }
    },
    headline:{
        textAlign:"left",
        whiteSpace:"pre-line",
        fontWeight:"500",
        fontSize:"1.2rem",
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"1.6rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            fontSize:"1.9rem",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize:"2.25rem",
        }
    },
    body:{
        textAlign:"justify",
        whiteSpace:"pre-line",
        fontSize:"0.8rem",
        lineHeight:"1.5rem",
        [theme.breakpoints.between('sm','md')]:{
            fontSize:"0.95rem",
            lineHeight:"1.9rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            fontSize:"1.05rem",
            lineHeight:"2.2rem",
        },
        [theme.breakpoints.up('xl')]:{
            fontSize:"1.25rem",
            lineHeight:"2.5rem",
            paddingTop:"0.4rem",
        }
    },
    gal:{
        // backgroundColor: theme.palette.background.default,
        margin:"2.5rem auto 2rem auto",
        maxWidth: "19rem",
        minWidth: "19rem",
        [theme.breakpoints.between('sm','md')]:{
            margin:"3.5rem auto 2rem auto",
            maxWidth: "24.5rem",
            minWidth: "24.5rem",
        },
        [theme.breakpoints.between('md','lg')]:{            
            margin: "4rem auto 3rem auto",
            maxWidth: "37rem",
            minWidth: "37rem",
        },
        [theme.breakpoints.between('lg','xl')]:{
            maxWidth: "48.44rem",
            minWidth: "48.44rem",
            margin: "4rem auto 3rem auto"
        },
        [theme.breakpoints.up('xl')]:{
            margin:"5rem auto 4rem auto",
            maxWidth: "53.5rem",
            minWidth: "53.5rem",
        }
    },
    image:{
        objectFit: "cover",
        maxHeight: "9rem",
        maxWidth: "16rem",
        width: "fill-available", 
        objectPosition: "top",
        overflow: "hidden",
        borderRadius: "3px",
        [theme.breakpoints.between('sm','md')]:{
            maxHeight: "15rem",
            maxWidth: "21rem",
        },
        [theme.breakpoints.between('md','lg')]:{
            maxHeight: "20rem",
            maxWidth: "33rem",
        },
        [theme.breakpoints.between('lg','xl')]:{
            maxHeight: "25rem",
            maxWidth: "44.44rem",
        },
        [theme.breakpoints.up('xl')]:{
            maxHeight: "30rem",
            maxWidth: "49rem",
        }
    },
    nav:{
        height:"2rem",
        width:"2rem",
        [theme.breakpoints.between('sm','md')]:{
            height:"3rem",
            width:"3rem",
        },
        [theme.breakpoints.between('md','xl')]:{
            height:"8rem",
            width:"8rem",
        },
        [theme.breakpoints.up('xl')]:{
            height:"10rem",
            width:"10rem",
        }      
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'yellowff',
    },
}));

const ArticleTab = (props) => {


    const theme = useTheme();
    const dispatch = useDispatch();
    const darkMode = useSelector( store => store.darkMode );
    const classes = useStyles();
    // const [ open, setOpen ] = useState(()=>false);


    let photos = [];
    for( let photo of props.photos){
        photos.push(`http://localhost:3001/photo/get/${photo.id}`);
    };

    return(
        <Grid container  className={classes.whole}>
                <Grid item xs={12} >
                        <Typography variant="h4" className={classes.headline}>
                            {props.headline}
                                {/* Šibenik poražen od Hajduka na Šubićevcu, Bijelima pobjedu donijeli Livaja i Jakoliš. */}
                        </Typography>
                </Grid>
                <br/>
                <br/>
                <Grid item xs={12} className={classes.gal}>
                        <Carousel navButtonsAlwaysVisible={true} interval={2000} timeout={300}

                            activeIndicatorIconButtonProps={{ style: {
                                    backgroundColor: theme.palette.secondary.main, // 2 grey[100]
                                    color: theme.palette.secondary.light
                            }}}
                            indicatorIconButtonProps={{ style: {
                                    margin: '7px',    // 1
                                    backgroundColor: theme.palette.primary.main, // 2 grey[500]
                                    color: theme.palette.primary.light
                            }}}
                            fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                                style: {
                                    backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                                    borderRadius: "50%",
                                    width: ((window.innerWidth<600) ? "1.7rem" : ((window.innerWidth>=600 && window.innerWidth<960) ? "2.3rem" : ((window.innerWidth>=960 && window.innerWidth<1280)? "2.6rem": "3.2rem") ) ),
                                    height: ((window.innerWidth<600) ? "1.7rem" : ((window.innerWidth>=600 && window.innerWidth<960) ? "2.3rem" : ((window.innerWidth>=960 && window.innerWidth<1280)? "2.6rem": "3.2rem") ) ),
                            }}} 
                        >
                            {
                                (photos.length>0) && photos.map( (photo) =><div><img className={classes.image} src={photo} onClick={()=>dispatch(imagesLoaded(photos))}  alt="Gallery from the match."/></div> )
                            }
                        </Carousel>
                </Grid>
                <br/>
                <br/>
                <Grid item xs={12}>
                        <Typography className={classes.body} >
                            {props.article.replaceAll("\\n","\n")}
                                {/* {`Nogometaši Hajduka ostali su u igri za plasman u Europu nakon što su u susretu 35. kola Prve HNL na gostovanju pobijedili Šibenik sa 2-0.Pobjedu Splićanima donijeli su Marko Livaja (57) i Marin Jakoliš (71).Šibenik, koji je bezbrižan na šestom mjestu, je prvi zaprijetio. U trećoj minuti sa 20-tak metara je pucao Sahiti, ali je pucao pored gola. U osmoj minuti udarac je okušao i Deni Jurić, ali niti on nije bio precizan.
                                Hajduk je prvu priliku imao u 14. minuti. Vušković je imao slobodnjak sa 20-ak metara, ali je i on loše pucao.Gosti su u 29. minuti imali sjajnu priliku. Fossati je poslao dugačku loptu prema Livaji, međutim napadač Hajduka nije najbolje reagirao. Samo tri minute kasnije Šibenik je imao zicer. Suad Sahiti je izbio sam pred Kalinića i zaobišao ga, a  onda iz teškog kuta umjesto praznoga gola pogodio vratnicu.
                                Pogodak smo napokon vidjeli u 57. minuti, Biuk je ubacio iz kornera, a Livaja glavom zabio za vodstvo Bijelih.
                                
                                Šibenik je bio blizu izjednačenja u 67. minuti, kada je s ruba kaznenog prostora pucao Alvaro Martin, no Kalinić je odbio u korner.
                                Korak bliže pobjedi Hajduk je stigao u 71. minuti povećavši prednost na 2-0. Jurić je sjajno proigrao Jakoliša koji je izašao sam pred Rogića i zabio za 2-0.`} */}
                        </Typography>
                </Grid>
        </Grid>

    );
};

export default ArticleTab;