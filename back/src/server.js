const express = require('express')
const cors = require('cors')
const app = express()
let port = "5000"

const {info, debug, warning, error} = require("./winston");
const userSQL = require("./database/UserSQL")
const fileLabel = "server"

const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute');
const spotRoute = require('./route/spotRoute');
const reviewRoute = require('./route/reviewRoute');
const loginRoute = require('./route/loginRoute');

app.use(cors())

app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/spot',spotRoute)
app.use('/review',reviewRoute)
app.use('/login',loginRoute)

/*
app.post('/login', async function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await userSQL.login(email, password);
        if (result.success) {
            debug(fileLabel, "Successful Authentication " + email);
            debug(JSON.stringify(result))
            return res.status(200).json({"success": true, "data": result}); // ログイン成功
        } else {
            info(fileLabel, "Unsuccessful Authentication " + email + ": " + JSON.stringify(result));
            return { message: '認証情報と一致するレコードがありません。' };
        }
    } catch (exception) {
        error(fileLabel, "Error in attempt to login " + email + ": " + exception);
        return { message: '認証情報と一致するレコードがありません。' };
    }
})
*/

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port:${port}`)
})