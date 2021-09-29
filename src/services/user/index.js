import express from "express"
import users from './user-handlers.js'
import { basicAuthMiddleware } from "../../auth/auth.js"
import { JWTAuthMiddleware } from "../../auth/jwt-middle.js"

const router = express.Router()

router
  .route("/")
  .get(users.getAll)

router
  .route("/login/check")
  .post(users.checkLogin)
  
  router
    .route("/refresh/token")
    .post(users.refreshToken)

router
  .route("/new/register")
  .post(users.create)

router
  .route("/new/register")
  .post(users.create)


router
  .route("/me/stories")
  .get(JWTAuthMiddleware, users.getAllPosts)
  
router
  .route("/:userID")
  .get(JWTAuthMiddleware, users.getSingle)
  .put(JWTAuthMiddleware, users.update)
  .delete(JWTAuthMiddleware, users.deleteSingle)

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
