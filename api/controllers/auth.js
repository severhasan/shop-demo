const   User    = require('../models/User'),
        bcrypt  = require('bcryptjs'),
        jwt     = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../models/validation');

const messages = {
    pw_nomatch: 'Passwords do not match.',
    // username_exists: 'This username is already in use.',
    email_exists: 'This email has already been taken.',
    register_success: 'Registration successful.',
    register_validation_fail: 'Invalid credentials.',
    credential_fail: 'There is no account associated with this email.',
    login_success: 'Login successful',
    login_validation_fail: 'Invalid email or password'
}

exports.register = async (req, res) => {
    const {username, email, password1, password2} = req.body;

    if (password1 !== password2) return res.json({error: true, message: messages.pw_nomatch})

    const { error } = registerValidation({
        username: username,
        email: email,
        password: password1
    });
    if (error) return res.send({error: true, message: messages.register_validation_fail});

    const emailExists = await User.findOne({email: email});
    
    if (emailExists){
        return res.send({error: true, message: messages.email_exists});
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password1, salt);

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        // console.log('saving user');
        res.send({error: false, message: messages.register_success});
    } catch(err) {
        res.status(400).send(err);
    }
};


exports.login = async (req, res) => {
    // Validate
    const { error } = loginValidation(req.body);
    
    // Check Validation
    if (error) return res.send({error: true, message: messages.login_validation_fail});
    
    const {email, password} = req.body;

    const user = await User.findOne(
        {email: email},
        (err, user) => {
            if(err) {
                return false;
            }
            return user;
    });

    // Send feedback
    if (!user) return res.send({error: true, message: messages.credential_fail});

    // check password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.send({error: true, message: messages.login_validation_fail});

    // Create Token
    const token = jwt.sign({email: email, id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({error: false, token: token, email: email, username: user.username});
};