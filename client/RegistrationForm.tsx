import React, { useState } from 'react';
import { Button, Form, ButtonGroup, Container } from 'react-bootstrap';

interface RegistationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ProfileProps {
  showLogin: () => void;
}

const RegistrationForm: React.FC<ProfileProps> = ({ showLogin }) => {
  const [formData, setFormData] = useState<RegistationFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });


   const handleShowLogin = () => {    
        showLogin();
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful login, redirect or perform other actions
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container>
      <h1>Registration Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Jack"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Simpson"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <ButtonGroup aria-label="Basic example">
          <Button  variant="secondary" onClick={handleShowLogin}>
            Login
          </Button>
          <Button variant="primary" type="submit">
            Registration
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
