import express from "express"
import users from './user-handlers.js'
import { basicAuthMiddleware } from "../../auth/auth.js"

const router = express.Router()

router
  .route("/")
  .get(users.getAll)
 
router
  .route("/new/register")
  .post(users.create)
  
router
  .route("/new/register")
  .post(users.create)


router
  .route("/me/stories")
  .get(basicAuthMiddleware, users.getAllPosts)
  
router
  .route("/:userID")
  .get(basicAuthMiddleware, users.getSingle)
  .put(basicAuthMiddleware, users.update)
  .delete(basicAuthMiddleware, users.deleteSingle)

// router
//   .route("/:userID/comments")
//   .post(blogComments.create)
//   .get(blogComments.getCommentsFromBlog)
  
// router
//     .route("/:userID/comments/:commentID")
//     .get(blogComments.getSingleComment)
//     .put(blogComments.update)
//     .delete(blogComments.deleteSingle)
  
export default router
