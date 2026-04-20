class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
}
}

export {ApiError}

/*
!ERROR HANDLING FLOW:-

! ⚠️FAILURE⚠️ :-

? STEP 1 — user hits route
*     GET /api/users/wrongId
*             ↓

? STEP 2 — asyncHandler runs controller
*     Promise.resolve(fn(req, res, next))
*     "here controller, you run now"
*             ↓

? STEP 3 — controller checks database
*     const user = await User.findById("wrongId")
*     user = null
*     database found nothing
*             ↓

? STEP 4 — YOU throw custom error
*     // only YOU know null = error here!
*     if (!user) {
*         throw new ApiError(404, "User not found!")
*     }
*
*     // ApiError created:
*     // {
*     //   statusCode: 404,
*     //   message: "User not found!",
*     //   success: false
*     // }
*             ↓

? STEP 5 — asyncHandler catches it
*     .catch((error) => next(error))
*
*     // asyncHandler doesn't know what error is
*     // it just catches and passes forward
*     // that's its only job!
*             ↓

? STEP 6 — next(error) called
*     // Express sees error was passed
*     // skips everything
*     // finds error middleware at bottom
*             ↓

? STEP 7 — error middleware receives it
*     app.use((error, req, res, next) => {
*         // error = ApiError object
*         // {
*         //   statusCode: 404,
*         //   message: "User not found!",
*         //   success: false
*         // }
*
*         res.status(404).json({
*             success: false,
*             message: "User not found!"
*         })
*     })
*             ↓

? STEP 8 — user receives response
*     {
*         "success": false,
*         "message": "User not found!"
*     }
*
*     // controller never sent this
*     // middleware sent this ✅

! ✅SUCCESS✅ :-

? STEP 1 — user hits route
*     GET /api/users/correctId
*             ↓

? STEP 2 — asyncHandler runs controller
*     Promise.resolve(fn(req, res, next))
*     "here controller, you run now"
*             ↓

? STEP 3 — controller checks database
*     const user = await User.findById("correctId")
*     user = { name: "Rahul", email: "rahul@gmail.com" }
*     database found the user! ✅
*             ↓

? STEP 4 — no error, condition false
*     if (!user) → false
*     // this block skipped completely
*             ↓

? STEP 5 — controller sends success
*     res.json(new ApiResponse(200, user, "User fetched!"))
*
*     // ApiResponse created:
*     // {
*     //   statusCode: 200,
*     //   data: { name: "Rahul", email: "rahul@gmail.com" },
*     //   message: "User fetched!",
*     //   success: true
*     // }
*             ↓

? STEP 6 — asyncHandler — no error
*     .catch((error) => next(error))
*
*     // no error thrown
*     // catch never runs ✅
*     // response already sent by controller
*             ↓

? STEP 7 — error middleware ignored
*     // next(error) never called
*     // error middleware skipped completely ✅
*             ↓

! STEP 8 — user receives response
*     {
*         "success": true,
*         "message": "User fetched!",
*         "data": {
*             "name": "Rahul",
*             "email": "rahul@gmail.com"
*         }
*     }
*
*     // controller sent this directly ✅
*/