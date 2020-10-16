const path = require("path")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send(`
    <!doctype html>
<html>
  <head>
    <title>Reload Express Sample App</title>
  </head>
  <body>
    <h1>${require('./server/welcome.js').welcomeMessage()}</h1>
    <!-- All you have to do is include the reload script and have it be on every page of your project -->
    <!-- You do not create this route, reload creates it for you automatically -->
    <script src="/reload/reload.js"></script> 
  </body>
</html>
    `)  
})

app.get('/static', (req, res) => {
  res.sendFile(path.join(__dirname, "server/static.html"))
})

require('reload')(app).then(rr_=>{

    app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  let devPublic = "http://localhost:3000"

  try{
    devPublic = require('child_process').execSync(`gp url ${port}`).toString().trim()
  }catch(err){}
  

  console.log("url:" + devPublic)
})

})


