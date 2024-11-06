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

app.post('/api/shorturl/', function(req, res) {  
  try {
    const newUrl = new URL(req.body.url);
    if (newUrl.protocol === "https" || )

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
  if (Object.keys(urlList).includes(newUrl)){
    res.json({original_url : newUrl, short_url : urlList[newUrl]});
    console.log("existing", newUrl, urlList[newUrl])
  } else {
    const objLength = Object.keys(urlList).length-1;
    urlList[newUrl] = objLength + 1;
    try {
      // reading a JSON file synchronously
      fs.writeFileSync(jsonFile, JSON.stringify(urlList));
    } catch (error) {
      // logging the error
      console.error(error);
    
      throw error;
    }
    res.json({original_url : newUrl, short_url : urlList[newUrl]})
    console.log("new", newUrl, urlList[newUrl])
  }
} catch (error) {
  res.json({ error: 'invalid url' })
};
  
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
    console.log(typeof req.params._id, typeof urlList[item].toString(), item);
    if (urlList[item].toString() === req.params._id){
      console.log("found", item);
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
