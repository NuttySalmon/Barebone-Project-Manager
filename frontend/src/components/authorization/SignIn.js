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
<<<<<<< HEAD
  
  render() {
    return (
      <div className='container '>
        <form className='white' onSubmit={this.handleSubmit}>
          <h4 className='grey-text text-darken-3'>Sign In</h4>
          
          <div className="input-field">
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' onChange= {this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' onChange={this.handleChange} />
          </div>

          <div className='input-field'>
            <button className='btn pink light-2 z-depth-0'>Log In</button>
          </div> 
        </form>
      </div>
    )
=======
  const onChangePassword = e => {
    setPassword(e.target.value)
>>>>>>> 4d2d6a0945974ad1135884cb6d8b29d216daae15
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
