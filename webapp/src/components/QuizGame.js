import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const QuizGame = () => {
    const numberOfQuestions = 10;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionsNumber, setQuestionsNumber] = useState(0);
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [failedQuestions, setFailedQuestions] = useState([]);


    useEffect(() => {
        generateQuestion();

    }, [questionsNumber]);

    const generateQuestion = async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/generate-question`);
            
            setCurrentQuestion(response.data);

        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswer = (answer) => {
        if (answer === currentQuestion.correctAnswer) {
            //Save the question as correct
            correctQuestions.push(currentQuestion);
            //Display a message 

        } else {
            //Save the question as failed
            failedQuestions.push(currentQuestion);
        }
        if (questionsNumber < numberOfQuestions) {
            questionsNumber++;

        } else {
            // Quiz is finished
            // You can display the final score or redirect to another page
        }
    };

    return (
        <div>
            {currentQuestion !== null ? (
                <div>
                    <h2>{currentQuestion.question}</h2>
                    {currentQuestion.answers.map((answer, index) => {
                        if (index % 2 === 0) {
                            return (
                                <div key={index}>
                                    <Button onClick={() => handleAnswer(answer)}>{answer}</Button>
                                    {currentQuestion.answers[index + 1] && (
                                        <Button onClick={() => handleAnswer(currentQuestion.answers[index + 1])}>
                                            {currentQuestion.answers[index + 1]}
                                        </Button>
                                    )}
                                </div>
                            );
                        }
                    })}
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default QuizGame;
