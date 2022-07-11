const express = require ('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port 3000");
});

const userRouter = require('./src/routes/towerdefender');
const { createRound } = require('./src/db/create_round');
const { checkRounds } = require('./src/db/active_round_check');
const { initRabbitMq } = require('./src/amqp/amqp.connection');
app.use('/towerdefenders', userRouter);

const channel = null

async function getChannel() {
    if (!channel){
        return await initRabbitMq()
    }
    return channel
}

app.get('/', async function (req, res) {
    console.log("HTML page is showing")
    res.sendFile(path.join(__dirname, './src/views/page.html'));
    await getChannel();
    if (!(await checkRounds()))
        await createRound();
});

