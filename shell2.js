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
        puppeteer: { headless: false },
        // args: ['--no-sandbox']
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
        console.log(all[x])
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
    console.log(req.params)
    try {
        all[req.body.mgm3].client.sendMessage(req.body.number + "@c.us", req.body.msg);
        res.send({status:200});

    } catch (error) {
        res.send({status:404,reason:error});

    }
})
server.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})