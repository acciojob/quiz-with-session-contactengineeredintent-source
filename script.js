const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let questionTag = document.querySelector("#question");
let scoreTag = document.querySelector("#score");
let btnSubmit = document.querySelector("#submit");
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

let correctAns = [];
let userAns = [];
// Display the quiz questions and choices
function renderQuestions() {
  questions.forEach((question, index) => {
    let currentQuestion = question.question;
    let currentOptions = question.choices;
    correctAns.push(question.answer);
    let savedAnswer = userAnswers[`question_${index}`];
    // console.log(savedAnswer);
    questionTag.insertAdjacentHTML(
      "beforeend",
      `
      <div>
        <p class="fs-4 fw-bold mb-0 mt-3">${currentQuestion}</p>
        <label class="fs-5 ms-2">
          <input type="radio" name="question_${index}"  value="${currentOptions[0]}" ${savedAnswer === currentOptions[0] ? "checked" : ""}/>
          ${currentOptions[0]}
        </label>
        <br>
        <label class="fs-5 ms-2">
          <input type="radio" name="question_${index}"  value="${currentOptions[1]}" ${savedAnswer === currentOptions[1] ? "checked" : ""}/>
          ${currentOptions[1]}
        </label>
        <br>
       <label class="fs-5 ms-2">
          <input type="radio" name="question_${index}"  value="${currentOptions[2]}" ${savedAnswer  === currentOptions[2] ? "checked" : ""} />
          ${currentOptions[2]}
        </label>
        <br>
        <label class="fs-5 ms-2">
          <input type="radio" name="question_${index}"  value="${currentOptions[3]}" ${savedAnswer  === currentOptions[3] ? "checked" : ""}/>
          ${currentOptions[3]}
        </label>
      </div>
      `,
    );
  });
}

questionTag.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    let key = e.target.name;
    let value = e.target.value;
    userAnswers[key] = value;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

renderQuestions();
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(correctAns);
  console.log(userAnswers);
  let userScore = 0;
  questions.forEach((question, index)=>{
    let userAnswer = userAnswers[`question_${index}`];
    if(userAnswer === question.answer){
      userScore++;
    }
  });
  scoreTag.textContent = `Your score is ${userScore} out of 5.`;
  localStorage.setItem("final score",userScore);
});
// console.log(userAnswers.question_0);