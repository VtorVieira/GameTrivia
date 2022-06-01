import React, { Component } from 'react';
import PropTypes from 'prop-types/';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const order = storage.sort((a, b) => (b.score - a.score));
    console.log(order);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { order.map((element, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{ element.name }</p>
              <img src={ element.picture } alt="Imagem" />
              <p data-testid={ `player-score-${index}` }>{ element.score }</p>
            </li>
          )) }
        </ul>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
