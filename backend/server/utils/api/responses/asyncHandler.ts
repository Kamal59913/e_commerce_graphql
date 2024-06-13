const asyncHandler = (requestHandler) => {
    return (req: any, res: any, next: (arg0: any) => any) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export default asyncHandler
