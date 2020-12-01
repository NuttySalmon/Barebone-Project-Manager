import React, { useContext, useState } from 'react'
import { UserContext } from '../AuthService'
import FormContainer from '../layout/FormContainer'
import axios from 'axios'
import StoryForm from './StoryForm'

const StoryCreate = () => {
  const { getAuthHeader } = useContext(UserContext)
  const [storyData, setProjectData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    progress: '',
    details: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(storyData)
    axios.post('/api/story/create', storyData, getAuthHeader())
  }

  const handleChange = (event, field) => {
    let value = event.target.value
    if (field === 'progress') {
      if (value > 100) value = 100
      if (value < 0) value = 0
    }
    setProjectData({ ...storyData, [field]: value })
  }

  return (
    <FormContainer title="New story">
      <StoryForm {...{ handleChange, storyData, handleSubmit }} />
    </FormContainer>
  )
}
export default StoryCreate
