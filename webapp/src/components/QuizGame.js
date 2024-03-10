import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './QuizGame.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizGame = () => {
    const numberOfQuestions = 9;
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionsNumber, setQuestionsNumber] = useState(0);
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSelected, setAnswerSelected] = useState(false);
    const [error, setError] = useState(null); 
    const [isToastVisible, setIsToastVisible] = useState(false);

    //const image = 'https://img.freepik.com/vector-gratis/fondo-signos-interrogacion_78370-2896.jpg';
    const image1 = 'https://t3.ftcdn.net/jpg/05/60/26/26/360_F_560262652_SMg7tie3Zii0zFT9LYkKMqrNrPcU5owB.jpg';
    //const image2 = 'https://t4.ftcdn.net/jpg/03/45/88/07/360_F_345880772_zIT2mkdCzTthplO7xqaGGrMspN0jw0ll.jpg';
    //const image3 = 'https://t3.ftcdn.net/jpg/02/53/98/62/360_F_253986268_I3wMfXKQvcjNVcRSLDTMfKtkvbmpAj1J.jpg';
    //const image4 = 'https://t3.ftcdn.net/jpg/03/83/30/50/360_F_383305055_VmJPSFQVYLKVUMn6a4TqYRolLPynuuXG.jpg';
    //const image5 = 'https://t4.ftcdn.net/jpg/05/24/20/77/360_F_524207725_cDk3moNgO4NYGQpogqLpoOWANpc9vzCF.jpg';

    useEffect(() => {
        if (!isToastVisible) { 
            generateQuestion();
            setAnswerSelected(false);
        }
    }, [questionsNumber, isToastVisible]);

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
        let toastId;
        if(isCorrect) {
            toastId = toast.success('¡Respuesta correcta!', { 
                position: toast.POSITION.TOP_CENTER, 
                onClose: () => setIsToastVisible(false) // Aquí es donde se añade el onClose
            }); 
            console.log(answeredQuestions)
        } else {
            toastId = toast.error('Respuesta incorrecta', { 
                position: toast.POSITION.TOP_CENTER, 
                onClose: () => setIsToastVisible(false) // Aquí es donde se añade el onClose
            }); 
        }
    
        setIsToastVisible(true);
        
        if (questionsNumber < numberOfQuestions) {
            setQuestionsNumber(prev => prev + 1);
        } else {
            // Quiz is finished
            // You can display the final score or redirect to another page
        }
    };

    return (
        <div id="mainContainer" 
        style={{
            background: isToastVisible && answerSelected && selectedAnswer
                ? selectedAnswer.isCorrect 
                    ? 'green' 
                    : 'red' 
                : `url(${image1}) center/cover no-repeat`,
            height: '100vh',
            width: '100vw'
        }}>
            <ToastContainer />
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