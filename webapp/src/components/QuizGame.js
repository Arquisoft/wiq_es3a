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
            setCurrentQuestion(hardcodedQuestions[0]);

        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            //Save the question as correct
            correctQuestions.push(currentQuestion);
            //Display a message 
            
        }else{
            //Save the question as failed
            failedQuestions.push(currentQuestion);
        }
        if (questionsNumber < numberOfQuestions ) {
            questionsNumber++;

        } else {
            // Quiz is finished
            // You can display the final score or redirect to another page
        }
    };

    return (
        <div>
            {questions.length > 0 ? (
                <div>
                    <h2>{currentQuestion.question}</h2>
                    <div>
                        {currentQuestion.answers.slice(0, 2).map((answer, index) => (
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
