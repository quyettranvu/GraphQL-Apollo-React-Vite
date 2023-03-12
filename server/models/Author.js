import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

export default mongoose.model("authors", AuthorSchema);
