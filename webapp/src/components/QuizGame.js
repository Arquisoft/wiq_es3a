import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './QuizGame.css';

const QuizGame = () => {
    const numberOfQuestions = 9;
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionsNumber, setQuestionsNumber] = useState(0);
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        generateQuestion();
    }, [questionsNumber]); // Solo se ejecuta al montar el componente

    const generateQuestion = async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/generate-question`);
            setCurrentQuestion(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Manejo de errores
        }
    };

    const handleAnswer = (answer) => {
        const isCorrect = answer === currentQuestion.correctAnswer;
        setAnsweredQuestions(prev => [...prev, { question: currentQuestion, isCorrect }]);
        if(isCorrect) {
            console.log(answeredQuestions)
        }
        if (questionsNumber < numberOfQuestions) {
            setQuestionsNumber(prev => prev + 1);
        } else {
            // Quiz is finished
            // You can display the final score or redirect to another page
        }
    };

    return (
        <div id="mainContainer">
            {currentQuestion !== null ? (
                <div id="qContainer">
                    <h2>{currentQuestion.question}</h2>
                    <div id="rContainer">
                        <div>
                            {currentQuestion.allAnswers.map((answer, index) => (
                                index < currentQuestion.allAnswers.length / 2 && (
                                    <Button key={index} onClick={() => handleAnswer(answer)}>
                                        {answer}
                                    </Button>
                                )
                            ))}
                        </div>
                        <div>
                            {currentQuestion.allAnswers.map((answer, index) => (
                                index >= currentQuestion.allAnswers.length / 2 && (
                                    <Button key={index} onClick={() => handleAnswer(answer)}>
                                        {answer}
                                    </Button>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default QuizGame;