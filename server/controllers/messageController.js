import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

// Get all the user except logged in user
export const getUsersForSidebar = async (req,res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // Count the number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user)=>{
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        })// here senderId: user._id is filteredUsers id and receiverId: userId is our logged in user id
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get all messages for selected user
export const getMessages = async (req,res) => {
    try {
        const { id: selectedUserId } = req.params;//Destructuring: is same as "const selectedUserId = req.params.id";
        const myId = req.user._Id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId },
                {senderId: selectedUserId, receiverId: myId },
            ]//🧩 What is the $or operator in MongoDB?The $or operator is used to match documents that satisfy at least one of multiple conditions.It works just like the logical OR in programming.
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId },{seen: true});
        res.json({success: true, messages})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// api to mark message as seen using message id
export const markMessageAsSeen = async (req,res) =>{
     try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, {seen:true})
        res.json({success: true})
     } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
     }
}

// Send message to selected user
export const sendMessage = async (req,res) =>{
    try {
        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        res.json({success:true, newMessage});
         
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}