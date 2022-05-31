import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import Ranking from '../pages/Ranking';

describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  test('Verifica se ao clicar no botão "Início" a pessoa usuária é redirecionada para a página inicial', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const btnHome = screen.getByTestId('btn-go-home');
    expect(btnHome).toBeInTheDocument();

    userEvent.click(btnHome);

    const { pathname } = history.location;
    await waitFor(() => expect(pathname).toBe('./'));
  });

  test('Verifica se a lista com os dados do ranking da pessoa usuária está presente', () => {
    renderWithRouterAndRedux(<Ranking />);
    const img = screen.getByRole('img');
    const namePlayer = screen.getByTestId('player-name-0');
    const score = screen.getByTestId('player-score-0');

    expect(img && namePlayer && score).toBeInTheDocument();
  });

});