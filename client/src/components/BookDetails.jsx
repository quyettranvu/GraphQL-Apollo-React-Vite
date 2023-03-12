import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import { getSingleBook } from "../graphql-client/queries";
import { useQuery } from "@apollo/client";

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const { loading, error, data } = useQuery(getSingleBook, {
    variables: {
      id: bookId,
    },
    skip: bookId === null,
    onCompleted: (data) => {
      setBook(data.book);
    },
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) {
    console.log(error.message);
    return <p>Error in loading book details!</p>;
  }

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        {book === null ? (
          <Card.Text>Please select a book</Card.Text>
        ) : (
          <Fragment>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>
            <p>{book.author.name}</p>
            <p>Age:{book.author.age}</p>
            <p>All books by this author</p>
            <ul>
              {book.author.books.map((book) => (
                <li key={book.id}>{book.name}</li>
              ))}
            </ul>
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
