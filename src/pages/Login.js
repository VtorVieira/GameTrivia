import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { getToken, getImg } from '../api/triviaAPI';
import { setUserData, resetScore } from '../redux/actions';
import Footer from '../components/Footer';
import './css-pages/Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disable: true,
  };

  componentDidMount() {
    const { resetGlobal } = this.props;
    resetGlobal();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

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
  };

  handleClickPlay = async () => {
    const { history, setUserName } = this.props;
    const dataAPI = await getToken();
    const { token } = dataAPI;
    const { name, email } = this.state;
    const hash = await getImg(email);
    setUserName(name, hash);
    localStorage.setItem('token', token);
    history.push('/game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, disable } = this.state;
    return (
      <main className="Login-main">
        <img src={ logo } className="App-logo logoTrivia" alt="logo" />
        <section className="LoginSection">
          <div className="loginInputs">
            <label htmlFor="NomeInput">
              <input
                id="NameInput"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
                isrequired="true"
                className="inputs"
                placeholder="Username"
              />
            </label>
            <label htmlFor="EmailInput">
              <input
                id="EmailInput"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                isrequired="true"
                className="inputs"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="loginBtns">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disable }
              onClick={ this.handleClickPlay }
              className="LoginButtons"
            >
              SUA VEZ
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleClickSettings }
              className="LoginButtons"
            >
              Settings
            </button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserName: (name, hash) => dispatch(setUserData(name, hash)),
  resetGlobal: () => dispatch(resetScore()),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setUserName: PropTypes.func.isRequired,
  resetGlobal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
