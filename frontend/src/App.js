import React from 'react';
import { Container } from 'react-bootstrap';
import ExampleApi from './ExampleApi';
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
    </Container>
  );
}

export default App;
