"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_world_controller_1 = require("./controllers/hello-world.controller");
let env = require('node-env-file');
env(__dirname + './../.env');
if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
    console.error('There are environment variables missing');
    usage_tip();
    //process.exit(1);
}
const app = express_1.default();
const port = 3000;
app.use('/hello', hello_world_controller_1.HelloWorldController);
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('Botkit Starter Kit');
    console.log('Execute your bot application like this:');
    console.log('clientId=<MY SLACK CLIENT ID> clientSecret=<MY CLIENT SECRET> PORT=3000 studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('Get Slack app credentials here: https://api.slack.com/apps');
    console.log('Get a Botkit Studio token here: https://studio.botkit.ai/');
    console.log('~~~~~~~~~~');
}
