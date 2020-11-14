import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; 
import ExampleApi from './ExampleApi';
import Navbar from './layout/Navbar'; 
import SignIn from './components/authorization/SignIn';
import SignUp from './components/authorization/SignUp';
import createProject from './components/projects/StoryCreate'; 


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className='App' style={{height: '100'}}>
          <Navbar /> 
          <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route path='/signup' component ={SignUp} />
            <Route path='/create' component = {createProject} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
