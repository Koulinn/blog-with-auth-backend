import express from "express"
import blogPost from "./blogPost-handlers.js"
import blogComments from "./comments-handlers.js"
import responseValidations from "../../lib/response-validations.js"
import { JWTAuthMiddleware } from "../../auth/jwt-middle.js"




const router = express.Router()

router
  .route("/")
  .get(blogPost.getAll, responseValidations.searchHasResults)

router
  .route("/")
  .post(JWTAuthMiddleware, blogPost.create)

router
  .route("/:blogPostID")
  .get(blogPost.getSingle)
  .put(JWTAuthMiddleware, blogPost.update)
  .delete(JWTAuthMiddleware, blogPost.deleteSingle)

router
  .route("/:blogPostID/comments")
  .post(JWTAuthMiddleware, blogComments.create)
  .get(blogComments.getCommentsFromBlog)

router
  .route("/:blogPostID/comments/:commentID")
  .get(blogComments.getSingleComment)
  .put(JWTAuthMiddleware, blogComments.update)
  .delete(JWTAuthMiddleware, blogComments.deleteSingle)

router
  .route("/:blogPostID/like/:userID")
  .get(blogPost.likes)

export default router
