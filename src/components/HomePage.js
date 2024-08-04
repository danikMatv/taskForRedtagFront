import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaBook, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <Container className="text-center my-5">
      <h1 className="mb-4">Welcome to the Library</h1>
      <Row>
        <Col md={6} className="mb-3">
          <Link to="/books" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" block>
              <FaBook size={124} className="mr-2" />
              Books
            </Button>
          </Link>
        </Col>
        <Col md={6} className="mb-3">
          <Link to="/authors" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="lg" block>
              <FaUser size={124} className="mr-2" />
              Authors
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
