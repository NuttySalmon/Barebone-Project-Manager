import React from 'react'
import { Container, Row } from 'react-bootstrap'
import bg from '../../img/data-providing.jpg'
import style from '../css/authForm.module.css'
const AuthForm = ({ children }) => {
  return (
    <Container fluid className={style.wrapper}>
      <div
        className={style.background}
        style={{ backgroundImage: `url(${bg})` }}
      />
      <Container className={style.contain}><Row style={{width: '100%'}}>{children}</Row></Container>
    </Container>
  )
}

export default AuthForm
