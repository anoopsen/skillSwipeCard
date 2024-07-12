import React, { useState } from 'react';
import CardForm from './components/CardForm';
import { Container, Typography } from '@mui/material';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);

  const handleCardSubmit = (card) => {
    fetch('http://localhost:5000/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })
      .then((response) => response.json())
      .then((data) => {
        setCards([...cards, data]);
      })
      .catch((error) => console.error('Error saving card:', error));
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        SkillSwipe Cards
      </Typography>
      <CardForm onSubmit={handleCardSubmit} />
    </Container>
  );
};

export default App;
