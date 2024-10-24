import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, 'Username is required'],
      minLength: [5, 'Username must be at least 5 characters'],
      maxLength: [20, 'Username must be less than 20 characters'],
      unique: true,
      validate: {
        validator: function(v) {
          return validator.isAlphanumeric(v);
        },
        message: props => `Username ${props.value} should contain only letters and numbers`
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxLength: 50,
      unique: true,
      validate: {
        validator: function(v) {
          return validator.isEmail(v);
        },
        message: props => `${props.value} is not a valid email address`
      }
    },
    profilePicture: {
      type: String,
      default: "",
      validate: {
        validator: function(v) {
          return v === "" || validator.isURL(v);
        },
        message: `Image link is not a valid URL`
      }
    },
    desc: {
      type: String,
      minLength: [10, 'Description needs at least 10 characters'],
      maxLength: [100, 'Limit Exceeded, upto 100 characters allowed'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: function(v) {
          return validator.isStrongPassword(v, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message: 'Password is not strong enough'
      },
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords do not match!'
      },
      select: false
    },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// it will check if the password is hashed and then save it to database when user is saved
UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
})

// if password is modified it will record the time
UserSchema.pre('save', function(next) {
  if(this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
})

// on the find() query it will return all users who are active by default
UserSchema.pre(/^find/, function(next) {
  this.find({active: {$ne: false}});
  next();
})

// validation for password
UserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}


UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if(this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
}

export default mongoose.model("User", UserSchema);