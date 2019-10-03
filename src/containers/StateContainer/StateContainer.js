import React, { Component } from 'react';

import styles from './StateContainer.module.css';
import Answers from '../../components/Answers/Answers';
import Question from '../../components/Question/Question';
import Rating from '../../components/Rating/Rating';
import QuestionsData from '../../questions.json';
// import NewGame from '../../components/UI/Modal/ModalContent/NewGame/NewGame';
import Modal from '../../components/UI/Modal/Modal';
// import Button from '../../components/UI/Button/Button';
import ModalContent from '../../components/UI/ModalContent/ModalContent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Assistance from '../../components/Assistance/Assistance';
import StartExit from '../../components/UI/StartExit/StartExit';

class StateContainer extends Component {
  state = {
    questionsSet: QuestionsData.questionsSet0,
    progress: 0,
    modalContent: null,
    eliminationActivated: false,
    usedAssistance: {
      audience: false,
      friendCall: false,
      elimination: false
    }
  };

  componentDidMount () {
    this.newGameModal();        
  }

  newGameModal = () => {
    this.setState({
      modalContent: 'newGame'
    }); 
  }

  exitGameModal = () => {
    this.setState({
      modalContent: 'exitGame'
    });
  }

  answerHandler = index => {
    const correctIndex = this.state.questionsSet[this.state.progress]
      .correct;

    const correctAnswer = () => {
      this.setState(prevState => ({
        progress: prevState.progress + 1,
        eliminationActivated: false
      }));
    };

    const wrongAnswer = () => {
      alert('You lost the game!');
      this.resetGame(); 
      this.setState({
        modalContent: 'newGame'
      });
    };

    if (index === correctIndex) {
      //check if it's end of the game
      if (this.state.progress === 14) {
        alert('Bravvooo!');
        return;
      }
      setTimeout(correctAnswer, 2000);
    } else {
      setTimeout(wrongAnswer, 2000);
    }
  };

  cancelHandler = () => {
    this.setState({
      modalContent: null
    })
  }

  startGame = () => {
    const randNum = Math.floor(Math.random() * 5) + 1,
          questionsSet = 'questionsSet' + randNum.toString();
    this.setState({
      questionsSet: QuestionsData[questionsSet],
      modalContent: null
    });
  }

  resetGame = () => {
    this.setState({
      questionsSet: QuestionsData.questionsSet0,
      progress: 0,
      modalContent: null,
      eliminationActivated: false,
      usedAssistance: {
        audience: false,
        friendCall: false,
        elimination: false
      }
    });
  }

  handleAudience = () => {
    const usedAssistance = {...this.state.usedAssistance};
    usedAssistance.audience = true;
    this.setState({
      modalContent: 'audience',
      usedAssistance: usedAssistance
    });
  }

  handleFriendCall = () => {
    const usedAssistance = {...this.state.usedAssistance};
    usedAssistance.friendCall = true;
    this.setState({
      modalContent: 'friendCall',
      usedAssistance: usedAssistance
    });
  }

  handleElimination = () => {
    const usedAssistance = {...this.state.usedAssistance};
    usedAssistance.elimination = true;
    this.setState({
      eliminationActivated: true,
      usedAssistance: usedAssistance
    });
  }

  render() {
    const  question = this.state.questionsSet[this.state.progress].question,
           answers = this.state.questionsSet[this.state.progress].content,
           correctIndex = this.state.questionsSet[this.state.progress].correct,
           correctAnswer = answers[correctIndex];

    return (
      <div className={styles.Container}>
        <Backdrop closeModal={this.cancelHandler} modalContent={this.state.modalContent} />
        <Modal show={this.state.modalContent}
              confirmGame={this.startGame}
              exitGame={this.resetGame}>
              <ModalContent activeModal={this.state.modalContent}
                            confirmGame={this.startGame}
                            exitGame={this.resetGame}
                            cancelHandler={this.cancelHandler}
                            correctIndex={this.state.questionsSet[this.state.progress].correct}
                           />
        </Modal>
        <main>
        <StartExit newGame={this.newGameModal} exitGame={this.exitGameModal} questionsSet={this.state.questionsSet} />
      <section className="gameMain">
          <Question question={question} />
          <Answers
            answers={answers}
            answerClick={index => this.answerHandler(index)}
            correctAnswer={correctAnswer}
            correctIndex={this.state.questionsSet[this.state.progress].correct}
            isEliminationActive={this.state.eliminationActivated}
          />
          </section>
        </main>
        <aside>
          <Assistance showAudience={this.handleAudience}
                      showFriendCall={this.handleFriendCall}
                      showElimination={this.handleElimination}
                      usedAssistance={this.state.usedAssistance} />
          <Rating progress={this.state.progress} />
        </aside>
      </div>
    );
  }
}

export default StateContainer;
