let express = require('express')
let router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('login', {title: 'login', isLoginPage: true})
})

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min length 6 char...').isLength({min: 6})
    ],
    async (req, res) => {

        const {email, password} = req.body
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Incorrect data...'})
            }


            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: "User with this email exists..."})
            }


        } catch (e) {
            res.status(500).json({message: 'Something went wrong....'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: "User created..."})

    })

router.post('/login',
    [
        check('email', 'Input correct email...').normalizeEmail().isEmail(),
        check('password', 'Input password...').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Incorrect data...'})
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User not found...'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password try gain...'})
            }

            const token = jwt.sign(
                {userId: user.id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )

            res.cookie('access_token', `Bearer ${token}`, {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: false
                });
            res.send("Ok")

        } catch (e) {
            res.status(500).json({message: 'Something went wrong....'})
        }

    })

module.exports = router;
