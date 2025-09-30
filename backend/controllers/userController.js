const getAllUsers = (req,res)=>{
    res.send("All users fetched");
}

const signup = (req,res)=>{
    res.send("signing up");
};

const login = (req,res)=>{
    res.send("logging up");
};

const getUserProfile = (req,res)=>{
    res.send("Profile fetched");
}

const updateUserProfile = (req,res)=>{
    res.send("Updated user profile");
}

const deleteUserProfile = (req,res)=>{
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
