const createRepository = (req,res)=>{
    res.send("Repository created");
};

const getAllRepositories = (req,res)=>{
    res.send("All repositories fetched")
}

const fetchedRepositoriesById = (req,res)=>{
    res.send("Repository Details Fetched")
}

const fetchedRepositoriesByName = (req,res)=>{
    res.send("Repository Details Fetched")
}

const fetchedRepositoriesForCurrentUser = (req,res)=>{
    res.send("Repositories for Logged in User  Fetched")
}

const updateRepositoryById = (req,res)=>{
    res.send("Repository Updated");
}

const toggleVisibilityById = (req,res)=>{
    res.send("Visibility Toggled");
}

const deleteRepositoryById = (req,res)=>{
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