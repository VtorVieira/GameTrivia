import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import { connect } from 'react-redux';
import { getQuestions } from '../api/triviaAPI';
import Header from '../components/Header';
import './Game.css';
import { playerData } from '../redux/actions';
import { difficultyNumber, totalScore } from '../helpers/difficulty';

class Games extends Component {
  state = {
    questions: [],
    incorrectQuestions: [],
    buttonColorCorrect: '',
    buttonColorIncorrect: '',
    disable: false,
    answered: false,
    timeoutQuestion: '',
    answersTest: [],
    timer: 30,
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

    const TIMEOUT_TIMER = 30000;
    const INTERVAL_TIMER = 1000;
    
    const questionTimeout = setTimeout(() => {
      this.setState({ disable: true, answered: true });
    }, TIMEOUT_TIMER);

    const questionInterval = setInterval(() => {
      const { timer } = this.state;
      timer === 0 ? (
        clearInterval(questionInterval)
      ) : (
        this.setState((prev) => ({
          timer: prev.timer - 1,
        }))
      )
    }, INTERVAL_TIMER)
    
    this.setState({
      questions: questionsApi.results[0],
      incorrectQuestions: questionsApi.results[0].incorrect_answers,
      buttonColorCorrect: '',
      buttonColorIncorrect: '',
      answered: false,
      disable: false,
      timeoutQuestion: questionTimeout,
      intervalQuestion: questionInterval,
      timer: 30,
    }, this.allAnswers);
  };

  handleRightAnswerClick = () => {
    const { setPlayerScore } = this.props;
    const { timeoutQuestion, intervalQuestion, timer, questions } = this.state;
    const { difficulty } = questions;

    clearTimeout(timeoutQuestion);
    clearInterval(intervalQuestion);

    const level = difficultyNumber(difficulty);
    const total = totalScore(timer, level);
    setPlayerScore(total);

    this.setState({
      buttonColorCorrect: 'green',
      buttonColorIncorrect: 'red',
      answered: true,
    });
  };

  handleClick = () => {
    const { timeoutQuestion, intervalQuestion } = this.state;

    clearTimeout(timeoutQuestion);
    clearInterval(intervalQuestion);

    this.setState({
      buttonColorCorrect: 'green',
      buttonColorIncorrect: 'red',
      answered: true,
    });
  };

  handleClickNext = () => {
    const { timeoutQuestion, intervalQuestion } = this.state;

    clearTimeout(timeoutQuestion);
    clearInterval(intervalQuestion);

    this.queryQuestions();
  }

  allAnswers = () => {
    const {
      questions,
    } = this.state;

    const rightAnswer = {
      answer: questions.correct_answer,
      validation: true,
    }
    const wrongAnswers = []

    questions.incorrect_answers.forEach((e) => {
      wrongAnswers.push({
        answer: e,
        validation: false,
      });
    })
    
    const RANDOMIZE = 0.5;
    const allAnswers = [ rightAnswer, ...wrongAnswers ]
    const answers = allAnswers.sort(() => Math.random() - RANDOMIZE);
    this.setState({ wholeAnswers: answers });
  }


  render() {

    const { questions, answered, wholeAnswers, disable,
    buttonColorCorrect, buttonColorIncorrect, timer } = this.state;
    return (
      <main className="App-header">
        <Header />
        <p>{timer}</p>
        <h1 data-testid="Games-title">Games</h1>
        <p data-testid="question-category">{ questions.category }</p>
        <p data-testid="question-text">{ questions.question }</p>
        <div data-testid="answer-options">
          { wholeAnswers && wholeAnswers.map((e, i) => (
            e.validation === true ? (
              <button
                key="0"
                type="button"
                disabled={ disable }
                className={ buttonColorCorrect }
                onClick={ this.handleRightAnswerClick }
                data-testid="correct-answer"
              >
                { e.answer }
              </button>
            ) : (
              <button
                key={ i + 1 }
                type="button"
                disabled={ disable }
                className={ buttonColorIncorrect }
                onClick={ this.handleClick }
                data-testid={ `wrong-answer-${i}` }
              >
                { e.answer }
              </button>
            )
          )) }
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

const mapDispatchToProps = (dispatch) => ({
  setPlayerScore: (total) => dispatch(playerData(total)),
});

Games.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setPlayerScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Games);
