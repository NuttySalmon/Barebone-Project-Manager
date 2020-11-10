import React, { Component, useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import FormContainer from '../../layout/FormContainer'
import style from '../../layout/css/formContainer.module.css'
const CreateProject = () => {
  const [storyData, setProjectData] = useState({
    name: '',
    sdate: '',
    edate: '',
    progress: '',
  })

  const handleSubmit = () => {}

  const handleChange = (event, field) => {
    let value = event.target.value
    if (field === 'progress') {
      if (value > 100) value = 100
      if (value < 0) value = 0
    }
    setProjectData({
      ...storyData,
      [field]: value,
    })
  }

  return (
    <FormContainer>
      <Row>
        <h2>New Story</h2>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit} className={style.form}>
          <Form.Group>
            <Form.Control
              type="text"
              value={storyData.name}
              onChange={e => {
                handleChange(e, 'name')
              }}
              placeholder="Story name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              value={storyData.sdate}
              onChange={e => {
                handleChange(e, 'sdate')
              }}
              placeholder="Start date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
            className="dark"
              type="date"
              value={storyData.edate}
              onChange={e => {
                handleChange(e, 'edate')
              }}
              placeholder="End date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              value={storyData.progress}
              onChange={e => {
                handleChange(e, 'progress')
              }}
              placeholder="Progress %"
            />
          </Form.Group>

          <Button>Create</Button>
        </Form>
      </Row>
    </FormContainer>
  )
}
export default CreateProject
