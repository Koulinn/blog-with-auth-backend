import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, enum:['Admin', 'User'] , default: 'User' },
        dateOfBirth: { type: Date, required: true },
        avatar: {
          type: String,
          default: "https://ui-avatars.com/api/?name=Unnamed+User",
        },
      },
      { timestamps: true }
    );

userSchema.static("destroy", async function (userId) {
const DbRes = await this.findByIdAndDelete(userId)

return { DbRes }
})

userSchema.pre("save", async function (next) {
  this.avatar = `https://ui-avatars.com/api/?name=${this.name}+${this.surname}`;
  
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next();
});

// hash password when update
userSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  const { password: plainPwd } = update

  if (plainPwd) {
    const password = await bcrypt.hash(plainPwd, 10)
    this.setUpdate({ ...update, password })
  }
});

userSchema.methods.toJSON = function () {

  const userDocument = this

  const userObject = userDocument.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
  // {userObject : userObject,
  //         cake: 'pls'
  // }
}

userSchema.statics.checkCredentials = async function (email, password) {


  const user = await this.findOne({ email }) 

  if (user) {
   
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) return user
    else return null
  } else {
    return null
  }
}




export default model('User', userSchema)