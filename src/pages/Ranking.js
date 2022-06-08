import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import './css-pages/Ranking.css';
import Footer from '../components/Footer';

const triviaLogo = require('../trivia.png');

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const order = storage.sort((a, b) => (b.score - a.score));
    console.log(order);
    return (
      <section className="rankingPage">
        <header className="ranking-header">
          <img
            alt="trivia-logo"
            src={ triviaLogo }
            className="triviaLogoRanking"
          />
          <button
            className="rankingHomeBtn"
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
          >
            PLAY AGAIN!
          </button>
        </header>
        <ul className="rankingContainer">
          <div className="rankingTitleTable">
            <p>PLAYER</p>
            <p>SCORE</p>
          </div>
          { order.map((element, index) => (
            <li key={ index } className="rankingPlayer">
              <img src={ element.picture } alt="Imagem" />
              <div className="nameAndScore">
                <p data-testid={ `player-name-${index}` }>{ element.name }</p>
                <p data-testid={ `player-score-${index}` }>{ element.score }</p>
              </div>
            </li>
          )) }
        </ul>
        <Footer />
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
