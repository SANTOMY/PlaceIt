const express = require('express')
const app = express()
let port = "3000"


const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute');
const spotRoute = require('./route/spotRoute');

app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/spot',spotRoute)

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port:${port}`)
})