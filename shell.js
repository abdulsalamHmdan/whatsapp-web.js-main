// const repl = require('repl');

const { Client, LocalAuth } = require('./index');
let aa = [];
let almgmaat = ["zeed","osamah","othman"];
for (let i = 0; i < 2; i++) {
    const client = new Client({
        puppeteer: { headless: false },
        // authStrategy: new LocalAuth(),
    });
    aa.push(client)
}

aa.forEach((client, i) => {
    console.log('Initializing...');

    client.initialize();



    client.on('qr', () => {
        console.log('Please scan the QR code on the browser.');
    });


    // client.on('authenticated', (session) => {
    //     console.log(session);
    //     console.log(JSON.stringify(session));
    // });

    client.on('ready', () => {
        client.sendMessage("966507499583@c.us", 'from' + i);
        // const shell = repl.start('wwebjs> ');
        // shell.context.client = client;
        // shell.on('exit', async () => {
        //     await client.destroy();
        // });
    });

    client.on('disconnected', (reason) => {
//     console.log("logout", reason)
//     ready = false;
    client.destroy();
    console.log('Initializing...');
    client.initialize();
});
})