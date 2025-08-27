import { ApiError } from "../utils/ApiError";

export const validate = (schema) => {
    return (req,res,next) => {
        const{error, value} = schema.validate(req.body)

        if(error){
            return ApiError(400, "Validation Error JOI")
        };

        req.body = value;
        next();

    };

};
    
// .validate() method returns an object with two properties - error and value. The Value contains the validated and sanitized version of req.body

// ** Validate() is a method provided by JOI **