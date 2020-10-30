import React from 'react';
import { Container } from 'react-bootstrap';
import ExampleApi from './ExampleApi';
import NavB from './layout/NavB'; 

function App() {
  return (
    <Container fluid className="App">
     <NavB/>
     {/* <ExampleApi/> */}
    </Container>
  );
}

export default App;
