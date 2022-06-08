import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types/';
import './css-pages/Feedback.css';
import Footer from '../components/Footer';

const couldBe = require('../images/could-be.gif');
const wellDone = require('../images/well-done.gif');

class Feedback extends Component {
  render() {
    const { userImg, userName, playerScore, playerAssertions, history } = this.props;
    const three = 3;
    return (
      <div className="feedbackPage">
        <header className="feedback-header">
          <img
            data-testid="header-profile-picture"
            src={ userImg }
            alt="logo"
          />
          <p
            data-testid="header-player-name"
            className="playerName"
          >
            { userName }
          </p>
          <p>
            {'Score: '}
            <span
              data-testid="header-score"
            >
              { playerScore }
            </span>
          </p>
        </header>
        <div className="feedbackContainer">
          <section>
            { playerAssertions >= three ? (
              <div>
                <p data-testid="feedback-text">Well Done!</p>
                <img
                  alt="well-done"
                  src={ wellDone }
                  className="gifMsg"
                />
              </div>
            ) : (
              <div>
                <p data-testid="feedback-text">Could be better...</p>
                <img
                  alt="could-be-better"
                  src={ couldBe }
                  className="gifMsg"
                />
              </div>
            ) }
          </section>
          <section className="resultsGame">
            <div data-testid="feedback-total-score">
              { `Total score: ${playerScore}` }
            </div>
            <div data-testid="feedback-total-question">
              { `Total hits: ${playerAssertions}` }
            </div>
          </section>
        </div>
        <div className="buttons">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
            className="btnClass"
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            className="btnClass"
          >
            Ranking
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
  userImg: state.userReducer.img,
  playerScore: state.player.score,
  playerAssertions: state.player.assertions,
});

Feedback.propTypes = {
  userImg: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerAssertions: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
