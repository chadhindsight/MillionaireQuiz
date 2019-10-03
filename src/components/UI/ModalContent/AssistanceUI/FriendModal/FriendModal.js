import React from 'react';

const friendModal = props => {

    const answerOrder = ["A", "B", "C", "D"];
    return (
        <div>
            Friend: I think that correct answer is {answerOrder[props.correctIndex]}.
        </div>
    );
}

export default friendModal;