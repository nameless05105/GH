import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: username => User.doesNotExist({ username }),
      message: "Username already exists"
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  greenhouse: {
    type: String
  },
}, { timestamps: true });


UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return await this.where(field).countDocuments() === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;