let express = require('express')
let router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Todo = require('../models/Todos')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

/* GET users listing. */
router.get('/', async (req, res) => {

    try {
        if (req.user) {
            try {

                let todos = await Todo.find({owner: req.user.userId});
                return res.render('main', {title: 'main', login: true, todos})

            } catch (e) {
                res.status(500).json({message: 'Something went wrong....'})
            }
        }


    } catch (e) {
        res.status(401).json({message: 'Unauthorized...'})
    }


})

router.post(
    '/',
    [
        check('text', 'Min length 3 char...').isLength({min: 3})
    ],
    async (req, res) => {
        const {text} = req.body
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Incorrect data...'})
            }
            const newTodo = await Todo({text})
            await newTodo.save()

            res.status(201).json({message: "Todo created..."})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong....'})
        }
    })

router.put('/', [check('text', 'Min length 3 char...').isLength({min: 3})],
    async (req, res) => {
        const {text} = req.body
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Incorrect data...'})
            }
            const newTodo = await Todo({text})
            await newTodo.save()

            res.status(201).json({message: "Todo created..."})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong....'})
        }
    })

router.delete('/', async (req, res) => {
    const {text} = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Incorrect data...'})
        }
        const newTodo = await Todo({text})
        await newTodo.save()

        res.status(201).json({message: "Todo created..."})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong....'})
    }
})

module.exports = router;
