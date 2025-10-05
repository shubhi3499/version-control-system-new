const mongoose = require('mongoose');
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue (req,res)
{
    const {title,description} = req.body;
    const {id} = req.params;

    try{
    const issue = new Issue({
        title,
        description,
        repository:id,
    });
    await issue.save();
    res.status(201).json(issue);
    }
    catch (err) {
        console.error("Error during issue creation", err.message);
        res.status(500).send("Server Error");
    }

}

async function updateIssueById (req,res){
    res.send("Issue updated");
};

async function deleteIssueById  (req,res){
    res.send("Issue deleted");
};

async function getAllIssues  (req,res){
    res.send("All issues fetched");
};

async function getIssueById  (req,res){
    res.send("Issue fetched");
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}