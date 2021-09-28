import mongoose from "mongoose";

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

export default model('User', userSchema)