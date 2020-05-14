const jwt = require('jsonwebtoken');

const messsages = {
    access_denied: 'Access denied',
    invalid_token: 'Invalid_token'
}

function auth(req, res, next){
    // const token = req.header('auth-token');
    const token = req.header('token');
    if(!token) return res.send({error: true, message: messsages.access_denied});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        
        // console.log('verify:', req.user);
        next();
    } catch(err){
        res.send({error: true, message: messsages.access_denied});
    }
}

module.exports = auth;