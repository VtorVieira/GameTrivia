import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import Ranking from '../pages/Ranking';

const playersRanking = [
  {
  name: "Abraham Diaz",
  picture: "	https://www.gravatar.com/avatar/dafbcee4b16e4c59417c5337e2e5a590",
  score: 109
  },
  {
  name: "Zena Mcgowan",
  picture: "	https://www.gravatar.com/avatar/7c98ad2cdc09ae0748b458704bee3748",
  score: 78,
  },
];
global.localStorage.setItem('ranking', JSON.stringify(playersRanking));

describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  it('Verifica se a página de Ranking tem o caminho src/pages/Ranking.js', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/ranking');
    
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');

    const title = screen.getByRole('heading', {name: /ranking/i});
    expect(title).toBeInTheDocument();
  })

  test('Verifica se ao clicar no botão "Início" a pessoa usuária é redirecionada para a página inicial', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const btnHome = screen.getByTestId('btn-go-home');
    expect(btnHome).toBeInTheDocument();

    userEvent.click(btnHome);

    const { pathname } = history.location;
    await waitFor(() => expect(pathname).toBe('/'));
  });

  test('Verifica se a lista com os dados do ranking da pessoa usuária está presente', () => {
    renderWithRouterAndRedux(<Ranking />);
    const img = screen.getAllByRole('img');
    const namePlayer1 = screen.getByTestId('player-name-0');
    const namePlayer2 = screen.getByTestId('player-name-1');
    const scorePlayer1 = screen.getByTestId('player-score-0');
    const scorePlayer2 = screen.getByTestId('player-score-1');

    expect(img && namePlayer1 && namePlayer2 && scorePlayer1 && scorePlayer2).toBeInTheDocument();
  });

});