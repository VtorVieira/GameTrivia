import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types/';

class Feedback extends Component {
  render() {
    const { userImg, userName, playerScore, playerAssertions, history } = this.props;
    const three = 3;
    return (
      <div className="App-header">
        <header>
          <img
            data-testid="header-profile-picture"
            src={ userImg }
            alt="logo"
          />
          <p
            data-testid="header-player-name"
          >
            { userName }
          </p>
          <p>
            {'Placar: '}
            <span
              data-testid="header-score"
            >
              { playerScore }
            </span>
          </p>
        </header>
        <section>
          { playerAssertions >= three ? (
            <p data-testid="feedback-text">Well Done!</p>
          ) : (
            <p data-testid="feedback-text">Could be better...</p>
          ) }
        </section>
        <section>
          <div data-testid="feedback-total-score">
            { playerScore }
          </div>
          <div data-testid="feedback-total-question">
            { playerAssertions }
          </div>
        </section>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
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
