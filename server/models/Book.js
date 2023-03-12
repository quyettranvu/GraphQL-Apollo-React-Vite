import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorId: {
    type: String,
  },
});

export default mongoose.model("books", BookSchema);
