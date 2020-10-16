let process
let url

function spawnserver(){
    process = require('child_process').spawn("node", ["server.js"])

    process.stdout.on('data', (data) => {    
    let m
    if(m=data.toString().match(/url:([^\s]*)/)){
        url = m[1]
        console.log("opening", url)
        //require('open')(url)
    }
    });

    process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });
}

spawnserver()

const watcher = require("chokidar").watch("./server")

watcher.on("ready", _=>{    
    watcher.on("all", _=>{      
        console.log("changed")
        process.kill()
        spawnserver()
    })
})