const express = require('express')
const fs = require('fs')
const https = require('https')
const dotenv = require('dotenv');
const env = dotenv.config();
const cors = require('cors')
const path = require('path')
const app = express()
let port = "5000"


const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute');
const spotRoute = require('./route/spotRoute');
const reviewRoute = require('./route/reviewRoute');

app.use(cors())

app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/spot',spotRoute)
app.use('/review',reviewRoute)



app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})


https.createServer({
  key: fs.readFileSync(path.join(__dirname, '..','key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '..','cert.pem')),
  passphrase: 'SuperStrongPassword'
},app).listen(port, () =>{
  console.log(`Example app listening on port:${port}`)
})