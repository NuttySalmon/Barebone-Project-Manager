import React, { Component, useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import FormContainer from '../../layout/FormContainer'
import style from '../../layout/css/formContainer.module.css'
import axios from 'axios'; 
const StoryCreate = () => {
  const [storyData, setProjectData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    progress: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(storyData);
    axios.post('/api/story/create', {data: storyData}); 
    
  }

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
              value={storyData.start_date}
              onChange={e => {
                handleChange(e, 'start_date')
              }}
              placeholder="Start date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
            className="dark"
              type="date"
              value={storyData.end_date}
              onChange={e => {
                handleChange(e, 'end_date')
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

          <Button type='submit'>Create</Button>
        </Form>
      </Row>
    </FormContainer>
  )
}
export default StoryCreate
