import React, { useState, useEffect } from 'react';
import './css/stylesBook.css';
import axios from 'axios';
import { Button, Form, InputGroup,Card , ListGroup, Container, Row, Col , Alert } from 'react-bootstrap';


const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ name: '', year: '', description: '', authorId: '', genre: '' });
    const [updateBook, setUpdateBook] = useState({ id: '', name: '', year: '', description: '', authorId: '', genre: '' });
    const [sortCriteria, setSortCriteria] = useState('');
    const [filter, setFilter] = useState({ firstName: '', lastName: '' });
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = () => {
      axios.get('http://localhost:3000/books')
        .then(response => setBooks(response.data))
        .catch(error => setError('Error fetching books: ' + error.message));
    };
  
    const handleAddBook = () => {
      axios.post('http://localhost:3000/books', newBook)
        .then(() => fetchBooks())
        .catch(error => setError('Error adding book: ' + error.message));
    };
  
    const handleUpdateBook = () => {
      axios.put(`http://localhost:3000/books/${updateBook.id}`, updateBook)
        .then(() => fetchBooks())
        .catch(error => setError('Error updating book: ' + error.message));
    };
  
    const handleDeleteBook = (name) => {
      axios.delete('http://localhost:3000/books', { params: { name } })
        .then(() => fetchBooks())
        .catch(error => setError('Error deleting book: ' + error.message));
    };
  
    const handleSortBooks = () => {
      axios.post('http://localhost:3000/books/list', null, { params: { sortCriteria } })
        .then(response => setBooks(response.data))
        .catch(error => setError('Error sorting books: ' + error.message));
    };
  
    const handleFilterBooks = () => {
      axios.post('http://localhost:3000/books/search', filter)
        .then(response => setBooks(response.data))
        .catch(error => setError('Error filtering books: ' + error.message));
    };
  

  return (
    <Container>
      <h1 className="my-4 text-center">Library</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Add New Book</h2>
          <Form>
            <Form.Group controlId="formBookName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book name"
                value={newBook.name}
                onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBookYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter year"
                value={newBook.year}
                onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBookDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBookAuthorId">
              <Form.Label>Author ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author ID"
                value={newBook.authorId}
                onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBookGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre"
                value={newBook.genre}
                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddBook}>Add Book</Button>
          </Form>
        </Col>

        <Col>
          <h2 className="mb-3">Update Book</h2>
          <Form>
            <Form.Group controlId="formUpdateBookId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book ID"
                value={updateBook.id}
                onChange={(e) => setUpdateBook({ ...updateBook, id: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formUpdateBookName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new name"
                value={updateBook.name}
                onChange={(e) => setUpdateBook({ ...updateBook, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formUpdateBookYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new year"
                value={updateBook.year}
                onChange={(e) => setUpdateBook({ ...updateBook, year: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formUpdateBookDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new description"
                value={updateBook.description}
                onChange={(e) => setUpdateBook({ ...updateBook, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formUpdateBookAuthor">
              <Form.Label>Author Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new author"
                value={updateBook.author}
                onChange={(e) => setUpdateBook({ ...updateBook, author: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formUpdateBookGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new genre"
                value={updateBook.genre}
                onChange={(e) => setUpdateBook({ ...updateBook, genre: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateBook}>Update Book</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Delete Book</h2>
          <Form>
            <Form.Group controlId="formDeleteBookName">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book name to delete"
                onChange={(e) => handleDeleteBook(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Sort Books</h2>
          <Form>
            <Form.Group controlId="formSortCriteria">
              <Form.Label>Sort Criteria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sort criteria"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSortBooks}>Sort Books</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Filter Books</h2>
          <Form>
            <Form.Group controlId="formFilterFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author's first name"
                value={filter.firstName}
                onChange={(e) => setFilter({ ...filter, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFilterLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author's last name"
                value={filter.lastName}
                onChange={(e) => setFilter({ ...filter, lastName: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleFilterBooks}>Filter Books</Button>
          </Form>
        </Col>
      </Row>

      <Row>
  {books.map(book => (
    <Col md={4} key={book.id} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title className="text-primary">{book.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.year}</Card.Subtitle>
          <Card.Text>
            <strong>Author Name:</strong> {book.author.firstName}<br />
            <strong>Author Surname:</strong> {book.author.lastName}<br />
            <strong>Description:</strong> {book.description}<br />
            <strong>Genre:</strong> {book.genre}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
    </Container>
  );
};

export default BooksPage;
