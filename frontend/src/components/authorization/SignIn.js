import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../layout/FormContainer'
import style from '../../layout/css/formContainer.module.css'

const SignIn = () => {
  const handleSubmit = () => {}
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onChangeUsername = e => {
    setUsername(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  return (
    <FormContainer>
      <Col>
        <h2> Sign In </h2>
      </Col>
      <Col className={style.form}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="usernameInput">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button>Submit</Button>
        </Form>
      </Col>
    </FormContainer>
  )
}

export default SignIn
