const path = require("path")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(require("./server/welcome.js").welcomeMessage())
})

app.get('/static', (req, res) => {
  res.sendFile(path.join(__dirname, "server/static.html"))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  let devPublic = "http://localhost:3000"

  try{
    devPublic = require('child_process').execSync(`gp url ${port}`).toString().trim()
  }catch(err){}
  

  console.log("url:" + devPublic)
})

