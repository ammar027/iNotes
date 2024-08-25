const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a user using: POST "/api/auth/" . Doesn't require auth
router.post("/", [
    body('name','Name is required').notEmpty(),
    body('name', 'Name must be at least 2 characters long').isLength({ min: 2 }),
    body('email','Please enter a valid email').isEmail(),
    body('password','Password is required').notEmpty(),
    body('password','Password must be at least 5 characters long').isLength({ min: 5 }),
], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
        res.json({error: 'Please enter a unique value for email', message: err.message})})
  

});

module.exports = router;
