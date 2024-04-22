import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import './QuizGame.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timer from './Timer.js';
import { useAuth } from "./login/AuthProvider";

const QuizGame = () => {
    const numberOfQuestions = 9;
    const totalTime = 150;
    const toastTime = 2200; // Tiempo para hacer la consulta de la siguiente pregunta

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionsNumber, setQuestionsNumber] = useState(0);
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSelected, setAnswerSelected] = useState(false);
    const [error, setError] = useState(null); 
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [auxQuestion, setAuxQuestion] = useState(null);

    const [time, setTime] = useState(totalTime);


    const image1 = 'https://t3.ftcdn.net/jpg/05/60/26/26/360_F_560262652_SMg7tie3Zii0zFT9LYkKMqrNrPcU5owB.jpg';
    const correctImage = 'https://img.freepik.com/foto-gratis/signo-icono-simbolo-marca-verificacion-verde-correcto-o-correcto-aprobar-o-concepto-confirmar-ilustracion-aislada-representacion-3d-fondo-verde_56104-1220.jpg?size=626&ext=jpg&ga=GA1.1.117944100.1710028800&semt=ais';
    const wrongImage = 'https://img.freepik.com/foto-gratis/signo-cruzado-incorrecto-o-negativo-negativo-eleccion-icono-simbolo-icono-ilustracion-aislado-sobre-fondo-rojo-3d-rendering_56104-1219.jpg?t=st=1710078617~exp=1710082217~hmac=a9dc243dfad6f2c548c66d6748c5aae79b5039b1b5763e34bce3e787114bc329&w=1380';

    const { token } = useAuth();

    useEffect(() => {

        const generateQuestion =  async () => {
            if (questionsNumber < 1){
                try {
                    const config = {
                      headers: { Authorization: 'Bearer '+ token}
                    };

                    let endpoint = `${apiEndpoint}/generate-question`;

                    if (localStorage.getItem("mode") !== 'bateríadesabios'){
                        const mode = localStorage.getItem("mode");
                        endpoint = `${apiEndpoint}/generate-question${mode ? `/${mode}` : ''}`;
                    }
                    else{
                        const categoria = localStorage.getItem("categoria");
                        endpoint = `${apiEndpoint}/generate-question${categoria ? `/${categoria}` : ''}`;
                    }
                    const response = await axios.get(endpoint,config);
                    setCurrentQuestion(response.data);
                    setError(null);
                } catch (error) {
                    setError('Ha habido un error cargando las preguntas');
                }
            }
            else{
                setCurrentQuestion(auxQuestion);
            }
        };
    
        if (!isToastVisible && questionsNumber <= numberOfQuestions) {
            generateQuestion();
            setAnswerSelected(false);
            setButtonsDisabled(false);
        }
    }, [questionsNumber, isToastVisible, apiEndpoint, auxQuestion, token]);

    const handleAnswer = (answer) => {
        //Comprueba si la respuesta es correcta
        const isCorrect = answer === currentQuestion.correctAnswer;
        setAnsweredQuestions(prev => [...prev, { question: currentQuestion, isCorrect }]);
        setSelectedAnswer({ answer, isCorrect });
        setAnswerSelected(true);
        setButtonsDisabled(true);

        //Muestra un toast con el resultado de la respuesta
        if(isCorrect) {
            toast.success('¡Respuesta correcta!', { 
                position: toast.POSITION.TOP_CENTER, 
                autoClose: toastTime,
                onClose: () => setIsToastVisible(false) 
            }); 
        } else {
            toast.error('Respuesta incorrecta', { 
                position: toast.POSITION.TOP_CENTER, 
                autoClose: toastTime,
                onClose: () => setIsToastVisible(false) 
            }); 
        }

        //Rellena la pregunta auxiliar de cara a la siguiente pregunta
        generateAuxQuestion();
    
        //Incrementa el número de preguntas.
        setIsToastVisible(true);
        setQuestionsNumber(prev => prev + 1);

        if (questionsNumber === numberOfQuestions) {
            
            if (questionsNumber === numberOfQuestions) {
                const rigthAnswers = answeredQuestions.filter(question => question.isCorrect).length;
                const wrongAnswers=numberOfQuestions+1-rigthAnswers;
                const completedTime = totalTime - time;
                setTimeout(() => {
                    setIsFinished(true);
                }, 1000);
                const username=localStorage.getItem('username')
                const statisticsData = {
                    username:  username,
                    rigthAnswers: rigthAnswers,
                    wrongAnswers:wrongAnswers,
                    time:completedTime
                };
                saveStatistics(statisticsData);
            }

        }
       
    }
    
    const saveStatistics = (statisticsData) => {
        fetch( `${apiEndpoint}/addStatistic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statisticsData)
        })
        .then(response => {
            if (response.ok) {
                // La solicitud fue exitosa
                return response.json();
            } else {
                // La solicitud falló, manejar el error
                throw new Error('Error al enviar estadísticas al servidor');
            }
        })
        .then(data => {
            // Procesar la respuesta del servidor si es necesario
        })
        .catch(error => {
            // Manejar el error
            console.error('Error al enviar estadísticas al servidor:', error);
        });
    };


    const generateAuxQuestion = async () => {
        try {
            const config = {
                headers: { Authorization: 'Bearer '+ token}
              };

              let endpoint = `${apiEndpoint}/generate-question`;

              if (localStorage.getItem("mode") !== 'bateríadesabios'){
                  const mode = localStorage.getItem("mode");
                  endpoint = `${apiEndpoint}/generate-question${mode ? `/${mode}` : ''}`;
              }
              else{
                  const categoria = localStorage.getItem("categoria");
                  endpoint = `${apiEndpoint}/generate-question${categoria ? `/${categoria}` : ''}`;
              }
              const response = await axios.get(endpoint,config);
              setAuxQuestion(response.data);
              setError(null);
        } catch (error) {
            setError('Ha habido un error cargando las preguntas');
        }
    }

    const handleTimeOver = () => {
        setIsFinished(true);
        const username=localStorage.getItem('username')
        const rigthAnswers = answeredQuestions.filter(question => question.isCorrect).length;
        const wrongAnswers=numberOfQuestions+1-rigthAnswers;
        const completedTime = totalTime - time;
        const statisticsData = {
            username:  username,
            rigthAnswers: rigthAnswers,
            wrongAnswers:wrongAnswers,
            time:completedTime
        };
        saveStatistics(statisticsData);
        alert('¡Tiempo agotado!');
    };

    const assignTime = (time) => {
        setTime(time);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        const minutos = minutes === 1 ? 'minuto' : 'minutos';
        const segundos = remainingSeconds === 1 ? 'segundo' : 'segundos';
    
        return `${minutes} ${minutos} y ${remainingSeconds} ${segundos}`;
    }

    function formatPercentage(percentage){
        return parseFloat(percentage).toFixed(2);
    }

    return (
        <div id="mainContainer" 
        style={{
            background: isToastVisible && answerSelected && selectedAnswer
                ? selectedAnswer.isCorrect 
                    ? `url(${correctImage}) center/cover no-repeat` 
                    : `url(${wrongImage}) center/cover no-repeat` 
                : `url(${image1}) center/cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
            height: '100vh',
            width: '100vw',
            justifyContent: isFinished ? 'center' : 'flex-start',
        }}>
            <ToastContainer />
            {!isFinished ? (
            <Box 
                id='infoContainer' 
                sx={{
                    backgroundColor: '#EE0E51',
                    color: 'white',  
                    padding: '10px',            
                    borderRadius: '8px',        
                    boxShadow: 'rgb(25, 118, 210) 0px 0px 15px', 
                    display: 'flex',             
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    width: '60%',         
                }}
            >
                <Timer onTimeOver={handleTimeOver} onTimeChange={(time) => assignTime(time)} />
                <h3>Preguntas respondidas: {questionsNumber}/{numberOfQuestions + 1}</h3>
            </Box>) : null}
            {error ? (
                <h2>{error}</h2> // Si hay un error, muestra el mensaje de error
            ):
            currentQuestion !== null && !isFinished ? (
                <div id="qContainer">
                    <h2>{currentQuestion.question}</h2>
                    <div id="rContainer">
                        <div>
                            {currentQuestion.allAnswers.map((answer, index) => (
                                index < currentQuestion.allAnswers.length / 2 && (
                                    <Button 
                                    key={index} 
                                    disabled={buttonsDisabled}
                                    onClick={() => handleAnswer(answer)}
                                    style={{
                                        backgroundColor: answerSelected && selectedAnswer 
                                            ? answer === currentQuestion.correctAnswer 
                                                ? 'green' 
                                                : 'red' 
                                            : '#EE0E51',

                                        color: answer.startsWith('http') && answerSelected && selectedAnswer
                                        ? answer === currentQuestion.correctAnswer
                                            ? 'green'
                                            : 'red'
                                        : undefined
                                    }}
                                    >
                                        {
                                            answer.startsWith('http') ? 
                                                <img src={answer} alt="imagen" style={{ maxWidth:"180px", height: '110px' }} />  
                                            : answer
                                        }
                                    </Button>
                                )
                            ))}
                        </div>
                        <div>
                            {currentQuestion.allAnswers.map((answer, index) => (
                                index >= currentQuestion.allAnswers.length / 2 && (
                                    <Button 
                                    key={index} 
                                    disabled={buttonsDisabled}
                                    onClick={() => handleAnswer(answer)}
                                    style={{
                                        backgroundColor: answerSelected && selectedAnswer 
                                            ? answer === currentQuestion.correctAnswer 
                                                ? 'green' 
                                                : 'red' 
                                            : '#EE0E51',

                                        color: answer.startsWith('http') && answerSelected && selectedAnswer
                                        ? answer === currentQuestion.correctAnswer
                                            ? 'green'
                                            : 'red'
                                        : undefined
                                    }}
                                    >
                                        {
                                            answer.startsWith('http') ? 
                                            <img src={answer} alt="imagen" style={{ maxWidth: '180px', height: '110px' }} /> 
                                            : answer
                                        }
                                    </Button>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            ) : isFinished ? (
                <div id="qContainer"
                    style={{
                        backgroundColor: 'rgba(238, 14, 81, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <h2>¡Has terminado el juego en { formatTime(totalTime - time) }!</h2>

                    <h3>Has acertado { answeredQuestions.filter(question => question.isCorrect).length } preguntas de { numberOfQuestions + 1 } </h3>

                    <h3>El porcentaje de aciertos ha sido del {
                        formatPercentage((answeredQuestions.filter(question => question.isCorrect).length)/(numberOfQuestions+1)*100)
                        } % </h3>

                    <Button
                        id='bJugar'
                        onClick={() => window.location.reload()}
                        style={{
                            backgroundColor: 'white',
                            color: 'black'
                        }}
                    >
                        Volver a jugar
                    </Button>
                </div>
            )
                : (
                    <p>Loading questions...</p>
                )
        }
    </div>
);
};

export default QuizGame;