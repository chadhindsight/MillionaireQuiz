import React, { Component } from 'react';

import styles from './Answers.module.css';
import Answer from './Answer/Answer';

class Answers extends Component {
  state = {
    disabled: false
  };

  componentDidUpdate() {
    if (this.state.disabled === false) {
      return;
    }
    const change = () => {
      this.setState({
        disabled: false
      });
    };
    setTimeout(change, 2000);
  }

  toggleDisable = () => {
    this.setState({
      disabled: true
    });
  };

  render() {
    const answerOrder = ['A', 'B', 'C', 'D'];

    let answer = this.props.answers.map((answ, index) => {
      return (
        <Answer
          answerContent={answ}
          answerOrder={answerOrder[index]}
          disabled={this.state.disabled}
          toggleDisable={this.toggleDisable}
          click={this.props.answerClick.bind(this, index)}
          key={answ}
          correctAnswer={this.props.correctAnswer}
        />
      );
    });

    //in case elimination assistance is required, hide two answers
    if (this.props.isEliminationActive) {
      let indexArray = [0, 1, 2, 3];
      indexArray.splice(this.props.correctIndex, 1);
      let randomIndex = indexArray[Math.floor(Math.random() * 3)];
      console.log(randomIndex);

      answer = this.props.answers.map((answ, index) => {
        let hide =
          index === this.props.correctIndex || index === randomIndex
            ? false
            : true;
        return (
          <Answer
            answerContent={answ}
            answerOrder={answerOrder[index]}
            disabled={this.state.disabled}
            toggleDisable={this.toggleDisable}
            click={this.props.answerClick.bind(this, index)}
            hide={hide}
            key={answ}
            correctAnswer={this.props.correctAnswer}
          />
        );
      });
    }
    return <div className={styles.Answers}>{answer}</div>;
  }
}

export default Answers;
