const bcrypt = require("bcryptjs")
const router= require("express").Router();
const Users = require("../models/usersModel.js");

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.addUser(user)
    .then(saved => {
        res.status(201).json({saved});
        req.session.id = saved[0].id

    })
    .catch(err => {
        res.status(500).json({ message: 'There is a problem with the DB', error: err});
    })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    Users.getBy({username})
    .then(([ user ]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = username;
            res.status(200).json({message: "welcome!"});
        }
        else {
            res.status(401).json({ message: "Invalid Credentials!"})
        }

    })
    .catch(err => {
        res.status(500).json({ message: 'There is a problem with the DB', error: err});
    })

})

// LOGOUT
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send("unable to logout")
        }
        else {
            res.send("Successfully logged out")
        }
    })
})

module.exports = router;