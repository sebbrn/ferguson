"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Assign router to the express.Router() instance
const router = express_1.Router();
// The / here corresponds to the route that the HelloWorldController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get('/:name', (req, res) => {
    let { name } = req.params;
    res.send(`Hello, ${name}`);
});
exports.HelloWorldController = router;
