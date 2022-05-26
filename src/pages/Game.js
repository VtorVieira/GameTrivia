import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import { getQuestions } from '../api/triviaAPI';
import Header from '../components/Header';
import './Game.css';

class Games extends Component {
  state = {
    questions: [],
    incorrectQuestions: [],
    buttonColorCorrect: '',
    buttonColorIncorrect: '',
    disable: false,
    answered: false,
  };

  componentDidMount() {
    this.queryQuestions();
    const numSeconds = 30000;
    setTimeout(() => {
      this.setState({ disable: true });
    }, numSeconds);
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

  handleClick = () => {
    this.setState({
      buttonColorCorrect: 'green',
      buttonColorIncorrect: 'red',
      answered: true,
    });
  };

  allAnswers = () => {
    const {
      incorrectQuestions,
      questions,
      buttonColorCorrect,
      buttonColorIncorrect,
      disable,
    } = this.state;
    const correctAnswer = () => (
      <button
        key="0"
        type="button"
        disabled={ disable }
        className={ buttonColorCorrect }
        onClick={ this.handleClick }
        data-testid="correct-answer"
      >
        { questions.correct_answer }
      </button>
    );
    const incorrectAnswers = () => (
      incorrectQuestions.map((answers, index) => (
        <button
          key={ index + 1 }
          type="button"
          disabled={ disable }
          className={ buttonColorIncorrect }
          onClick={ this.handleClick }
          data-testid={ `wrong-answer-${index}` }
        >
          { answers }
        </button>
      ))
    );
    const answers = [correctAnswer(), ...incorrectAnswers()];
    return answers;
  };

  handleClickNext = async () => {
    const token = localStorage.getItem('token');
    const questionsApi = await getQuestions(token);
    this.setState({
      questions: questionsApi.results[0],
      incorrectQuestions: questionsApi.results[0].incorrect_answers,
      buttonColorCorrect: '',
      buttonColorIncorrect: '',
      answered: false,
    });
  }

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
    const { questions, answered } = this.state;

    return (
      <main className="App-header">
        <Header />
        <h1 data-testid="Games-title">Games</h1>
        <p data-testid="question-category">{ questions.category }</p>
        <p data-testid="question-text">{ questions.question }</p>
        <div data-testid="answer-options">
          { this.allAnswers().sort(() => Math.random() - randomize) }
        </div>
        { answered ? (
          <button
            type="button"
            onClick={ this.handleClickNext }
            data-testid="btn-next"
          >
            Next
          </button>) : null }
      </main>
    );
  }
}

Games.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Games;
