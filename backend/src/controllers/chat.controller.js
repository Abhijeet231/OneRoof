import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import ChatMessage from "../models/chatMessage.model.js";
import mongoose from "mongoose";

//Create or Get one-on-one Chat
export const createOrGetChat = asyncHandler(async(req,res) => {

    try {
        const {userId} = req.body; // the person you want to chat with
        const loggedInUserId = req.user._id; // the current logged in user
    
        if(!userId){
            throw new ApiError(400, "userId is required");
        }
    
        //Check if Chat already exists between the two users
        const existingChat = await Chat.findOne({
            participants: { $all:[loggedInUserId, userId]}
        }).populate("participants", "userName email");
    
        if(existingChat){
            return res.status(200).json(new ApiResponse(200, "Chat already exists", existingChat))
        }
    
        //Otherise create a new chat
        const newChat = await Chat.create({
            participants: [loggedInUserId, userId],
        });
    
        const populatedChat = await newChat.populate("participants", "userName email");
    
        res.status(201).json(new ApiResponse(201, "New Chat Created", populatedChat));
    
    } catch (error) {
        console.log("Error in createOrGetChat:", error);
        throw new ApiError(500, "Internal Server Error");
    }

});

//Get all messages for a chat
export const getMessages = asyncHandler(async(req,res) => {
    try {
        const {chatId} = req.params;
    
        const messages = await ChatMessage.find({chat: chatId})
        .populate("sender", "userName email")
        .sort({createdAt:1});
    
        res.status(200).json(new ApiResponse(200, "Message fetched successfully", messages));
    } catch (error) {
        console.log("Error in getMessages:", error );
        throw new ApiError(500, "Internal Server Error");
        
    }
});

//Send a message to a chat
export const sendMessage = asyncHandler(async(req,res) => {
try {
        const {chatId, content} = req.body;
        const senderId = req.user._id;
    
        if(!chatId || !content){
            return res.status(400).json(new ApiError(400, "chatId and content are required"));
        };
    
        const message = await ChatMessage.create({
            sender: senderId,
            content,
            chat: chatId
        });
    
        await Chat.findByIdAndUpdate(chatId, {lastMessage: message._id})
    
        const populatedMessage = await message.populate("sender", "userName email");
        res.status(201).json(new ApiResponse(201, "Message sent successfully", populatedMessage));
} catch (error) {
    console.log("Error in sendMessage:", error);
    throw new ApiError(500, "Internal server Error");
}
})