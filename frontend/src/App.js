import React from 'react';
import { Container } from 'react-bootstrap';
import ExampleApi from './ExampleApi';
import Navbar from '../src/layout/Navbar'; 

function App() {
  return (
    <Container className="App">
      <Navbar />
     <h1> Barebone Project Manager </h1> 
     <ExampleApi/>
    </Container>
  );
}

export default App;
