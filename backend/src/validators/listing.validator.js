import Joi from "joi";
 
//Schema for Creating a new listing
export const createListingSchema = Joi.object({

    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().greater(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    owner: Joi.string().hex().length(24).required() //must be a valid mongoDb Object

});

//Schema For Updating an existing listing
export const updateListingSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    image: Joi.string().uri(),
    price: Joi.number().min(0),
    location: Joi.string(),
    country: Joi.string(),
    owner: Joi.string().hex().length(24)
}).min(1); // ensures at least one field is provided
