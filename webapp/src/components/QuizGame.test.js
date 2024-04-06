import { render, screen, fireEvent } from '@testing-library/react';
import QuizGame from './QuizGame';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AuthProvider from './login/AuthProvider';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
    mockAxios.reset();
  });

  test('Pregunta correcta', async () => {
    mockAxios.onGet('http://localhost:8000/generate-question').reply(200, {
      question: "pregunta",
      correctAnswer: "correcta",
      allAnswers: ["correcta", "no1", "no2", "no3"]
    });
  
    render(<AuthProvider><QuizGame /></AuthProvider>);
    expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();
  
    // Wait for the asynchronous operation to complete
    await screen.findByRole('button', { name: /correcta/i });
  
    const correcta = screen.getByRole('button', { name: /correcta/i });
    fireEvent.click(correcta);
  });