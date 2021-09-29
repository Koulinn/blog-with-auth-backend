import User from "../../db/models/User.js"
import aqp from 'api-query-params';
import BlogPost from "../../db/models/BlogPost.js"


const getAll = async (req, res, next) => {
  try {

  
    if(Object.keys(req.query).length != 0){

      const parsedQuery =  aqp(req._parsedUrl.query)
      const {filter, limit, sort} = parsedQuery
      console.log(filter)
      
      const users = await User.find(filter).limit(limit).sort(sort)
      res.send(users)
    } else {
      console.log('elseeeee')
      const users = await User.find({})
     
      res.send(users)
    }   
  } catch (error) {
    res.status(500)
    res.status(500)
    next(error)
  }
}
const getSingle = async (req, res, next) => {
  try {
    const {userID} = req.params
    const user = await User.findById(userID)
   
    res.send(user)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    const DbRes = await newUser.save({new: true})

    res.status(200).send(DbRes)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const {userID} = req.params
    console.log(req.user)

    // const updatedUser = await User.updateOne(userID, req.body, {
    //   new: true
    // })
    // console.log(updatedUser)
    const updatedUser = await User.findByIdAndUpdate(userID, req.body, {
      new: true
    })
    console.log(updatedUser)

    res.send(updatedUser)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const deleteSingle = async (req, res, next) => {
  try {
    const {userID} = req.params

    const DbRes = await User.destroy(userID) //S2 destroy

    if(DbRes)
    res.status(204).send()

  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({ author: req.user._id.toString() })

    res.status(200).send(posts)

  } catch (error) {
    next(error)
  }
}

const users = {
  create: create,
  getAll: getAll,
  getSingle: getSingle,
  update: update,
  deleteSingle: deleteSingle,
  getAllPosts: getAllPosts
}

export default users