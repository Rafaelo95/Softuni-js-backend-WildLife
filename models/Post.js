const { Schema, model, Types: {ObjectId} } = require("mongoose");

const URL_PATTERN = /^https?:\/\/(.+)$/;

const postSchema = new Schema({
  title: {type: String, minlength: [6, "Title must be 6 chars long at least"]},
  keyword: {type: String, minlength: [6, "keyword must be 6 chars long at least"]},
  location: {type: String, maxlength: [15, "location must be 15 chars long max"]},
  date: {type: 
    String,  
    minlength: [10, "Date must be 10 chars long"],  
    maxlength: [10, "Date must be 10 chars long"]
  },
  image: {type: String, validate: {
    validator(value) {
      return URL_PATTERN.test(value)
    }, message: "Image must be a valid URL"
  }},
  description: {type: String, minlength: [8, "description must be 6 chars long at least"]},
  author: {type: ObjectId, ref: "User", required: true}, 
  votes:  {type: [ObjectId], ref: "User", default: []}, 
  rating: {type: Number, default: 0}
});

const Post = model("Post", postSchema);

module.exports = Post;
