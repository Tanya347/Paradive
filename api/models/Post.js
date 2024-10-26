import mongoose from "mongoose";
import validator from "validator";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      validate: {
        validator: function(v) {
          return validator.isLength(v, { min: 5, max: 100 });  // Check the length of the title
        },
        message: 'Title should be between 5 and 100 characters'
      }
    },
    priceRange: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || validator.isCurrency(v, { symbol: '₹', allow_negatives: false });  // Validate price range as a currency
        },
        message: props => `${props.value} is not a valid price range`
      }
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: function(v) {
          return validator.isDate(v, { format: 'YYYY-MM-DD' });  // Validate date in 'YYYY-MM-DD' format
        },
        message: props => `${props.value} is not a valid date`
      }
    },
    desc: {
      type: String,
      maxLength: [500, 'Description should not exceed 500 characters'],
      validate: {
        validator: function(v) {
          return !v || validator.isLength(v, { max: 500 });
        },
        message: 'Description should not exceed 500 characters'
      }
    },
    type: {
      type: String,
      minLength: [3, 'Type should at least have 3 characters']
    },
    photos: {
      type: [String],
      required: [true, 'Photos need to be uploaded for a post'],
      validate: {
        validator: function(v) {
          return v.every(url => validator.isURL(url));  // Ensure every photo URL is valid
        },
        message: 'One or more URLs in photos is not valid'
      }
    },
    rating: {
      type: Number,
      validate: {
        validator: function(v) {
          return v >= 0 && v <= 5;  // Ensure rating is between 0 and 5
        },
        message: props => `${props.value} is not a valid rating, it should be between 0 and 5`
      }
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
