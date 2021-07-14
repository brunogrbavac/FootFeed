import React, { useState, useEffect, Fragment } from 'react';
import ArticleCard from './ArticleCard';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core/';
import results from '../../images/results.png';

const useStyles = makeStyles ((theme) => ({
    resultImg:{
        margin: "8rem 0 3rem 0",
        width:"35%",
    },
    text:{
        margin: "8rem 0 0 0",
        fontSize:"1.3em", 
        fontStyle:"italic", 
        color:theme.palette.text.primary
    },
    loader:{
        margin:"5rem 0 0 0",
    }
  }));

//----------------------------------------------------------------------------------- Dohvaća sve utakmice i puni home page = svi su učitani ali nisu svi prikazani


const HTTPMatches = ( setMatches, setCount, setVisible, perPage, type, value, setLoading  ) => { 

    const requestOptions = {
        method: 'GET',
        mode:'cors',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      };

    fetch(`http://localhost:3001/match/all`, requestOptions)
    .then((response)=>{
        if(response.status===200)
        {
            Promise.resolve(response).then(response => response.json())
            .then(data => {
                let arr = filter(setMatches , data, type, value, setLoading  ); 
                setCount((arr.length + perPage - (arr.length%perPage))/perPage);
                let art = [];
                for ( let i=0; i<perPage; i++){
                    if(arr[i]) art.push(<ArticleCard match={arr[i]}/>);
                };
                setVisible(art);
            });     
        }
    }).catch((error)=> { console.log('Error in fetch Matches function '+ error);});
}

//----------------------------------------------------------------------------------- Filtrira dohvaćene članke ovisno o URI-ju

const filter = ( setArticles, articles, type, value, setLoading ) => {
    console.log(type);
    console.log(value);
    let art = [];
    switch(type){
        case "any":
            for(let match of articles){
                let bunch = match.home_team.name + ' ' + match.guest_team.name + ' ' + match.competition.name + ' ' + match.article;
                if( bunch.toUpperCase().includes(value.toUpperCase())) art.push(match);
            };
            break;
        case "competition":
            console.log("evooo");
            for(let match of articles){
                if( match.competition.name.toUpperCase().includes(value.toUpperCase())) art.push(match);
            };
            console.log("evooo");
            break;
        case "team":
            for(let match of articles){
                let bunch = match.home_team.name + ' ' + match.guest_team.name ;
                if( bunch.toUpperCase().includes(value.toUpperCase())) art.push(match);
            };
            break;
        case "article":
            for(let match of articles){
                if( match.article.toUpperCase().includes(value.toUpperCase())) art.push(match);
            };
            break;
    }; 

    setArticles(art);
    setLoading(false);
    return art;
};

//----------------------------------------------------------------------------------- 


const FilteredArticles = (props) => {

    const articlesPerPage = 5;
    const [ articles, setArticles ] = useState(()=>[]);
    const [ articlesToShow, setArticlesToShow] = useState(()=>[]);
    const [ count, setCount] = useState(()=>1);
    const [ loading, setLoading] = useState(()=>true);
    const classes = useStyles();

    useEffect(() => {
        HTTPMatches( (value) => setArticles(value), (value) => setCount(value),  (value) => setArticlesToShow(value), articlesPerPage, props.match.params.type, props.match.params.value, setLoading);
    },[props.match.params]); // eslint-disable-line react-hooks/exhaustive-deps 
    //Ovo mice warning da nije naveden articelsPerPage dependency

    const onPageChange = (page) => {
        let art = [];
        for (let i=(page-1)*articlesPerPage-1; i<(page)*articlesPerPage; i++){
            if(articles[i]) art.push(<ArticleCard match={articles[i]}/>);
        };
        setArticlesToShow(art);
    };


    return (
        <Fragment> {/*Koristi kako se ne bi dodava prazan div u DOM stablo - samo omot */}
                <img src={results} alt="results" className={classes.resultImg}/>
                {loading?
                   <div><CircularProgress className={classes.loader}/></div> :
                        <Fragment> 
                        {articlesToShow.length!==0?
                            <Fragment> 
                                {articlesToShow}
                                <Pagination count={count} onChange={(e,page)=> onPageChange(page)} showFirstButton showLastButton color="secondary" size="large" style={{width:"100%", padding:"3rem 0"}}/> 
                            </Fragment>
                            :<p className={classes.text}>No matches to show.</p>
                        }
                    	</Fragment>
                }
                {/*Dodaj ako je prazno.*/}
                {/*Specifičan onChange za pagination */}
        </Fragment>
    );
};

export default FilteredArticles;
