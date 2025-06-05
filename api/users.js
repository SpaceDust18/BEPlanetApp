import express from "express";
import { userLogin } from "../db/queries/users.js";
import { createUser } from "../db/queries/users.js";
import bcrypt from 'bcrypt';
import { verifyToken } from "../middleware/auth.js";
import newUserCheck from "../middleware/newUserCheck.js";
import jwt from "jsonwebtoken"

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
    res.send(`Hello ${req.user.email}, this is a protected route.`)
});

router.post('/register', newUserCheck, async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const addUserIntoDb = await createUser({ email, hashedPassword });

        console.log("addUserIntoDb:", addUserIntoDb);
console.log("JWT_SECRET:", process.env.JWT_SECRET);


        const token = jwt.sign({ id: addUserIntoDb.id, email: addUserIntoDb.email}, 
    process.env.JWT_SECRET,
{ expiresIn: '1h' }
);
    res.status(201).json({ token });
} catch(err){
    console.error("Error registering user:", err.stack || err.message || err);
    res.status(500).send('Internal server error');
}
});


router.post('/login', async (req, res, next) => {
    try {
        const user = await userLogin(req.body);

        //Generates JWT if login was successful
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    } catch (err) {
console.error('Could not login:', err);
res.status(500).send('Internal server error');
    }
})

export default router;