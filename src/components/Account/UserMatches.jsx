import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { SlowMotionVideo as PlayIcon, Edit as EditIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { matchLoaded } from '../../redux/actions/toEdit';

const useStyles = makeStyles((theme)=>({
    root:{
        marginTop:"10rem",
        height:"500px",
        width:"100%",
    },
    buttonLive:{
        backgroundColor:"red",
        color:"white",
        "&:hover":{
            backgroundColor:"darkred",
        }
    }
}));

//----------------------------------------------------------------------------------- Dohvaća sve utakmice i puni home page = svi su učitani ali nisu svi prikazani


const HTTPUsersMatches = ( setMatches, setLoading ) => { 

    const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

    fetch(`http://localhost:3001/match/user`, requestOptions)
    .then((response)=>{
        if(response.status===200)
        {
            Promise.resolve(response).then(response => response.json())
            .then(data => {
                setMatches(data); 
                setLoading(false); 
            });     
        }
    }).catch((error)=> { console.log('Error in fetch users matches function '+ error);});
}


//----------------------------------------------------------------------------------- Komponenta koja uzima 2 vrijednosti i za poziva StatsBar (bar chart) komponentu

// const CustomPagination = () => { //https://material-ui.com/components/data-grid/components/#getting-props
//     const { state, apiRef } = useGridSlotComponentProps();
//     const classes = useStyles();
  
//     return (
//       <Pagination className={classes.root} color="primary" count={state.pagination.pageCount} page={state.pagination.page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)}  showFirstButton showLastButton color="secondary" size="large" style={{display:"flex"}} />
//     );
// };

// //----------------------------------------------------------------------------------- Komponenta koja uzima 2 vrijednosti i za poziva StatsBar (bar chart) komponentu

const UserMatches = (props) => {

    const [matches, setMatches] = useState(()=>[]);
    const [loading, setLoading] = useState(()=>true);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        HTTPUsersMatches( setMatches, setLoading );
    },[]);

    const renderLive = ( match_id, date ) => {
        //sendStart live if 200
        const startLive = () => {
            const requestOptions = {
                method: 'GET',
                mode:'cors',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include'
            };
        
            fetch(`http://localhost:3001/match/live/${match_id}`, requestOptions)
            .then((response)=>{
                if(response.status===200)
                {
                    props.history.push(`/match/${match_id}`);
                }
            }).catch((error)=> { console.log('Error in fetch users matches function '+ error);});        
        };

        // const rightNow = ;
        // const matchDate = ;
        // const late = matchDate - rightNow;
        const disabled = new Date(date)- new Date() < 600000; //10 minuta

        return(
            <Button variant="contained" color="secondary"  disabled={disabled} onClick={()=>startLive()} endIcon={<PlayIcon/>}> Go Live </Button>
        );
    };

    const renderEdit = ( match_id ) => {
        let j;
        for(let i=0; i<matches.length; i++){
            if(match_id === matches[i].match_id) j = i;
        };

        const startEdit = () => {
            dispatch( matchLoaded({match_id:matches[j].match_id, headline:matches[j].headline, article:matches[j].article, stadium:matches[j].stadium, date_time:matches[j].date_time, photos: matches[j].photos}));
            props.history.push('/match/edit');
        };

        return(
            <Button variant="contained" color="primary" onClick={()=>startEdit()} endIcon={<EditIcon/>}>Edit</Button>
        );
    };
  
    const rows = matches.map( match => {
        return ({
            id: match.match_id,
            home: match.home_team.name,
            guest: match.guest_team.name,
            competition: match.competition.name,
            date: new Intl.DateTimeFormat('en-UK', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(match.date_time)) ,
        })
    });


    const columns = [
        { field: 'id', headerName:'id', headerAlign:'center', align:'center', renderHeader: () => (<strong>{"ID"}</strong>)},
        { field: 'home', headerName:'home', width:200, type:'string', headerAlign:'center', align:'center', renderHeader: () => (<strong>{"Home"}</strong>),},
        { field: 'guest', headerName:'guest', width:200, type:'string', headerAlign:'center', align:'center', renderHeader: () => (<strong>{"Guest"}</strong>),},
        { field: 'competition', headerName:'Competition', width:200, type:'string', headerAlign:'center', align:'center'},
        { field: 'date', headerName:'Date', width:200, type:'string', headerAlign:'center', align:'center'},
        { field: 'edit', headerName:` `, width:150, disableColumnMenu:true, sortable:false, headerAlign:'center', align:'center', renderCell:(params)=> renderEdit(params.getValue(params.id, 'id'))},
        { field: 'live', headerName:` `, width:150, disableColumnMenu:true, sortable:false, headerAlign:'center', align:'center',  renderCell:(params)=>(renderLive(params.getValue(params.id,'id'),params.getValue(params.id, 'date')))},
    ];

  return(
    <div className={classes.root}  style={{height:"500px"}}>
      {
        loading? null:<DataGrid disableSelectionOnClick={true} pageSize={10} rows={rows} columns={columns} pagination /> //components={{ Pagination: CustomPagination,}}
      }
    </div>    
)
};

export default UserMatches;
