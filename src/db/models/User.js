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

export default model('User', userSchema)