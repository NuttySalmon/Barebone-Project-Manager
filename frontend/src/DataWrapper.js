import Axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const StoriesContext = createContext()
const DataWrapper = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [stories, setStories] = useState({ 0: {}, 1: {}, 2: {}, 3: {} })

  const getStories = async () => {
    const result = await Axios.get('/api/story/all')
    console.log(result)
    let newStoriesCol = { 0: {}, 1: {}, 2: {}, 3: {} }
    result.data.forEach(story => {
      let { id, status } = story
      if (status === undefined || status === null || status > 3 || status < 0)
        status = 0
      newStoriesCol[status][id] = story
    })
    setStories(newStoriesCol)
    console.log(newStoriesCol)
    setReady(true)
  }
  useEffect(() => {
    getStories()
  }, [])

  /**
   * Update single story and handle drag and drop changes
   * @param {number} id  - unique story id
   * @param {number} status - current status number
   * @param {string} field - field to be changed
   * @param {*} value - new value to change the field into
   */
  const updateStory = (id, status, field, value) => {
    setReady(false)
    setStories(prev => {
      // make copy of original data
      const newStory = prev[status][id]
      // return original data if not found
      if (!newStory) return prev
      // change value
      newStory[field] = value
      // copy previous stories
      const newStories = { ...prev }
      // handle status/column change
      if (field === 'status') {
        // remove old value
        delete newStories[status][id]
        // use new value as new column/status
        status = value
      }
      // assign new value
      newStories[status][id] = newStory
      setReady(true)
      return newStories
    })
  }
  return (
    <StoriesContext.Provider
      value={{ ready, stories, updateStory }}
    >
      {children}
    </StoriesContext.Provider>
  )
}

export default DataWrapper
