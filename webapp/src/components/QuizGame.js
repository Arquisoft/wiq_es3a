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
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSelected, setAnswerSelected] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        generateQuestion();
        setAnswerSelected(false);
    }, [questionsNumber]); // Solo se ejecuta al montar el componente

    const generateQuestion = async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/generate-question`);
            setCurrentQuestion(response.data);
            setError(null); 
        } catch (error) {
            setError('Ha habido un error cargando las preguntas'); 
        }
    };

    const handleAnswer = (answer) => {
        const isCorrect = answer === currentQuestion.correctAnswer;
        setAnsweredQuestions(prev => [...prev, { question: currentQuestion, isCorrect }]);
        setSelectedAnswer({ answer, isCorrect });
        setAnswerSelected(true);
        if(isCorrect) {
            console.log(answeredQuestions)
        }
        setTimeout(() => {
            if (questionsNumber < numberOfQuestions) {
                setQuestionsNumber(prev => prev + 1);
            } else {
                // Quiz is finished
                // You can display the final score or redirect to another page
            }
        }, 500);
    };

    return (
        <div id="mainContainer" 
        style={{
            backgroundColor: answerSelected && selectedAnswer 
                ? selectedAnswer.isCorrect 
                    ? 'green' 
                    : 'red' 
                : 'white'
        }}>
            {error ? (
                <h2>{error}</h2> // Si hay un error, muestra el mensaje de error
            ):
            currentQuestion !== null ? (
                <div id="qContainer">
                    <h2>{currentQuestion.question}</h2>
                    <div id="rContainer">
                        <div>
                            {currentQuestion.allAnswers.map((answer, index) => (
                                index < currentQuestion.allAnswers.length / 2 && (
                                    <Button 
                                    key={index} 
                                    onClick={() => handleAnswer(answer)}
                                    style={{
                                        backgroundColor: answerSelected && selectedAnswer && selectedAnswer.answer === answer 
                                            ? selectedAnswer.isCorrect 
                                                ? 'green' 
                                                : 'red' 
                                            : '#EE0E51'
                                    }}
                                    >
                                        {answer}
                                    </Button>
                                )
                            ))}
                        </div>
                        <div>
                            {currentQuestion.allAnswers.map((answer, index) => (
                                index >= currentQuestion.allAnswers.length / 2 && (
                                    <Button 
                                    key={index} 
                                    onClick={() => handleAnswer(answer)}
                                    style={{
                                        backgroundColor: answerSelected && selectedAnswer && selectedAnswer.answer === answer 
                                            ? selectedAnswer.isCorrect 
                                                ? 'green' 
                                                : 'red' 
                                            : '#EE0E51'
                                    }}
                                    >
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