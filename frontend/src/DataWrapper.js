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

  // trigger get data when refresh
  useEffect(() => {
    getStories()
  }, [])

  /**
   * Update story status API call
   * @param {number} id - unique story id for story to update
   * @param {number} status - new status of story
   */
  const APIUpdateStoryStatus = async (id, status) => {
    try {
      Axios.put('/api/story/status-update', { data: { id, status } })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Update single story and handle drag and drop changes
   * @param {number} id  - unique story id for story to update
   * @param {number} status - current status number
   * @param {string} field - field to be changed
   * @param {*} value - new value to change the field into
   */
  const updateStory = (id, status, field, value) => {
    setReady(false)
    setStories(prev => {
      const newStory = prev[status][id] // make copy of original data
      if (!newStory) return prev // return original data if not found
      newStory[field] = value // change value
      const newStories = { ...prev } // copy previous stories

      // handle status/column change
      if (field === 'status') {
        APIUpdateStoryStatus(id, status) // update database
        delete newStories[status][id] // remove old value
        status = value // use new value as new column/status
      }
      newStories[status][id] = newStory // assign new value
      setReady(true)
      return newStories
    })
  }
  return (
    <StoriesContext.Provider value={{ ready, stories, updateStory }}>
      {children}
    </StoriesContext.Provider>
  )
}

export default DataWrapper
