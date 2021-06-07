// // {/* <img src={banner} alt="logo" style={{marginTop:"40vh"}} />
// // <button onClick={emitForPlayers}> Svi igrači </button>
// // <button onClick={getAllMatches}> Svi susreti </button>
// // <button onClick={createMatch}> Stvori utakmicu </button>
// // <button onClick={createEvent}> Stvori događaj </button>
// // <button onClick={getMatchEvents}> Događaji s utakmice </button>
// // <button onClick={forceUpdate}> Aržuriranje baze </button>
// // <button onClick={()=>login("user1")}> user1 </button>
// // <button onClick={()=>login("user2")}> user2 </button>
// // <button onClick={checklogin}> checklogin </button>
// // <button onClick={logout}> logout </button>
// // <p>{message}</p> */}


// import banner from './images/footfeed.png';
// import io from 'socket.io-client';
// let socket;
// import React, {useState, useEffect} from 'react';




// const [message, setMessage] = useState(()=>{});
// /*------------------------------------------------------------------------*/
//   //SOCKET svi igrači
//   const emitForPlayers = (e) => {
//     e.preventDefault(); 
//     socket.emit('/player/all',{msg:"Helloo"});
//   };

//   useEffect(()=>{
//     var connectionOptions =  {
//       "force new connection" : true,
//       "reconnectionAttempts": "Infinity", 
//       "timeout" : 10000,                  
//       "transports" : ["websocket"]
//     };
    
//     socket = io('localhost:3001',connectionOptions);
//   },[]);

//   useEffect(()=>{
//     socket.on('/player/all', (msg) => {
//       setMessage(msg);
//     });
//     socket.on('/player/all', (msg) => {
//       setMessage(msg);
//     });
//   },[message]);
//   /*-----------------------------------------------------------------*/
//   //HTTP SVI MATCHEVI
//   const getAllMatches=()=>{
//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json'},
//       credentials: 'include'
//     };

//     fetch('http://localhost:3001/match/all', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         // .then(data => {
//         //   setMessage(data); 
//         // })
//       }else{
//         setMessage("Error"); 
//         console.log('Error in fetch function '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//   /*-----------------------------------------------------------------*/
//   //Stvori match
//   const createMatch=()=>{

//     let request_body={
//       date_time: "2004-10-19T08:00:00.000Z",
//       article: "Zanimljiv okršaj na San Siru.",
//       stadium: "San Siro",
//       home_team: 608,
//       guest_team: 620
//     }

//   const requestOptions = {
//       method: 'POST',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify({...request_body}),
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/match/create', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           setMessage("Utakmica dodata."); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Error in fetch function '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//   /*-----------------------------------------------------------------*/
//   //Stvori događaj

//   const createEvent=()=>{

//     let request_body={
//       type: "Faul",
//       time: "64:32",
//       match_id: 1,
//       players_id:[14268,14269],
//       article: "Užasan prekršaj od strane ..."
//     }

//   const requestOptions = {
//       method: 'POST',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify({...request_body}),
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/event/create', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           setMessage("Događaj dodat."); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Error in fetch function '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//   /*-----------------------------------------------------------------*/
//   //Dohvat svih događaja utakmice
//   const getMatchEvents=()=>{

//     let request_body={
//       match_id: 1,
//     }

//   const requestOptions = {
//       method: 'POST',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify({...request_body}),
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/match/events', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           console.log(data);
//           setMessage("Događaji dohvaćeni."); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Error in fetch function '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//   /*-----------------------------------------------------------------*/
//   //Update baze priko API Footballa
//   const forceUpdate=()=>{

//     let request_body={
//       leagues: [210],
//       // ,2,78,39,140,135
//     }

//   const requestOptions = {
//       method: 'POST',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify({...request_body}),
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/update/', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           setMessage("Događaji dohvaćeni."); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Error in fetch function '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//   /*-----------------------------------------------------------------*/
//   //Login
//   const login=(user)=>{

//     let request_body={
//       username: user,
//       password:"Lozinka123"
//     }

//   const requestOptions = {
//       method: 'POST',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify({...request_body}),
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/log/in', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           console.log(data);
//           setMessage("Prijavljen kao " + user); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Error in fetch function '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//     /*-----------------------------------------------------------------*/
//   //checklogin
//   const checklogin=()=>{

//   const requestOptions = {
//       method: 'GET',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/log/check', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           setMessage("Prijavljen još"); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Nisi prijavljen ili greška '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//       /*-----------------------------------------------------------------*/
//   //logout
//   const logout=()=>{

//   const requestOptions = {
//       method: 'GET',
//       mode:'cors',
//       headers: { 'Content-Type': 'application/json'},
//       credentials: 'include'
//   };

//     fetch('http://localhost:3001/log/out', requestOptions)
//     .then(response => {
//       if(response.status===200)
//       {
//         Promise.resolve(response).then(response => response.json())
//         .then(data => {
//           setMessage("Odjavljen"); 
//         })
//       }else{
//         setMessage("Error"); 
//         console.log('Greška '+ response.status);
//       }
//     })
//     .catch((error)=>{
//       setMessage("Error"); 
//       console.log('Error in fetch function ');
//      });
//   };
//   /*-----------------------------------------------------------------*/
