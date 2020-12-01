import {
  Box,
  CircularProgress,
  InputBase,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import Axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../AuthService'
import { Link as RouterLink } from 'react-router-dom'
import { limitLongStr } from '../utils'

const useStyle = makeStyles(theme => ({
  result: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 240,
  },
  noResult: {
    color: theme.palette.grey.dark,
  },
}))

const SearchBar = ({ ...rest }) => {
  const { getAuthHeader } = useContext(UserContext)
  const classes = useStyle()
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [ready, setReady] = useState(false)
  const [resultFocus, setResultFocus] = useState(false)
  const [textFocus, setTextFocus] = useState(false)
  const onChangeHandle = async e => {
    setReady(false)
    const value = e.target.value
    setKeyword(value)
    if (value.length) {
      const res = await Axios.post(
        '/api/story/search',
        { name: value },
        getAuthHeader()
      )
      setResults(res.data)
    } else {
      setResults([])
    }
    setReady(true)
  }

  const showResults = () => {
    if (!ready) {
      return (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )
    }
    if (results.length) {
      return results.map(entry => (
        <ListItem
          button
          key={entry.id}
          component={RouterLink}
          to={`/story/details/${entry.id}`}
          onClick={() => setResultFocus(false)}
        >
          <ListItemText
            primary={`#${entry.id} ${limitLongStr(entry.name, 20)}`}
          />
        </ListItem>
      ))
    }
    return (
      <ListItem>
        <span className={classes.noResult}>No result</span>
      </ListItem>
    )
  }
  const showResultsDropdown = (
    <List
      component="nav"
      aria-label="main mailbox folders"
      className={classes.result}
      onMouseDown={() => setResultFocus(true)}
      // onMouseUp={() => setResultFocus(false)}
    >
      {showResults()}
    </List>
  )
  return (
    <>
      <InputBase
        value={keyword}
        onChange={onChangeHandle}
        {...rest}
        onFocus={e => {
          onChangeHandle(e)
          setTextFocus(true)
        }}
        onBlur={() => setTextFocus(false)}
      />

      {(textFocus || resultFocus) && keyword.length
        ? showResultsDropdown
        : null}
    </>
  )
}

export default SearchBar
