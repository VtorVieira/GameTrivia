import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types/';

class Header extends Component {
  render() {
    const { userImg, userName } = this.props;
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
          Placar: 0
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userDataReducer.name,
  userImg: state.userDataReducer.img,
});

Header.propTypes = {
  userImg: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
