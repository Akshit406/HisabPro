const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Generate json web token
const generateToken = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// register user
exports.registerUser = async (req, res) => {
    const {fullname, email, password, profileImageUrl} = req.body;

    // checking if any fields are missing
    if( !fullname || !email || !password){
        return res.status(400).json({ message: "All fields are required." })
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Email already in use."})
        }

        // Create the user
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })


    }catch(error){
        res.status(500).json({ message: "Error registering user." , error: error.message });
    }
}

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // checking if any fields are missing
    if ( !email || !password ) {
        return res.status(400).json({ message: "All the fields are required." })
    }

    try { 
        const user = await User.findOne({ email });
        if ( !user || !(await user.comparePassword(password))){
            return res.status(400).json({ message: "Invalid Credentials."})
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    }catch(error){
        res.status(500).json({ message: "Error logging in user." , error: error.message });
    }

}

// getUserInfo
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        res.status(200).json(user);
        
    }catch(error){
        res.status(500).json( {message: "Error finding user", error: error.message});
    }
}