require("dotenv/config");
// create server
const express = require("express");
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());



// connect to DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MERN_PROJECT");

// import userModel
const UserModel = require("./Models/User");

// Get all users
app.get("/users", async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
})

// add new user
app.post("/users", async (req, res) => {
    const data = req.body;
    const user = await UserModel.insertOne(data);
    res.status(201).json({
        created: true,
        data: user
    });
})

// update user
app.put("/users", async (req, res) => {
    const { _id, name, age, email } = req.body;
    const result = await UserModel.updateOne({ _id }, { name, age, email });
    if (result.modifiedCount == 1) {
        res.status(200).json({
            updated: true
        });
    } else {
        res.status(500).json({
            updated: false
        });
    }
})

// delete user
app.delete("/users", async (req, res) => {
    const _id = req.body._id;
    const result = await UserModel.deleteOne({ _id });
    if (result.deletedCount == 1) {
        res.status(200).json({
            deleted: true
        });
    } else {
        res.status(500).json({
            deleted: false
        });
    }
})


// Admins model
const AdminModel = require("./Models/Admin");

// register admin
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminModel.findOne({ username });
        if (admin) {
            return res.status(409).json({ message: "Admin already exists" });
        }
        const newAdmin = new AdminModel({ username, password });
        await newAdmin.save();
        return res.status(201).json({
            created: true,
            admin: newAdmin
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

// login admin
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await AdminModel.findOne({ username });
    if (!admin) {
        return res.send({ message: "Username or password is inccorect!" });
    }

    if (!admin.comparePassword(password)) {
        return res.send({ message: "Username or password is inccorect!" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.SECRET);
    res.send({ token });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server work on port", PORT);
})