const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient()
{
    if(!client)
    {
        client = new MongoClient(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        await client.connect();
    }
}

async function getAllUsers (req,res)
{
   try
   {
    await connectClient();
    const db = client.db("github");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray();
    res.json(users);
   }catch(err)
   {
    console.error("Error during fetching: " ,err.message);
    res.status(500).send("Server Error");
   }
}

async function  signup (req,res)
{
    const {username,password,email} = req.body;
    try
    {
        await connectClient();
        const db = client.db("github");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({username});
        if(user)
        {
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = {
            username,
            password:hashedPassword,
            email,
            repositories : [],
            followedUsers : [],
            starRepos : []

        }
        const result = await userCollection.insertOne(newUser);
        const token = jwt.sign({id:result.insertId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({token});
    }
    catch(err){
        console.error("Error during signup: " ,err.message);
        res.status(500).send("Server Error");
    }
};

async function login  (req,res)
{
    const {email,password} = req.body;
    try
    {
        await connectClient();
        const db = client.db("github");
        const userCollection = db.collection("users");
        const user = await userCollection.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({token,userId:user._id});
    }
    catch(err)
    {
        console.log("Error during login :",err.message);
        res.status(500).send("Server error");
    } 
};

async function getUserProfile (req,res)
{
    res.send("Profile fetched");
}

async function updateUserProfile (req,res)
{
    res.send("Updated user profile");
}

async function deleteUserProfile (req,res)
{
    res.send("User deleted");
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}
