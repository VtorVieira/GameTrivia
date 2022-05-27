import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types/';

class Feedback extends Component {
  render() {
    const { userImg, userName, playerScore, playerAssertions } = this.props;
    return (
      <div>
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
          <p
            data-testid="header-score"
          >
            {`Placar: ${playerScore}`}
          </p>
        </header>
        <section>
          { playerAssertions >= 3 ? (
            <p data-testid="feedback-text">Well Done!</p>
          ) : (
            <p data-testid="feedback-text">Could be better...</p>
          ) }
        </section>
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
  playerAssertions: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Feedback);
