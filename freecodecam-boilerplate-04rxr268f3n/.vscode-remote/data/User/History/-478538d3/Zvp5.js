import 'dotenv/config.js';
import e from 'express';
import express from 'express';
//import asyncHandler from 'express-async-handler';
import * as constructs from './exercise_model.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express()
import cors from 'cors';
import bodyParser from 'body-parser';

//const mongoose = require("mongoose");


app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {
  constructs.createUser(req.body.username)
  .then(user => {
    res.status(201).json(user)
        })
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  const user = await constructs.getUserById(req.params._id)
  
  console.log(user[0])
  const exercise = await constructs.createExercise(user[0].username, req.body.description, req.body.duration, req.body.date, req.params._id)
  return res.json(exercise)
});

app.get('/api/users/:_id/logs', (req, res) => {
  //const _id = '66f4a6bd2154f428630008cf';
  constructs.getAllExercises({ userId: req.params._id })
  .then(exerciseList => {
    let log = [];
    exerciseList.forEach(item => {
      log.push({description: item["description"],duration: item["duration"],date: item["date"]});
    })
    if (req.query['from']){
      const fromDate = new Date(req.query['from']);
      log = log.filter(function(item) {
        if (Date.parse(item["date"]) >= fromDate){
          return item["date"]
        }
      })
    }
    if (req.query['to']){
      const toDate = new Date(req.query['to']);
      log = log.filter(function(item) {
        if (Date.parse(item["date"]) >= fromDate){
          return item["date"]
        }
      })
    }
    res.status(201).json({
      username: exerciseList[0]["username"], 
      _id: req.params._id, 
      count: log.length > req.query.limit ? req.query.limit : log.length,
      log: log.slice((log.length - req.query.limit) < 0 ? 0 : (log.length - req.query.limit), log.length)
  });
  })
})

app.get('/api/user', (req, res) => {
  const _id = '66f4a124898442220bbd3cca';
  constructs.getUserById(_id)
  .then(user => {
    res.status(201).json(user);
  })
})

app.get('/api/users', (req, res) => {
  const filter = {}
  constructs.getAllUsers(filter)
  .then(constructs => {
    if (constructs !== null) {
      let arr = Array.from(Object.entries(constructs), ([key, value]) => [key, value]);
      res.status(201).send(JSON.stringify(constructs));
    } else {
      res.status(404).json({ Error: 'Not found' });
    }         
  })
  .catch(error => {
    res.status(400).json({ Error: 'Request failed' });
  });
});

app.get('/api/delete', (req, res) => {
  let count = 0;
  constructs.getAllUsers({ username: { $regex: "fcc_test", $options: "i"}})
  .then(items => items.forEach(item => {
          console.log(item)
          constructs.deleteOne(item.id)
          count++
    }));
    res.send(`{deleted: ${count}}`);
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
