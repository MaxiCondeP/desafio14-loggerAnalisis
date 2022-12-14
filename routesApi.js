import { Router } from "express";
import compression from "compression";

export const routeRandom = Router();
import { fork } from "child_process";
import { randomNumbers } from "./utils/random.js";

import os from "os";



export const routeInfo = Router();

const gzipMiddleware= compression();

routeInfo.get('/',gzipMiddleware, (req, res) => {
    //DEVUELVO A LA PAGINA DE INFO
    res.sendFile(__dirname + "/public/info.html");
});

routeInfo.get('/info', (req, res) => {
    //Endpoint que voy a llamar desde el front a través de fetch
let args = process.argv;
let platform = process.platform;
let version = process.version;
let memory = process.memoryUsage().rss;
let path = process.execPath;
let id = process.pid;
let folder = process.cwd();
let numCPUs = os.cpus().length; 
//console.log({args, platform,version, memory, path,id, folder,numCPUs})
res.json({args, platform,version, memory, path,id, folder, numCPUs})
});



//child process
// const forked = fork("./utils/random.js");

 routeRandom.get('/randoms/:cant?', (req, res) => {
    let cant = 100000000;
    if (req.params.cant) {
         cant = req.params.cant;
    }
    res.send(randomNumbers(cant));

//     forked.send(cant);
//     forked.on('message', (msg) => {
//         res.send(msg);
//     })
 });


