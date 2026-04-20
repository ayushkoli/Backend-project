
const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next))
        .catch((error)=>next(error))
    }
}

export { asyncHandler }

/*
Try catch Handler

*  const asyncHandler = (fn) => async(req, res, next) => {
*       try{
*          await fn(req,res,next)
*       }catch(error){
*          res.status(error.statuscode || 500).json({
*              success: false,
*              message:error.message
*          })
*       }
*  }

? STEP 1 - normal function
*     function asyncHandler(fn) { }

? STEP 2 - arrow function
*     const asyncHandler = (fn) => { }

? STEP 3 - returns a function
*     const asyncHandler = (fn) => {
*         return async function (req, res, next) { }
*     }

? STEP 4 - add the logic
*     const asyncHandler = (fn) => {
*         return async function (req, res, next) {
*             try {
*                 await fn(req, res, next)
*             } catch (error) {
*                 res.status(error.statusCode || 500).json({
*                     success: false,
*                     message: error.message
*                 })
*             }
*         }
*     }

? STEP 5 - function to arrow function
*     const asyncHandler = (fn) => {
*         return async (req, res, next) => {
*             try {
*                 await fn(req, res, next)
*             } catch (error) {
*                 res.status(error.statusCode || 500).json({
*                     success: false,
*                     message: error.message
*                 })
*             }
*         }
*     }

? STEP 6 - FINAL VERSION
*     const asyncHandler = (fn) => async (req, res, next) => {
*         try {
*             await fn(req, res, next)
*         } catch (error) {
*             res.status(error.statusCode || 500).json({
*                 success: false,
*                 message: error.message
*             })
*         }
*     }
*/

/*
TODO: YOU write this
*     const getUser = asyncHandler(async (req, res) => {
*         const user = await User.findById(req.params.id)
*         res.json(user)
*     })

? WHAT HAPPENS STEP BY STEP:

! 1. asyncHandler receives your function as fn
*     fn = async (req, res) => {
*         const user = await User.findById(req.params.id)
*         res.json(user)
*     }

! 2. asyncHandler returns a new function
*     getUser = async (req, res, next) => {
*         try {
*             await fn(req, res, next)   // runs YOUR function
*         } catch(error) {
*             res.status(500).json({...})   // handles errors
*         }
*     }

! 3. When user hits the route
*     Express calls getUser(req, res, next)
*     Your function runs inside try block
*     If error — catch block handles it automatically
*/