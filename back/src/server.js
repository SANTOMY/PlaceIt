const express = require('express')
const app = express()
let port = "3000"


const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute');
//const spotRoute = require('./route/spotRoute');
const reviewRoute = require('./route/reviewRoute');

app.use(bodyParser.json())
app.use('/user',userRoute)
//app.use('/spot',spotRoute)
app.use('/review',reviewRoute)

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port:${port}`)
})