import React, { Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import FeedBar from './FeedBar';

// const useStyles = makeStyles((theme)=>({
//     empty:{
//         height:"2rem",
//         [theme.breakpoints.between('sm','md')]:{
//             height:"3rem",
//         },
//         [theme.breakpoints.between('md','xl')]:{
//             height:"3.5rem",
//         },
//         [theme.breakpoints.up('xl')]:{
//             height:"4rem",
//         }
//     },
// }));

//----------------------------------------------------------------------------------- Za svaki tip togađaja se rendera njegova statistika = 2 stats letvice

const FeedTab = (props) => {

    return(
        <Fragment>
            {
                props.events.map( event => {
                    return <FeedBar event={event}/>
                })
            }
        </Fragment>
    );
};

export default FeedTab;