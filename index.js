const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const {User} = require("./models/user")
const config = require("./config/key")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connect...')).catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

app.post('/register', (req,res) => {
    //회원가입에 필요한 정보를 Client에서 가져오면 데이터베이스에 insert
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})

    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`) 
})