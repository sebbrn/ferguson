import { Request, Response, Router } from 'express';
import * as path from 'path';
import request = require('request');

// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the HelloWorldController
// is mounted on in the server.ts file.
// In this case it's 'oauth'
router.get('/add-to-slack', (req: Request, res: Response) => {
    res.sendFile(path.resolve('./public/add_to_slack.html'))
});

router.get('/', (req, res) => {
    let options = {
        uri: 'https://slack.com/api/oauth.access?code='
        + req.query.code +
        '&client_id=' + process.env.CLIENT_ID +
        '&client_secret=' + process.env.CLIENT_SECRET,
        // ToDo: bad_redirect_uri-Error fixen
        // '&redirect_uri=' + process.env.REDIRECT_URI,
        method: 'GET'
    };
    console.log(options);
    request(options, (error, response, body) => {
        let JSONresponse = JSON.parse(body);
        if (!JSONresponse.ok) {
            console.log(JSONresponse);
            res.send('Error encountered: \n' + JSON.stringify(JSONresponse)).status(200).end();
        } else {
            // ToDo: Safely store the response
            console.log(JSONresponse);
            res.send('Success!');
        }
    })
});

export const OAuthController: Router = router;