import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
const SignUp = () => {
  return (
    <Container style={{ maxWidth: '400px' }}>
      <div> Error message: </div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp
