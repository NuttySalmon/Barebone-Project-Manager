import React from 'react';
import { Container } from 'react-bootstrap';
import ExampleApi from './ExampleApi';
import Nav from '../src/layout/Nav'; 

function App() {
  return (
    <Container className="App">
      <Nav />
     <h1> Barebone Project Manager </h1> 
     <ExampleApi/>
    </Container>
  );
}

export default App;
