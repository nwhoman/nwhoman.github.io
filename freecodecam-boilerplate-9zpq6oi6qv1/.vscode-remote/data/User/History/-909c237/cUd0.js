require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const fs = require('fs');
const jsonFile = 'data.json';
let data = '';
var bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const options = {
    
  // Setting family as 6 i.e. IPv6
  all:true
};
app.post('/api/shorturl/', function(req, res) {  
  
  try {
    // reading a JSON file synchronously
  data = fs.readFileSync(jsonFile);
  } catch (error) {
    // logging the error
    console.error(error);
  
    throw error;
  }
  
  // parsing the JSON content
  const urlList = JSON.parse(data);
  
  // logging the content read from a file
  if (Object.keys(urlList).includes(req.body.url)){
    res.json({original_url : req.body.url, short_url : urlList[req.body.url]});
    console.log("existing", req.body.url, urlList[req.body.url])
  } else {
    const objLength = Object.keys(urlList).length-1;
    urlList[req.body.url] = objLength + 1;
    try {
      // reading a JSON file synchronously
      fs.writeFileSync(jsonFile, JSON.stringify(urlList));
    } catch (error) {
      // logging the error
      console.error(error);
    
      throw error;
    }
    res.json({original_url : req.body.url, short_url : urlList[req.body.url]})
    console.log("new", req.body.url, urlList[req.body.url])
  }
  
  
});
app.get("/api/shorturl/:_id", (req, res) => {
  try {
    // reading a JSON file synchronously
  data = fs.readFileSync(jsonFile);
  } catch (error) {
    // logging the error
    console.error(error);
  
    throw error;
  }
  
  // parsing the JSON content
  const urlList = JSON.parse(data);
  for (item in urlList){
    if (urlList[item] === req.params._id.toString()){
      console.log(item);
      res.redirect(item);
    }
  }
  console.log("params", req.params)
})

  const originalLink = "www.google.com";
  const apiUrl = 'https://ulvis.net/api/read/post?url=https://www.youtube.com/watch';
  /*fetch(apiUrl)
    //.then(response => response.json())
    .then(data => {
                    
      //console.log("data", data);
                    //res.json({"ipAddress": data.ip, "language": language, "software": software});
                })
                .catch(error => {
                    console.error("Error fetching IP address:", error);
                });
      
})*/
  //dns.lookup('www.google.com', options, (err, addresses) =>
    //console.log('addresses: %j', addresses));
  

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
