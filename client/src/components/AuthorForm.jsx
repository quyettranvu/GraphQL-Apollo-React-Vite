import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/queries";
import { addSingleAuthor } from "../graphql-client/mutations";

const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const onInputChange = (e) => {
    setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addAuthor({
      variables: {
        name: newAuthor.name,
        age: parseInt(newAuthor.age),
      },
      refetchQueries: [{ query: getAuthors }],
    });

    setNewAuthor({ name: "", age: "" });
  };

  //GraphQL Operations
  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  //   console.log(dataMutation);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible mb-3">
        <Form.Control />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          onChange={onInputChange}
          value={newAuthor.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author age"
          name="age"
          onChange={onInputChange}
          value={newAuthor.age}
        />
      </Form.Group>
      <Button className="float-end mt-2" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForm;
