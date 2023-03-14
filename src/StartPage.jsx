import React from 'react';
import { shuffleAnswers, checkAnswers, replay } from "./helpers.js"

export default function StartPage(props) {
  
  const [answersSelected, setAnswersSelected] = React.useState(0);

  function toggleLink(event) {

    let parentUL = event.target.closest("ul")
    let targetAnswer = event.target;
    let chosenAnswers = document.querySelectorAll(".active")

    targetAnswer.classList.add("active")

    chosenAnswers.forEach(answer => {
      if (parentUL.id === answer.dataset.nx) {
        answer.classList.remove("active")
      }
    })

    // setAnswersSelected(document.querySelectorAll(".active").length)

    if(document.querySelectorAll(".active").length === 5) {
      setAnswersSelected(document.querySelectorAll(".active").length)
    } else {
      setAnswersSelected(0)
    }

  }


  

  let questionsRender = props.questions.map(question => {

    let mixedAnswers = shuffleAnswers(question.correct_answer, question.incorrect_answers)

    return (
      <div className="single-question" >
        <h1 id={props.questions.indexOf(question)} className="question-riddle">{question.question}</h1>
        <ul id={props.questions.indexOf(question)} className="answers">
          {mixedAnswers.map((mixedAnswer) => (
            <li>
              <a
                className={props.questions.indexOf(question)}
                data-correct={mixedAnswer.isCorrect}
                data-nx={props.questions.indexOf(question)}
                onClick={toggleLink}>
                {mixedAnswer.answer}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  })

  return (
    <div className="start-page">
      <div className="start">
        <img className="blob-blue" alt="" src="../public/img/blob5.png" />
        <img className="blob-yellow" alt="" src="../public/img/blob5yel.png" />
        <h1 className="title">Quizzical</h1>
        <p className="description">Try out the funny quizzlet!</p>
        <button onClick={props.handleClick} className="btn start-btn">Start quiz</button>
      </div>
      <div className="quiz">
        {questionsRender}
      </div>
      <div className="check-wrapper">
        <button className="btn check-btn" disabled={answersSelected < 5} onClick={checkAnswers}>Check Answers</button>
      </div>
      <div className="solution-wrapper">
        <p>You got <span id="correct-answers">0</span>/5 answers correct!</p>
        <button className="btn play-btn" onClick={replay}>Play again</button>
      </div>
    </div>
  )
}