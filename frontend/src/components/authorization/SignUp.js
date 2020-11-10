import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../layout/FormContainer'
import style from '../../layout/css/formContainer.module.css'

const SignUp = () => {
  const handleSubmit = () => {}
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })

  const handleOnChange = (event, field) => {
    setUserInfo({ ...userInfo, [field]: event.target.value })
  }

  return (
    <FormContainer>
      <Col>
        <h2> Sign Up </h2>
      </Col>
      <Col className={style.form}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="First name"
              value={userInfo.firstName}
              onChange={e => {
                handleOnChange(e, 'firstName')
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Last name"
              value={userInfo.lastName}
              onChange={e => {
                handleOnChange(e, 'lastName')
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              style={{marginBottom: '0'}}
              type="text"
              placeholder="Pick a username"
              value={userInfo.username}
              onChange={e => {
                handleOnChange(e, 'username')
              }}
            />
            <Form.Text muted className="mt-0">Will be used for sign in.</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              style={{marginTop: '1em'}}
              type="password"
              value={userInfo.password}
              onChange={e => {
                handleOnChange(e, 'password')
              }}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button>Submit</Button>
        </Form>
      </Col>
    </FormContainer>
  )
}

export default SignUp
