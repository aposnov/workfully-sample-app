import React from "react";
import Container from 'react-bootstrap/Container';
import LoginForm from "./LoginForm";

const App: React.FC = () => {
  return (
    <Container>
      <h1>Workfully Sample App</h1>
      <p>You can register here</p>
      <LoginForm />
    </Container>
  );
};

export default App;