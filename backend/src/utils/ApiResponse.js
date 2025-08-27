class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode <400; //Boolean Flag to check ApiResponse
    }
};

export {ApiResponse};