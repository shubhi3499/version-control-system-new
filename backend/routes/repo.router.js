const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/create", repoController.createRepository);
repoRouter.get("/all", repoController.getAllRepositories);
repoRouter.get("/:id", repoController.fetchedRepositoriesById);
repoRouter.get("/name/:name", repoController.fetchedRepositoriesByName);
repoRouter.get("/user/:userID", repoController.fetchedRepositoriesForCurrentUser);
repoRouter.put("/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/toggle/:id", repoController.toggleVisibilityById);

module.exports = repoRouter;
