import { books, authors } from "../data/statis.js";
import Author from "../models/Author.js";
import Book from "../models/Book.js";

const resolvers = {
  //QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
    //return authors.find((author) => author.id.toString() === parent.authorId);
  },

  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
    //return books.filter((book) => book.authorId.toString() === parent.id);
  },

  //MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
  },
};

export default resolvers;
