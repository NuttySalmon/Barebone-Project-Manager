import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
  makeStyles,
  fade,
  LinearProgress,
  Box,
} from '@material-ui/core'
import { Menu, Search } from '@material-ui/icons'
import { StoriesContext } from '../DataWrapper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    minHeight: '64px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: theme.palette.text.disabled,
    '&:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey.main, 0.35),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey.main, 0.55),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const NavBar = () => {
  const classes = useStyles()
  const { ready } = useContext(StoriesContext)
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar className={classes.bar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Menu />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Barebone
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              label="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Box position="relative" top="1px" minHeight="4px">
        {ready ? null : <LinearProgress />}
      </Box>
    </div>
  )
}

export default NavBar
