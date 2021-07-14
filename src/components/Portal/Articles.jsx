import React, { useState, useEffect, Fragment } from 'react';
import ArticleCard from './ArticleCard';
import { Pagination } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';

//----------------------------------------------------------------------------------- Dohvaća sve utakmice i puni home page = svi su učitani ali nisu svi prikazani


const HTTPMatches = ( setMatches, setCount, setVisible, perPage ) => { 

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
                setMatches(data); 
                setCount((data.length + perPage - (data.length%perPage))/perPage);
                let art = [];
                for ( let i=0; i<perPage; i++){
                    if(data[i]) art.push(<ArticleCard match={data[i]}/>);
                };
                setVisible(art);
            });     
        }
    }).catch((error)=> { console.log('Error in fetch Matches function '+ error);});
}

//----------------------------------------------------------------------------------- Dohvaćene utakmice prikazuje kao članke = kartice na home pageu


const Articles = (props) => {

    const articlesPerPage = props.perPage;
    const [ articles, setArticles ] = useState(()=>[]);
    const [ articlesToShow, setArticlesToShow] = useState(()=>[]);
    const [ count, setCount] = useState(()=>1);
    const theme = useTheme();

    useEffect(() => {
        HTTPMatches( (value) => setArticles(value), (value) => setCount(value),  (value) => setArticlesToShow(value), articlesPerPage);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps 
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
                {articlesToShow.length!==0?
                    <Fragment> 
                        {articlesToShow}
                        <Pagination count={count} onChange={(e,page)=> onPageChange(page)} showFirstButton showLastButton color="secondary" size="large" style={{width:"100%", padding:"3rem 0"}}/> 
                    </Fragment>
                    :<p style={{fontSize:"1.3em", fontStyle:"italic", color:theme.palette.text.primary}}>No matches to show.</p>
                }
                {/*Dodaj ako je prazno.*/}
                {/*Specifičan onChange za pagination */}
        </Fragment>
    );
};

export default Articles;
