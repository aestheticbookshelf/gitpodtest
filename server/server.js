const path = require("path")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const stamp = new Date().getTime()
let lastStamp = null

app.get('/stamp', (req, res) => {
    lastStamp = new Date().getTime()
    res.send(`${stamp}`)
})

let welcomeMessage = "Welcome !"

app.get('/', (req, res) => {
    res.send(`
    <!doctype html>
        <head>
            <title>Reload Express Sample App</title>
        </head>
        <body>
            <h1>${welcomeMessage}</h1>            
            <script>
                let stamp = null
                let reloadStarted = false
                setInterval(_=>{
                    fetch('/stamp').then(response=>response.text().then(content=>{                        
                        if(stamp){
                            if(content != stamp) setTimeout(_=>{                                
                                if(!reloadStarted){
                                    console.log("commence reload")
                                    setInterval(_=>{
                                        fetch(document.location.href).then(response=>response.text().then(content=>{
                                            if(content.match(/Welcome/)){
                                                console.log("reloading")
                                                document.location.reload()
                                            }                                        
                                        }))
                                    }, 1000)                                
                                    reloadStarted = true
                                }                                
                            }, 500)
                        }else{
                            if(!reloadStarted){
                                stamp = content
                                console.log("stamp set to", stamp)
                            }
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
  console.log(`app listening at http://localhost:${port}`)

  devPublic = `http://localhost:${port}/`

  try{
    devPublic = require('child_process').execSync(`gp url ${port}`).toString().trim()+"/"
  }catch(err){}
  
  console.log("dev public : " + devPublic)

  setInterval(_=>{
      if((!lastStamp) || (new Date().getTime()-lastStamp>1000)){
          console.log("opening browser")
          require('open')(devPublic)
      }
  }, 2000)
})
