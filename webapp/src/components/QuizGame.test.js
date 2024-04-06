import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    const correcta = await screen.findByRole('button', { name: /correcta/i });

    fireEvent.click(correcta);

    // Wait for the state updates to propagate
    await waitFor(() => expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument());
});

test('Pregunta incorrecta', async () => {
    mockAxios.onGet('http://localhost:8000/generate-question').reply(200, {
        question: "pregunta",
        correctAnswer: "correcta",
        allAnswers: ["correcta", "no1", "no2", "no3"]
    });

    render(<AuthProvider><QuizGame /></AuthProvider>);
    expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();

    // Wait for the asynchronous operation to complete
    const incorrecta = await screen.findByRole('button', { name: /no1/i });

    fireEvent.click(incorrecta);

    // Wait for the state updates to propagate
    await waitFor(() => expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument());
});

test('Final del juego y llamada a saveStatistics', async () => {
    mockAxios.onGet('http://localhost:8000/generate-question').reply(200, {
        question: "pregunta",
        correctAnswer: "correcta",
        allAnswers: ["correcta", "no1", "no2", "no3"]
    });

    // Intercepta la llamada a saveStatistics
    mockAxios.onPost('http://localhost:8000/save-statistics').reply(config => {
        // Verifica que saveStatistics se haya llamado con los datos correctos
        const { username, rightAnswers, wrongAnswers, time } = JSON.parse(config.data);
        expect(username).toBe('username'); 
        expect(rightAnswers).toBeGreaterThanOrEqual(0);
        expect(wrongAnswers).toBeGreaterThanOrEqual(0);
        expect(time).toBeGreaterThanOrEqual(0);
        return [200];
    });

    render(<AuthProvider><QuizGame /></AuthProvider>);
    expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();

    // Simula la respuesta a todas las preguntas
    while (screen.queryByRole('button', { name: /correcta/i })) {
        const answerButton = await screen.findByRole('button', { name: /correcta/i });
        fireEvent.click(answerButton);
    }
});