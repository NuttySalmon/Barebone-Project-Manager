import React from 'react';
import { Container } from 'react-bootstrap';
import ExampleApi from './ExampleApi';
<<<<<<< HEAD
import Nav from '../src/layout/Nav'; 

function App() {
  return (
    <Container className="App">
      <Nav />
     <h1> Barebone Project Manager </h1> 
     <ExampleApi/>
=======
import NavB from './layout/NavB'; 
import SignIn from './SignIn';
import SignUp from './SignUp';


function App() {
  return (
    <Container fluid className="App">
     <NavB/>
     <SignIn/>
     <hr/>
     <SignUp/>

     {/* <ExampleApi/> */}
>>>>>>> c718fef704ec462fddacd70a6f7ddecb714bd393
    </Container>
  );
}

export default App;
