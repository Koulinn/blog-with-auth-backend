import createHttpError from "http-errors"
import atob from "atob" // to decode base64 strings
import UserModel from "../db/models/User.js"

export const basicAuthMiddleware = async (req, res, next) => {
    console.log(req.headers)

    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide credentials in Authorization header!"))
    } else {
        const decodedCredentials = atob(req.headers.authorization.split(" ")[1])

        const [email, password] = decodedCredentials.split(":")

        const user = await UserModel.checkCredentials(email, password)
        console.log(user)

        if (user) {
            req.user = user
            next()
        } else {
            next(createHttpError(401, "Credentials are not correct!"))
        }
    }
}