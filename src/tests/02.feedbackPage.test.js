import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';

describe('Desenvolva testes para atingir 90% de cobertura da tela de Feedback', () => {
  test('Verifica se os elementos corretos estão presentes no header', () => {
    renderWithRouterAndRedux(<Feedback />);
    const picture = screen.getByTestId('header-profile-picture');
    const player = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    expect(picture && player && score).toBeInTheDocument();
  });

  test('Verifica se alguma das mensagens de feedback está presente na página', () => {
    renderWithRouterAndRedux(<Feedback />);
    const message = screen.getByTestId('feedback-text');
    expect(message).toBeInTheDocument();
  });

  test('Verifica se exibe informações sobre o desempenho da pessoa usuária', () => {
    renderWithRouterAndRedux(<Feedback />);
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestions = screen.getByTestId('feedback-total-question');
    expect(totalScore && totalQuestions).toBeInTheDocument();
    /* expect(totalScore.typeOf && totalQuestions.typeOf).toBe('number'); */
  });

  test('Verifica se ao clicar em "Play Again" a pessoa usuária é redirecionada para a página inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;
    await waitFor(() => expect(pathname).toBe('/')) ;
  });

  test('Verifica se ao clicar em "Ranking" a pessoa usuária é redirecionada para a tela de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});