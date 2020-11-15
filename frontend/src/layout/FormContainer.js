import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core'
// import bg from '../img/data-providing.jpg'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
    height: '600px',
    minHeight: 'fit-content',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      height: '100%'
    }
  },
  wrap: {
    height: '100%',
      justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  form: {
    alignSelf: 'center',
  },
}))

const FormContainer = ({ title, children }) => {
  const classes = useStyles()
  return (
    <Container>
      <Paper className={classes.root}>
        <Grid container spacing={2} p={10} className={classes.wrap}>
          <Grid className={classes.title} item xs={12} md={4}>
            <Typography variant="h2"> {title} </Typography>
          </Grid>
          <Grid md={8} className={classes.form}>
            {children}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

FormContainer.propTypes = {
  /** Title to display on left */
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default FormContainer
