import React from 'react'
import './ActiveQuiz.scss'
import AnswersList from './AnswersList/AnswersList'


const ActiveQuiz = props => (
    <div className="ActiveQuiz">
        <p className="Question">
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} de {props.quizLength}</small>
        </p>

        <ul>
            <AnswersList 
                state={props.state}
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
            />
        </ul>

    </div>
)

export default ActiveQuiz
    
