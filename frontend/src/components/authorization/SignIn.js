import React, { Component, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import AuthForm from './AuthForm'
import style from '../css/authForm.module.css'

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
    <AuthForm>
      <Col>
        <h1> Login </h1>
      </Col>
      <Col className={style.form}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="usernameInput">
            <Form.Control
              type="text"
              placeholder="Enter username"
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
    </AuthForm>
  )
}

export default SignIn
