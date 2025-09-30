const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/repo/create",repoController.createRepository);
repoRouter.get("/repo/all",repoController.getAllRepositories);
repoRouter.get("/repo/:id",repoController.fetchedRepositoriesById);
repoRouter.get("/repo/:name",repoController.fetchedRepositoriesByName);
repoRouter.get("/repo/:userID",repoController.fetchedRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id",repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id",repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id",repoController.toggleVisibilityById);

module.exports = repoRouter;
