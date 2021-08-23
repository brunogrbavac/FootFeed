# FootFeed

This is a React.js web app made as a bachelors degree project. 

## About

An application that allows users to share staistic data, articles and photos about football matches using the [Football API](https://developer.marvel.com/) for updated roster and competitions data.


## Getting Started

### Installing

After cloning this repository you need to install the dependencies named in the package.json file by executing this command:

```
npm install
```

### Running the app

Position yourself into the "backend/footfeed" folder and run the following command to start the server application on http://localhost:3000/
```
nodemon app.js
```

Position yourself into the "frontend/footfeed" folder and run the following command to start the client application on http://localhost:3001/
```
npm start
```

## How to use
* Register to share your match experience or read about games from other users as a guest. Match datais updated live ony our screen using Socket.IO  


![Home page](https://i.ibb.co/zfJ8h7X/image.png)
![Article](https://i.ibb.co/Lzcfd3v/image.png)  
![Feed](https://i.ibb.co/hDntg6c/image.png)  
![Statistics](https://i.ibb.co/z2vTWdb/image.png)


* Search trough matches by team, league or text.  


![Search](https://i.ibb.co/cbz3ySq/image.png)


* When logged in you can write about a new match trough the speed dial navigation.  



![Add a match](https://i.ibb.co/XS8xMNn/image.png)



* Adding an event to match statistics includes selecting the event type and actors.  



![Add an event 1](https://i.ibb.co/9ZZ8GK4/image.png)

![Add an event 2](https://i.ibb.co/Cv58zyw/image.png)


