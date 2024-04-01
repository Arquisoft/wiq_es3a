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
    const [isFinished, setIsFinished] = useState(false);
    const gatewayEndpoint = process.env.GATEWAY_SERVICE_URL || 'http://localhost:8000';

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [auxQuestion, setAuxQuestion] = useState(null);


    //const image = 'https://img.freepik.com/vector-gratis/fondo-signos-interrogacion_78370-2896.jpg';
    const image1 = 'https://t3.ftcdn.net/jpg/05/60/26/26/360_F_560262652_SMg7tie3Zii0zFT9LYkKMqrNrPcU5owB.jpg';
    //const image2 = 'https://t4.ftcdn.net/jpg/03/45/88/07/360_F_345880772_zIT2mkdCzTthplO7xqaGGrMspN0jw0ll.jpg';
    //const image3 = 'https://t3.ftcdn.net/jpg/02/53/98/62/360_F_253986268_I3wMfXKQvcjNVcRSLDTMfKtkvbmpAj1J.jpg';
    //const image4 = 'https://t3.ftcdn.net/jpg/03/83/30/50/360_F_383305055_VmJPSFQVYLKVUMn6a4TqYRolLPynuuXG.jpg';
    //const image5 = 'https://t4.ftcdn.net/jpg/05/24/20/77/360_F_524207725_cDk3moNgO4NYGQpogqLpoOWANpc9vzCF.jpg';
    const correctImage = 'https://img.freepik.com/foto-gratis/signo-icono-simbolo-marca-verificacion-verde-correcto-o-correcto-aprobar-o-concepto-confirmar-ilustracion-aislada-representacion-3d-fondo-verde_56104-1220.jpg?size=626&ext=jpg&ga=GA1.1.117944100.1710028800&semt=ais';
    const wrongImage = 'https://img.freepik.com/foto-gratis/signo-cruzado-incorrecto-o-negativo-negativo-eleccion-icono-simbolo-icono-ilustracion-aislado-sobre-fondo-rojo-3d-rendering_56104-1219.jpg?t=st=1710078617~exp=1710082217~hmac=a9dc243dfad6f2c548c66d6748c5aae79b5039b1b5763e34bce3e787114bc329&w=1380';

    useEffect(() => {
        const generateQuestion =  async () => {
            if (questionsNumber < 1){
                try {
                    const response = await axios.get(`${apiEndpoint}/generate-question`);
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
    }, [questionsNumber, isToastVisible, apiEndpoint, auxQuestion]);

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
                onClose: () => setIsToastVisible(false) 
            }); 
        } else {
            toast.error('Respuesta incorrecta', { 
                position: toast.POSITION.TOP_CENTER, 
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
                setTimeout(() => {
                    setIsFinished(true);
                }, 1000);
                const username=localStorage.getItem('username')
                const statisticsData = {
                    username:  username,
                    rigthAnswers: rigthAnswers,
                    wrongAnswers:wrongAnswers
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
            const response = await axios.get(`${apiEndpoint}/generate-question`);
            setAuxQuestion(response.data);
            setError(null);
        } catch (error) {
            setError('Ha habido un error cargando las preguntas');
        }
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
            width: '100vw'
        }}>
            <ToastContainer />
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
                    <h2>¡Has terminado el juego!</h2>
                    <h3>Has acertado {answeredQuestions.filter(question => question.isCorrect).length} preguntas de {numberOfQuestions + 1}</h3>
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