'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ObjectID } = require('mongodb');

const passportSocketIo = require('passport.socketio');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const URI = process.env.MONGO_URI;
const store = 

const routes = require('./routes.js');
const auth = require('./auth.js');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

fccTesting(app); // For fCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

myDB(async client => {
  
  const myDataBase = await client.db('fcc_exercise_db').collection('users');
  
  routes(app, myDataBase);
  auth(app, myDataBase);

  let currentUsers = 0;

  io.on('connection', socket => {
    console.log('A user has connected');
    currentUsers++;
    io.emit('user count', currentUsers);

    socket.on('disconnect', () => {
      console.log('A user has disconnected');
      currentUsers--;
      io.emit('user count', currentUsers);
    })
  });

}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('index', { title: e, message: 'Unable to connect to database' });
  });
});


  
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  
});