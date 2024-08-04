import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './css/stylesAuthors.css';


const AuthorsPage = () => {
  const [newAuthor, setNewAuthor] = useState({ firstName: '', lastName: '', age: '', nationality: '' });
  const [deleteAuthor, setDeleteAuthor] = useState({ firstName: '', lastName: '' });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAddAuthor = async () => {
    try {
      await axios.post('http://localhost:3000/authors', newAuthor);
      setNewAuthor({ firstName: '', lastName: '', age: '', nationality: '' });
      fetchAuthors();
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleDeleteAuthor = async () => {
    try {
      await axios.delete('http://localhost:3000/authors', { params: deleteAuthor });
      setDeleteAuthor({ firstName: '', lastName: '' });
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <Container>
      <h1>Authors</h1>

      <Row className="my-4">
        <Col>
          <h2>Add New Author</h2>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newAuthor.firstName}
                onChange={(e) => setNewAuthor({ ...newAuthor, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newAuthor.lastName}
                onChange={(e) => setNewAuthor({ ...newAuthor, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={newAuthor.age}
                onChange={(e) => setNewAuthor({ ...newAuthor, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nationality"
                value={newAuthor.nationality}
                onChange={(e) => setNewAuthor({ ...newAuthor, nationality: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddAuthor}>Add Author</Button>
          </Form>
        </Col>

        <Col>
          <h2>Delete Author</h2>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={deleteAuthor.firstName}
                onChange={(e) => setDeleteAuthor({ ...deleteAuthor, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={deleteAuthor.lastName}
                onChange={(e) => setDeleteAuthor({ ...deleteAuthor, lastName: e.target.value })}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleDeleteAuthor}>Delete Author</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorsPage;
