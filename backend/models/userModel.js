const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    repositories:[
        {
            default:[],
            types:Schema.Types.ObjectId,
            ref:"Repository"
        }
    ],
    followedUsers:[
        {
            default:[],
            types:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    starRepo:[
        {
            default:[],
            types:Schema.Types.ObjectId,
            ref:"Repository"
        }
    ]
})

const User = mongoose.model("User",UserSchema);
export default User;