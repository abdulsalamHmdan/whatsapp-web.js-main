// const repl = require('repl');

const { Client, LocalAuth } = require('./index');
const express = require("express");
const app = express();
const path = require("path");
const port = 2020;
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
let all = {};





// loop
let almgmaat = ["zeed", "osamah"];
almgmaat.forEach((x, i) => {
    const client = new Client({
        puppeteer: { headless: true,args: ['--no-sandbox'] },
        // authStrategy: new LocalAuth(),
    });
    all[x] = {
        client: client,
        ready: false,
        qr: ''
    }
})
almgmaat.forEach((x, i) => {
    console.log('Initializing...');

    all[x].client.initialize();



    all[x].client.on('qr', (qr) => {
        console.log('Please scan the QR code on the browser.');
        all[x].qr = qr;
    });


    // client.on('authenticated', (session) => {
    //     console.log(session);
    //     console.log(JSON.stringify(session));
    // });

    all[x].client.on('ready', () => {
        all[x].ready = true
        console.log("ready")
        // client.sendMessage("966507499583@c.us", 'from' + i);
        // const shell = repl.start('wwebjs> ');
        // shell.context.client = client;
        // shell.on('exit', async () => {
        //     await client.destroy();
        // });
    });

    all[x].client.on('disconnected', (reason) => {
        all[x].ready = false;
        all[x].client.destroy();
        console.log('Initializing...');
        all[x].client.initialize();
    });
})

app.get('/', (req, res) => {
    res.sendFile('public/qrRead.html', { root: '.' })
})
app.post('/qr', (req, res) => {
    console.log(req.body.mgm3);
    res.send(all[req.body.mgm3].qr);
})
app.post('/send', (req, res) => {
    try {
        all[req.body.mgm3].client.sendMessage(req.body.number + "@c.us", req.body.msg);
        res.send("done");

    } catch (error) {
        res.send("no result");

    }
})
app.post('/test', (req, res) => {
    // console.log(req.params)
    res.send(req.body);
})
server.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})