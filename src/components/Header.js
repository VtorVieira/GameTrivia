import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types/';
import './css-components/Header.css';

class Header extends Component {
  render() {
    const { userImg, userName, playerScore } = this.props;
    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
  userImg: state.userReducer.img,
  playerScore: state.player.score,
});

Header.propTypes = {
  userImg: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
