import {app} from "../../index";

const serverless = require('serverless-http');
module.exports.handler = serverless(app);
