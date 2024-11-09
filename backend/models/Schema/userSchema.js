import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },

  publicKey: {
    type: String,


  }, privateKey: {
    type: String,


  },

}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
