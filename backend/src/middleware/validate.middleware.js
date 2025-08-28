import { ApiError } from "../utils/ApiError.js";

 const validate = (schema) => {
    return (req,res,next) => {
        const{error, value} = schema.validate(req.body)

        if(error){
            throw new ApiError(400, "Validation Error JOI")
        };

        req.body = value;
        next();

    };

};

export default validate;
    
// .validate() method returns an object with two properties - error and value. The Value contains the validated and sanitized version of req.body

// ** Validate() is a method provided by JOI **