
const questions= [
  {
    question:"Which of these outcomes is a higher priority for you?",
    answers: [
      { text:"Losing weight", correct:true },
      {  text:"Having a healthier lifestyle", correct:false },
      
      
    ]
  },
  { 
    question:"Reaching my goal weight…",
    answers: [
      { text:"Will make other parts of my life better",correct:true },
      {  text:"Wouldn't change the rest of my life much",correct:false },
   
    ]

  },
  {
    question:"Please indicate which statement you agree with more.",
    answers: [
      { text:"I am confident and happy with my body no matter what I weigh",correct:false      },
      {  text:"I would be more confident and happerier if I reached my goal weight",correct:true },
      
    ]

  },
  {
    question:"Which of these statements do you agree with more?",
    answers: [
      { text:"My weight always seem to be on my mind",correct:true },
      {  text:"I only think about my weight when it is triggered by something else",correct:false },
      
    ]

  }
];



document.getElementById('start-btn').addEventListener('click', function() {
  document.getElementById('content').style.display = 'none';
  document.getElementsById('questionElement').style.display = 'block';
});




const questionElement = document.getElementById("question");
const answerButtons = document.getElementById  ("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score= 0;



function startQuiz(){
  currentQuestionIndex = 0;
  score=0;
  nextButton.innerHTML ="Next";
  showQuestion();
}
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNO=currentQuestionIndex + 1;
  questionElement.innerHTML = questionNO + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add( "btn" );
    answerButtons.appendChild(button);
    
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

}
function resetState() {
  nextButton.style.display="none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true" ;
   if(isCorrect) {
    selectedBtn.classList.add("correct");
    //score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML= `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again"
  nextButton .style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if( currentQuestionIndex < questions.length){
    showQuestion();
  }
   else {
   showScore();


   }
  }
nextButton.addEventListener("click", () => {
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();


