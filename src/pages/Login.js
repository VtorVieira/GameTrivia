import React, { Component } from 'react';

class Login extends Component {
  state = {
      name: '',
      email: '',
      disable: true,
  }

  handleChange = ({target}) => {
    const { name, value } = target; 
    this.setState({[name]: value}, this.validateButton )
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

  render() {
    const { name, email, disable } = this.state;
    return (
      <main>
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
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disable }
            >
              SUA VEZ
            </button>
          </label>
        </section>
      </main>
    )
  }
}

export default Login
