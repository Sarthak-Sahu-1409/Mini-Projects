const questions = [
    {
        question: "Largest Animal",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Fastest Land Animal",
        answers: [
            { text: "Cheetah", correct: true },
            { text: "Lion", correct: false },
            { text: "Horse", correct: false },
            { text: "Kangaroo", correct: false }
        ]
    },
    {
        question: "Tallest Mountain",
        answers: [
            { text: "K2", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Kangchenjunga", correct: false },
            { text: "Makalu", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currQind=0;
let score=0;

function startQuiz(){
    currQind=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQues = questions[currQind];
    let quesNum = currQind+1;
    questionElement.innerHTML = quesNum+". "+currQues.question;
    
    currQues.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{
    if(currQind<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function handleNextButton(){
    currQind++;
    if(currQind<questions.length) showQuestion();
    else showScore();
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

startQuiz();