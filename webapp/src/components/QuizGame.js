import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const QuizGame = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            //const response = await axios.get(`${apiEndpoint}/generate-question`);
            //setQuestions(response.data);
            const hardcodedQuestions = [
                {
                    question: "¿Cuál es la capital de Francia?",
                    answers: [
                        { text: "Paris", isCorrect: true },
                        { text: "Londres", isCorrect: false },
                        { text: "Berlin", isCorrect: false },
                        { text: "Roma", isCorrect: false },
                    ],
                }
            ];
            setQuestions(hardcodedQuestions);

        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Quiz is finished
            // You can display the final score or redirect to another page
        }
    };

    return (
        <div>
            {questions.length > 0 ? (
                <div>
                    <h2>{questions[currentQuestion].question}</h2>
                    <div>
                        {questions[currentQuestion].answers.slice(0, 2).map((answer, index) => (
                            <Button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
                                {answer.text}
                            </Button>
                        ))}
                    </div>
                    <div>
                        {questions[currentQuestion].answers.slice(2).map((answer, index) => (
                            <Button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
                                {answer.text}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default QuizGame;
