import Axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const StoriesContext = createContext()
const DataWrapper = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [stories, setStories] = useState({})
  const [storiesCol, setStoriesCol] = useState({ 0: {}, 1: {}, 2: {}, 3: {} })
  const [colReady, setColReady] = useState(false)
  const getStories = async () => {
    const result = await Axios.get('/api/story/all')
    console.log(result)
    let newStoriesCol = { 0: {}, 1: {}, 2: {}, 3: {} }
    result.data.forEach(story => {
      const { id, status } = story
      if (status === undefined || status === null || status > 3 || status < 0)
        status = 0
      newStoriesCol[status][id] = story
    })
    setStoriesCol(newStoriesCol)
    console.log(newStoriesCol)
    setReady(true)
  }
  useEffect(() => {
    getStories()
  }, [])

  // const seprateIntoCol = () => {
  //   const newStoriesInCol = { 0: [], 1: [], 2: [], 3: [] }
  //   Object.values(stories).forEach(story => {
  //     const { status } = story
  //     if (status === undefined || status === null || status > 3 || status < 0)
  //       newStoriesInCol[0].push(story)
  //     else newStoriesInCol[status].push(story)
  //   })
  //   setStoriesCol(newStoriesInCol)
  //   console.log(newStoriesInCol)
  // }
  // useEffect(seprateIntoCol, [stories])

  const updateStory = (id, status, field, value) => {
    setStoriesCol(prev => {
      // make copy of original data
      const newStory = prev[status][id]
      if (!newStory) return prev
      newStory[field] = value
      const newStories = { ...prev }
      if (field === 'status') {
        delete newStories[status][id]
        status = value
      }
      newStories[status][id] = newStory
      setReady(true)
      return newStories
    })
  }

  // const statusUpdate = (id, status) => {
  //   setStories(prev => {
  //     const story = prev[id]
  //     if (story) {
  //       story.status = status
  //       setReady(true)
  //       return {
  //         ...prev,
  //         [id]: story,
  //       }
  //     }
  //     setReady(true)
  //     return prev
  //   })
  // }
  return (
    <StoriesContext.Provider
      value={{ stories, ready, storiesCol, colReady, updateStory, setReady }}
    >
      {children}
    </StoriesContext.Provider>
  )
}

export default DataWrapper
