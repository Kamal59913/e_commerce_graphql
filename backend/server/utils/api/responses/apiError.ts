class ApiError extends Error{
    statusCode: any;
    data: null;
    success: boolean;
    errors: any[];
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = "" //Error stack
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, 
                this.constructor)
        }        
    }
}
export default ApiError