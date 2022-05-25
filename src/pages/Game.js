import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import { getQuestions } from '../api/triviaAPI';
import Header from '../components/Header';

class Games extends Component {
  state = {
    questions: [],
    incorrectQuestions: [],
  };

  componentDidMount() {
    this.queryQuestions();
  }

  queryQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questionsApi = await getQuestions(token);
    if (questionsApi.response_code !== 0) {
      history.push('/');
    }
    this.setState({
      questions: questionsApi.results[0],
      incorrectQuestions: questionsApi.results[0].incorrect_answers,
    });
  };

  allAnswers = () => {
    const { incorrectQuestions, questions } = this.state;
    const correctAnswer = () => (
      <button
        data-testid="correct-answer"
        type="button"
        key="0"
      >
        { questions.correct_answer }
      </button>
    );
    const incorrectAnswers = () => (
      incorrectQuestions.map((answers, index) => (
        <button
          key={ index + 1 }
          data-testid={ `wrong-answer-${index}` }
          type="button"
        >
          { answers }
        </button>
      ))
    );
    const answers = [correctAnswer(), ...incorrectAnswers()];
    return answers;
  };

  // shuffle = (array) => {
  //   let currentIndex = array.length, randomIndex;
  //   while (currentIndex != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex], array[currentIndex]];
  //   }

  //   return array;
  // };

  // shuffle = (array) => {
  //   array.sort(() => Math.random() - 0.5);
  // };

  render() {
    const randomize = 0.5;
    const { questions } = this.state;
    return (
      <main className="App-header">
        <Header />
        <h1 data-testid="Games-title">Games</h1>
        <p data-testid="question-category">{ questions.category }</p>
        <p data-testid="question-text">{ questions.question }</p>
        <div data-testid="answer-options">
          { this.allAnswers().sort(() => Math.random() - randomize) }
        </div>
      </main>
    );
  }
}

Games.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Games;