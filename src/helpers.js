export function shuffleAnswers(correctAnswer, incorrectAnswers) {

  let corAns = {
    answer: correctAnswer,
    isCorrect: true,
  }

  let allAnswers = incorrectAnswers.map(answ => {
    return {
              answer: answ,
              isCorrect: false,
           }
  })

  let randomIndex = Math.floor(Math.random() * (allAnswers.length + 1))
  allAnswers.splice(randomIndex, 0, corAns)
  
  return allAnswers
}

export function checkAnswers() {
  document.querySelectorAll(".active").forEach(element => {
    let counter = 0;
    if(document.querySelectorAll(".active").length === 5) {
       document.querySelectorAll("a").forEach(link => {
        if(link.dataset.correct === "true" && !link.classList.contains("active")) {
          link.style.backgroundColor = "salmon"
          counter++
        }
        element.style.backgroundColor = "lightgreen"
      })
      document.querySelector(".check-wrapper").style.display = "none"
      document.querySelector(".solution-wrapper").style.display = "flex";
      document.querySelector("#correct-answers").textContent = 5 - counter;
    }
  })
  
  return document.querySelectorAll(".active").length;
}



export function replay() {
  location.reload()
}