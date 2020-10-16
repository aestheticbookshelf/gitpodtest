const path = require("path")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const stamp = new Date().getTime()

app.get('/stamp', (req, res) => {
    res.send(`${stamp}`)
})

let welcomeMessage = "Welcome !!"

app.get('/', (req, res) => {
    res.send(`
    <!doctype html>
        <head>
            <title>Reload Express Sample App</title>
        </head>
        <body>
            <h1>${welcomeMessage}</h1>
            <!-- All you have to do is include the reload script and have it be on every page of your project -->
            <!-- You do not create this route, reload creates it for you automatically -->    
            <script>
            let stamp = null
            setInterval(_=>{
                fetch('/stamp').then(response=>response.text().then(content=>{
                    console.log(content)
                    if(stamp){
                        if(content != stamp) setTimeout(_=>document.location.reload(), 200)
                    }else{
                        stamp = content
                    }
                }))
            }, 200)    
            </script>
        </body>
    </html>
    `)  
})

let devPublic

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  devPublic = `http://localhost:${port}`

  try{
    devPublic = require('child_process').execSync(`gp url ${port}`).toString().trim()
  }catch(err){}
  
  console.log("dev public : " + devPublic)
})
