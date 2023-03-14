import {useState} from 'react'
import './App.css'
import StartPage from "./StartPage.jsx"
import {decode} from "he";


export default function App() {
  
  const [data, setData] = useState([])
 
  function handleClick() {
    document.querySelector(".start").style.display = "none";
    document.querySelector(".quiz").style.display = "block"
    document.querySelector(".check-wrapper").style.display = "block"

    fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then(data => {
        const formattedData = data.results.map(result => { return {
            ...result, question: decode(result.question), correct_answer: decode(result.correct_answer), incorrect_answers: result.incorrect_answers.map(answer => decode(answer))
          }})
        setData(formattedData)})
        .catch(error => console.error(error))
    }

  return (

    <StartPage 
        handleClick={handleClick}
        questions={data}
    />
  )
        
  
}

