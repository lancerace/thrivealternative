import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({});
let envConfig;

switch (process.env.NODE_ENV) {
    case 'staging':
    case 'production':
    case 'qa':
        envConfig = dotenv.config(); 
        break;
    //anything above is for aws, aws does not point to .env files. please dont edit.
    case 'development':
        envConfig = dotenv.parse(fs.readFileSync('.env.development'));
        break;
}

if (envConfig)
    for (const k in envConfig)
        process.env[k] = envConfig[k]
