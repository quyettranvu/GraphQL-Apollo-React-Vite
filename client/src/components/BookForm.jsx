import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutations";

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const onInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });

    setNewBook({ name: "", genre: "", authorId: "" });
  };

  //GraphQL Operations
  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSingleBook);

  //   console.log(dataMutation);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          onChange={onInputChange}
          value={newBook.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={onInputChange}
          value={newBook.genre}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        {loading ? (
          <p>Loading author...</p>
        ) : (
          <Form.Control
            as="select"
            name="authorId"
            onChange={onInputChange}
            value={newBook.authorId}
          >
            <option value="" disabled>
              Select Author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>
      <Button className="float-end mt-2" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForm;
