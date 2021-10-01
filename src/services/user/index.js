import express from "express"
import users from './user-handlers.js'
import { basicAuthMiddleware } from "../../auth/auth.js"
import { JWTAuthMiddleware } from "../../auth/jwt-middle.js"
import passport from "passport"

const router = express.Router()

router
  .route("/")
  .get(users.getAll)

router
  .route("/login/check")
  .post(users.checkLogin)

router
  .route("/googleRedirect")
  .get(passport.authenticate("google"), async (req, res, next) => {
    try {
      console.log("redirect")
      console.log(req.user)
      res.redirect(`http://localhost:3000?accessToken=${req.user.tokens.accessToken}&refreshToken=${req.user.tokens.refreshToken}`)
    } catch (error) {
      next(error)
    }
  })

router
  .route("/googleLogin")
  .get(passport.authenticate('google',{ scope: ["profile", 'email']}))
  
  router
    .route("/refresh/token")
    .post(users.refreshToken)

router
  .route("/new/register")
  .post(users.create)

// router
//   .route("/new/register")
//   .post(users.create)


router
  .route("/me/stories")
  .get(JWTAuthMiddleware, users.getAllPosts)
  
router
  .route("/me")
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
