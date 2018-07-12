import express from 'express';
import { HelloWorldController } from './controllers/hello-world.controller';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
    console.error('There are environment variables missing');
    usage_tip();
    //process.exit(1);
}

const app: express.Application = express();
const port: number = 3000;

app.use('/hello', HelloWorldController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('Botkit Starter Kit');
    console.log('Execute your bot application like this:');
    console.log('clientId=<MY SLACK CLIENT ID> clientSecret=<MY CLIENT SECRET> PORT=3000 studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('Get Slack app credentials here: https://api.slack.com/apps')
    console.log('Get a Botkit Studio token here: https://studio.botkit.ai/')
    console.log('~~~~~~~~~~');
}