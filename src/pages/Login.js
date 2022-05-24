import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disable: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  }

  validateButton = () => {
    const { email, name } = this.state;
    let validate = false;

    const EMAIL_REGEX = /^[\w.-]+@[\w.-]+\.[\w]+(\.[\w]+)?$/i;
    const validateEmail = EMAIL_REGEX.test(email);
    const validateName = name.length > 0;
    if (validateEmail && validateName) validate = true;

    if (validate === true) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, disable } = this.state;
    return (
      <main className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <section id="LoginSection">
          <label htmlFor="NomeInput">
            Nome:
            <input
              id="NameInput"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
              isrequired="true"
            />
          </label>
          <label htmlFor="EmailInput">
            Email:
            <input
              id="EmailInput"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              isrequired="true"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disable }
          >
            SUA VEZ
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickSettings }
          >
            Settings
          </button>
        </section>
      </main>
    );
  }
}

Login.PropTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Login;
