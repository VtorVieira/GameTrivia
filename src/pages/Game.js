import React, { Component } from 'react';
import PropTypes from 'prop-types/';
import { connect } from 'react-redux';
import { getQuestions } from '../api/triviaAPI';
import Header from '../components/Header';
import './Game.css';
import { playerAnsweredQuestions, playerCorrectQuestions,
  playerScore } from '../redux/actions';
import { difficultyNumber, totalScore } from '../helpers/difficulty';

class Games extends Component {
  state = {
    questions: [],
    allQuestions: [],
    buttonColorCorrect: '',
    buttonColorIncorrect: '',
    disable: false,
    answered: false,
    timeoutQuestion: '',
    timer: 30,
  };

  componentDidMount() {
    this.queryQuestions();
  }

  timeoutsAndIntervals = () => {
    const TIMEOUT_TIMER = 30000;
    const INTERVAL_TIMER = 1000;

    const questionTimeout = setTimeout(() => {
      this.setState({ disable: true, answered: true });
    }, TIMEOUT_TIMER);

    const questionInterval = setInterval(() => {
      const { timer } = this.state;
      const set = this.setState((prev) => ({ timer: prev.timer - 1 }));
      if (timer === 0) {
        return clearInterval(questionInterval);
      }
      return set;
    }, INTERVAL_TIMER);

    this.setState({
      timeoutQuestion: questionTimeout,
      intervalQuestion: questionInterval,
      timer: 30,
    });
  }

  queryQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questionsApi = await getQuestions(token);

    if (questionsApi.response_code !== 0) {
      history.push('/');
    }

    this.timeoutsAndIntervals();

    this.setState({
      questions: questionsApi.results[0],
      allQuestions: questionsApi.results,
      buttonColorCorrect: '',
      buttonColorIncorrect: '',
      answered: false,
      disable: false,
    }, this.allAnswers);
  };

  handleRightAnswerClick = () => {
    const { setPlayerScore, setPlayerAssertions,
      setPlayerAnsweredQuestions } = this.props;
    const { timeoutQuestion, intervalQuestion, timer, questions } = this.state;
    const { difficulty } = questions;

    clearTimeout(timeoutQuestion);
    clearInterval(intervalQuestion);
    this.timeoutsAndIntervals();

    const level = difficultyNumber(difficulty);
    const total = totalScore(timer, level);
    setPlayerScore(total);
    setPlayerAssertions();
    setPlayerAnsweredQuestions();

    this.setState({
      buttonColorCorrect: 'green',
      buttonColorIncorrect: 'red',
      answered: true,
    });
  };

  handleClick = () => {
    const { setPlayerAnsweredQuestions } = this.props;
    const { timeoutQuestion, intervalQuestion } = this.state;

    clearTimeout(timeoutQuestion);
    clearInterval(intervalQuestion);
    this.timeoutsAndIntervals();
    setPlayerAnsweredQuestions();

    this.setState({
      buttonColorCorrect: 'green',
      buttonColorIncorrect: 'red',
      answered: true,
    });
  };

  handleClickNext = () => {
    const { playerAnswers, history } = this.props;
    const { timeoutQuestion, intervalQuestion, allQuestions } = this.state;
    const maxQuestions = 5;

    if (playerAnswers < maxQuestions) {
      clearTimeout(timeoutQuestion);
      clearInterval(intervalQuestion);

      this.setState({
        questions: allQuestions[playerAnswers],
        buttonColorCorrect: '',
        buttonColorIncorrect: '',
        answered: false,
      }, this.allAnswers);
    }
    if (playerAnswers === maxQuestions) {
      const { userName, userImg, score } = this.props;
      console.log(this.props);
      const objPlayer = { name: userName, score, picture: userImg };
      const oldStorage = JSON.parse(localStorage.getItem('ranking'));
      console.log(oldStorage);
      if (oldStorage !== null) {
        const rankingArray = [];
        rankingArray.push(...oldStorage, objPlayer);
        localStorage.setItem('ranking', JSON.stringify(rankingArray));
      } else {
        localStorage.setItem('ranking', JSON.stringify([objPlayer]));
      }
      history.push('/feedback');
    }
  }

  allAnswers = () => {
    const {
      questions,
    } = this.state;

    const rightAnswer = {
      answer: questions.correct_answer,
      validation: true,
    };
    const wrongAnswers = [];

    questions.incorrect_answers.forEach((e) => {
      wrongAnswers.push({
        answer: e,
        validation: false,
      });
    });

    const RANDOMIZE = 0.5;
    const allAnswers = [rightAnswer, ...wrongAnswers];
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
  setPlayerScore: (total) => dispatch(playerScore(total)),
  setPlayerAssertions: () => dispatch(playerCorrectQuestions()),
  setPlayerAnsweredQuestions: () => dispatch(playerAnsweredQuestions()),
});

const mapStateToProps = (state) => ({
  playerAnswers: state.player.answers,
  userName: state.userReducer.name,
  userImg: state.userReducer.img,
  score: state.player.score,
});

Games.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  setPlayerAssertions: PropTypes.func.isRequired,
  setPlayerAnsweredQuestions: PropTypes.func.isRequired,
  playerAnswers: PropTypes.number.isRequired,
  userImg: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
