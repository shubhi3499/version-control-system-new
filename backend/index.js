const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');//cross-origin resource system
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require("http");

const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");
const {initRepo} = require("./controllers/init.js");
const {addRepo} = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

dotenv.config();

yargs(hideBin(process.argv))
.command('starts',"Starts a new server",{},startServer)
.command('init',"Initialise a new repository",{},initRepo)
.command('add <file>',"Add a file to the repository",(yargs)=>{
    yargs.positional("file",{
        describe:"File to be added to the staging area",
        type:"string"
    })
},(argv)=>{
    addRepo(argv.file);
})
.command('commit <message>',"Commit a file into the repository",(yargs)=>{
    yargs.positional("message",{
        describe:"Commit message",
        type:"String"
    })
},(argv)=>{
    commitRepo(argv.message);
})
.command('push',"Push commits to S3",{},pushRepo)
.command('pull',"Pull commits from S3",{},pullRepo)
.command('revert <commitID>',"Revert to a specific commit ",(yargs)=>{
    yargs.positional("commitID",{
        describe:"Commit ID to revert to",
        type:"string"

    })
},(argv)=>{
    revertRepo(argv.commitID);
})
.demandCommand(1,"You need atleast one command").help().argv;
function startServer()
{
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI).then(()=>{
        console.log("MongoDb connected");
    }).catch((err)=>{
        console.log("Unable to connect : ", err);
    })
}