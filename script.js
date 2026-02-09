// ==========================
// QUIZ DATA
// ==========================
const quizData = {

    science: [
        { question: "What planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
        { question: "What gas do plants absorb?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
        { question: "Which organ pumps blood?", answers: ["Lungs", "Brain", "Heart", "Liver"], correct: 2 },
        { question: "What force pulls objects to Earth?", answers: ["Magnetism", "Gravity", "Friction", "Electricity"], correct: 1 },
        { question: "Where does photosynthesis occur?", answers: ["Root", "Stem", "Leaf", "Flower"], correct: 2 },
        { question: "What is H2O?", answers: ["Salt", "Hydrogen", "Water", "Oxygen"], correct: 2 },
        { question: "Which organ helps you breathe?", answers: ["Heart", "Lungs", "Stomach", "Brain"], correct: 1 },
        { question: "What do humans breathe in?", answers: ["CO2", "Nitrogen", "Oxygen", "Helium"], correct: 2 },
        { question: "Boiling point of water?", answers: ["50°C", "100°C", "0°C", "75°C"], correct: 1 },
        { question: "Closest planet to the sun?", answers: ["Earth", "Mars", "Venus", "Mercury"], correct: 3 }
    ],

    math: [
        { question: "5 + 7 =", answers: ["10", "11", "12", "13"], correct: 2 },
        { question: "9 × 6 =", answers: ["42", "48", "54", "56"], correct: 2 },
        { question: "20 ÷ 4 =", answers: ["4", "5", "6", "8"], correct: 1 },
        { question: "15 − 9 =", answers: ["5", "6", "7", "8"], correct: 1 },
        { question: "Square of 4?", answers: ["8", "12", "14", "16"], correct: 3 },
        { question: "10 × 10 =", answers: ["50", "100", "150", "200"], correct: 1 },
        { question: "45 ÷ 5 =", answers: ["7", "8", "9", "10"], correct: 2 },
        { question: "3² =", answers: ["6", "9", "12", "3"], correct: 1 },
        { question: "100 − 25 =", answers: ["65", "70", "75", "80"], correct: 2 },
        { question: "8 × 7 =", answers: ["54", "56", "58", "60"], correct: 1 }
    ],

    sports: [
        { question: "Players in a soccer team?", answers: ["9", "10", "11", "12"], correct: 2 },
        { question: "Which sport is played with a hoop?", answers: ["Soccer", "Tennis", "Basketball", "Cricket"], correct: 2 },
        { question: "Goal worth in soccer?", answers: ["1", "2", "3", "5"], correct: 0 },
        { question: "which sport is played at Wimbledon?", answers: ["Cricket", "Tennis", "Rugby", "Golf"], correct: 1 },
        { question: "Olympic rings?", answers: ["4", "5", "6", "7"], correct: 1 },
        { question: "Bat and ball sport?", answers: ["Basketball", "Swimming", "Cricket", "Boxing"], correct: 2 },
        { question: "Soccer half length?", answers: ["30", "40", "45", "50"], correct: 2 },
        { question: "2010 World Cup host?", answers: ["Brazil", "Germany", "South Africa", "France"], correct: 2 },
        { question: "Which sport does Lionel Messi play?", answers: ["Basketball", "Tennis", "Soccer", "Rugby"], correct: 2 },
        { question: "How many basketball players should be on court?", answers: ["4", "5", "6", "7"], correct: 1 }
    ]

};


// ==========================
// QUIZ CLASS (OOP)
// ==========================
class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    checkAnswer(answerIndex) {

        if (answerIndex === this.getCurrentQuestion().correct) {
            this.score++;
            return true;
        }

        return false;
    }

    nextQuestion() {
        this.currentIndex++;
    }

    isFinished() {
        return this.currentIndex >= this.questions.length;
    }

    getScore() {
        return this.score;
    }

    getTotalQuestions() {
        return this.questions.length;
    }

}


// ==========================
// GLOBAL VARIABLE
// ==========================
let quiz;


// ==========================
// START QUIZ
// ==========================
function startQuiz(topic) {

    quiz = new Quiz(quizData[topic]);

    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    showQuestion();
}


// ==========================
// SHOW QUESTION
// ==========================
function showQuestion() {

    const question = quiz.getCurrentQuestion();

    document.getElementById("question-text").innerText = question.question;

    document.getElementById("question-number").innerText =
        `Question ${quiz.currentIndex + 1} of ${quiz.getTotalQuestions()}`;

    document.getElementById("score-display").innerText =
        `Score: ${quiz.getScore()}`;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.innerText = answer;
        button.classList.add("answer-btn");

        button.onclick = () => selectAnswer(button, index);

        answersContainer.appendChild(button);

    });

}


// ==========================
// SELECT ANSWER
// ==========================
function selectAnswer(button, answerIndex) {

    const correct = quiz.checkAnswer(answerIndex);

    if (correct) {
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }

    // Disable all buttons after answer
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(btn => btn.disabled = true);

    document.getElementById("next-btn").classList.remove("hidden");

}


// ==========================
// NEXT QUESTION
// ==========================
function nextQuestion() {

    quiz.nextQuestion();

    document.getElementById("next-btn").classList.add("hidden");

    if (quiz.isFinished()) {
        showResults();
    } else {
        showQuestion();
    }

}


// ==========================
// SHOW RESULTS
// ==========================
function showResults() {

    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    const score = quiz.getScore();
    const total = quiz.getTotalQuestions();

    const percentage = Math.round((score / total) * 100);

    document.getElementById("final-score").innerText =
        `Final Score: ${score}/${total}`;

    document.getElementById("percentage").innerText =
        `Percentage: ${percentage}%`;

}


// ==========================
// RESTART QUIZ
// ==========================
function restartQuiz() {

    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");

}


// ==========================
// GO HOME
// ==========================
function goHome() {

    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");

}
