const express = require('express')
const next_app = require('next')
const verify = require('./api/middleware/verifyToken');

// const   express     = require('express'),
//         // app         = express(),
//         verify      = require('./api/middleware/verifyToken');

const dev = process.env.NODE_ENV !== 'production'
const app = next_app({ dev })
const handle = app.getRequestHandler()

// CONFIGURE ENVIRONMENT
require('dotenv').config();
const port = process.env.PORT || 3000;

    
app.prepare()
.then(() => {
    const server = express()

    // CONFIGURE APP
    server.use(express.json());
    server.use(express.static(__dirname + "/public"));

    server.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', process.env.WEBSITE_URL);

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    server.use('/api/user', verify);

    // SET ROUTES
    require('./api/routes/route')(server);
    require('./api/database/database')();
        
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    
    server.listen(8080, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:8080')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})


// app.listen(port, () => console.log(`Listening on port ${port}...`));