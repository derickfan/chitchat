import styled from "styled-components";
import React from 'react';
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Container>
      <Title>ChitChat</Title>
      <LoginForm />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #31313D;
`;

const Title = styled.h1`
  font-family: 'Chewy', cursive;
  padding: 1rem;
  font-size: 5rem;
`