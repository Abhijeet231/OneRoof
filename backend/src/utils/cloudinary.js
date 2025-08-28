import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;

        //Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {resource_type: "auto"}
        )
        fs.unlinkSync(localFilePath);
        return response;

    }catch(err){
        fs.unlinkSync(localFilePath) // removes the locally saved files as upload got failed
        console.log("Error in Cloudinary:",err);
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (err) {
    console.log("Error deleting from Cloudinary:", err);
    return null;
  }
};

export {uploadOnCloudinary, deleteFromCloudinary}