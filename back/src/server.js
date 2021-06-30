const express = require('express')
const cors = require('cors')
const app = express()
let port = process.env.PORT　|| "5000"

const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute');
const spotRoute = require('./route/spotRoute');
const reviewRoute = require('./route/reviewRoute');
const loginRoute = require('./route/loginRoute');
const imageRoute = require('./route/imageRoute')

app.use(cors())

app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/spot',spotRoute)
app.use('/review',reviewRoute)
app.use('/login',loginRoute)
app.use('/upload',imageRoute)

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port:${port}`)
})