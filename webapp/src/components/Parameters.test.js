import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Parameters from './Parameters';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AuthProvider from './login/AuthProvider';


const mockAxios = new MockAdapter(axios);

const localStorageMock = (function(){
    let store = {};

    return {
        getItem(key)
        {
            return store[key];
        },

        setItem(key,value)
        {
            store[key] = value;
        },

        clear()
        {
            store = {};
        },
        
        removeItem(key)
        {
            delete store[key];
        },

        getAll()
        {
            return store;
        },
    };
})();

Object.defineProperty(window, "localStorage", {value:localStorageMock});

beforeEach(() => {
    mockAxios.reset();
    window.localStorage.clear();
});

test('Establece Parametros Predeterminados', async () => {
    render(<AuthProvider><Parameters /></AuthProvider>);
    expect(screen.getByText(/PARÁMETROS DE LA PARTIDA:/i)).toBeInTheDocument();

    // Wait for the asynchronous operation to complete
    const opcion = await document.getElementById("predeterminado");

    await fireEvent.click(opcion);

    // Wait for the state updates to propagate
    await waitFor(() => {
        const tj = localStorage.getItem("tiempoJuego");
        const num = localStorage.getItem("numPreguntas");
        expect(tj).toEqual("150");
        expect(num).toEqual("9"); 
    });
});

test('Establece Parametros Partida Corta', async () => {
    render(<AuthProvider><Parameters /></AuthProvider>);
    expect(screen.getByText(/PARÁMETROS DE LA PARTIDA:/i)).toBeInTheDocument();

    // Wait for the asynchronous operation to complete
    const opcion = await document.getElementById("corta");

    await fireEvent.click(opcion); 

    // Wait for the state updates to propagate
    await waitFor(() => {
        const tj = localStorage.getItem("tiempoJuego");
        const num = localStorage.getItem("numPreguntas");
        expect(tj).toEqual("60"); 
        expect(num).toEqual("5");
    });
});

test('Establece Parametros Partida Media', async () => {
    render(<AuthProvider><Parameters /></AuthProvider>);
    expect(screen.getByText(/PARÁMETROS DE LA PARTIDA:/i)).toBeInTheDocument();

    // Wait for the asynchronous operation to complete
    const opcion = await document.getElementById("media");

    await fireEvent.click(opcion); 

    // Wait for the state updates to propagate
    await waitFor(() => {
        const tj = localStorage.getItem("tiempoJuego");
        const num = localStorage.getItem("numPreguntas");
        expect(tj).toEqual("90");
        expect(num).toEqual("10");
    });
});