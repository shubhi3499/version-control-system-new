const mongoose = require('mongoose');
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository  (req,res)
{
    const {owner,name,issues,content,description,visibility} = req.body;
   try
   {
    if(!name)
    {
        return res.status(400).json({error:"Repository name is required!"});
    }
    if(!mongoose.Types.ObjectId.isValid(owner))
    {
        return res.status(400).json({error:"Invalid User ID"});
    }
    
    const newRepository = new Repository({
        name,description,visibility,owner,content,issues
    });
    const result = await newRepository.save();
    res.status(201).json({
        message:"Repository created",
        repositoryID:result._id,

    })
   }catch(err)
   {
        console.error("Error during repository creation", err.message);
        res.status(500).send("Server error");
   }
};

async function getAllRepositories (req,res)
{
    try
    {
        const repositories = await Repository.find({}).populate("owner").populate("issues");

        res.json(repositories);
    }catch(err)
    {
        console.error("Error during fetching repositories", err.message);
        res.status(500).send("Server error");
    }
}

async function fetchedRepositoriesById(req,res)
{
    res.send("Repository Details Fetched")
}

async function fetchedRepositoriesByName(req,res)
{
    res.send("Repository Details Fetched")
}

async function fetchedRepositoriesForCurrentUser(req,res)
{
    res.send("Repositories for Logged in User  Fetched")
}

async function updateRepositoryById (req,res)
{
    res.send("Repository Updated");
}

async function toggleVisibilityById (req,res)
{
    res.send("Visibility Toggled");
}

async function deleteRepositoryById (req,res)
{
    res.send("Repository deleted");
}

module.exports = {
    createRepository,
    getAllRepositories,
    fetchedRepositoriesById,
    fetchedRepositoriesByName,
    fetchedRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById
}