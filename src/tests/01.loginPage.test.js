import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import Login from '../pages/Login';

const EMAIL = 'test@test.com';
const NAME = 'player';

const fillInputs = (name, email) => {
  fireEvent.change(name, { target: { value: NAME}});
  fireEvent.change(email, { target: { value: EMAIL}});
}

describe('Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  test('Verifica se os inputs corretos estão na tela', () => {
    renderWithRouterAndRedux(<Login/>);
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  });

  test ('Verifica se é possível escrever nos campos de nome e email', () => {
    renderWithRouterAndRedux(<Login />);
    const namePlayer = screen.getByTestId('input-player-name');
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    fillInputs(namePlayer, emailPlayer);
    expect(namePlayer.value).toBe(NAME);
    expect(emailPlayer.value).toBe(EMAIL);
  })

  test ('Verifica se o botão play está desabilitado se os campos email e nome não estiverem preenchidos', () => {
    renderWithRouterAndRedux(<Login />);
    const namePlayer = screen.getByTestId('input-player-name');
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    expect(namePlayer.value).toBe('');
    expect(emailPlayer.value).toBe('');
    expect(btnPlay).toBeDisabled();
  })

  test('Verifica se o botão "Play" é habilitado ao digitar nome e email válidos', () => {
    renderWithRouterAndRedux(<Login/>);
    const namePlayer = screen.getByTestId('input-player-name');
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    expect(btnPlay).toBeDisabled();
    userEvent.type(namePlayer, NAME);
    expect(btnPlay).toBeDisabled();
    userEvent.type(emailPlayer, EMAIL);
    expect(btnPlay).toBeEnabled();
  });

  test ('Verifica se a pessoa usuária é redirecionada ao apertar play', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const namePlayer = screen.getByTestId('input-player-name');
    const emailPlayer = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    
    userEvent.type(namePlayer, NAME);
    userEvent.type(emailPlayer, EMAIL);
    
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);
    const { pathname } = history.location;

    await waitFor(() => expect(pathname).toBe('/game'));
  })

  test('Verifica se o botão de configurações redireciona a pessoa para a tela de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');

    userEvent.click(btnSettings);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});
