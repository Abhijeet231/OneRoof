import Joi from "joi";
 
//Schema for Creating a new listing
export const createListingSchema = Joi.object({

    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().greater(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    
    geometry: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(
            Joi.number().min(-180).max(180), // longitude
            Joi.number().min(-90).max(90)    // latitude
        ).length(2).required()
    }).required(),

    availability: Joi.object({
        startDate: Joi.date(),
        endDate: Joi.date().greater(Joi.ref('startDate'))
    }).optional(),
    

});

//Schema For Updating an existing listing
export const updateListingSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    image: Joi.string().uri(),
    price: Joi.number().min(0),
    location: Joi.string(),
    country: Joi.string(),
    owner: Joi.string().hex().length(24),

    geometry: Joi.object({
        type: Joi.string().valid('Point'),
        coordinates: Joi.array().items(
            Joi.number().min(-180).max(180), // longitude
            Joi.number().min(-90).max(90)    // latitude
        ).length(2)
    }),

    availability: Joi.object({
        startDate: Joi.date(),
        endDate: Joi.date().greater(Joi.ref('startDate'))
    }),
}).min(1); // ensures at least one field is provided
