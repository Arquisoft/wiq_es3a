import React from 'react';
import { render, act, screen } from '@testing-library/react';
import Timer from './Timer';

jest.useFakeTimers();

test('Timer muestra el tiempo inicial correctamente', () => {
    render(<Timer initialTime={150} />);

    expect(screen.getByText('Tiempo restante: 02:30')).toBeInTheDocument();
});

test('Timer actualiza el tiempo después de 1 segundo', () => {
    render(<Timer initialTime={150} />);

    act(() => {
    jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Tiempo restante: 02:29')).toBeInTheDocument();
});

test('Timer llama a onTimeOver cuando el tiempo llega a cero', () => {
    const onTimeOver = jest.fn();
    render(<Timer initialTime={1} onTimeOver={onTimeOver} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  
    act(() => {
      onTimeOver();
    });
  
    expect(onTimeOver).toHaveBeenCalled();
  });

test('Timer llama a onTimeChange cuando el tiempo cambia', () => {
    const onTimeChange = jest.fn();
    render(<Timer initialTime={150} onTimeChange={onTimeChange} />);

    act(() => {
    jest.advanceTimersByTime(1000);
    });
    
    expect(onTimeChange).toHaveBeenCalledWith(149);
});