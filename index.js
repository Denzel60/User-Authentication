import express from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
const app = express()
config()

app.use(express.json())

const user = {
    username: "dennis",
    password: 12345678,
    email: "dennis@gmail.com",
    firstName: "dennis",
    lastName: "kamau"
}

app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === user.username && password === user.password) {
            const payload = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName     
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20s" })
            res.cookie("access_token", token, { httpOnly: true }).json({ success: true, message: "Logged in successfully" })
            res.status(200).json({ token: token })
        } else {
            res.send("Invalid credentials")
        }
    } catch (error) {
        res.status(500).json({ success: false, message: errotr.message })
    }
})

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) res.json({message: "No token"})
        jwt.verify(token, process.env.JWT_SECRET, ( err, decoded ) => {
            if (err) res.json({message: "Invalid token"})
                req.user = decoded
            next()
        }) 
}

app.delete("/login", (req, res) => {
    const user = req.uaer;
    console.log(user)
    res.send("delete a resource")
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})