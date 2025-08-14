// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const nextBirthday = new Date(now.getFullYear() + 1, 0, 1); // Change to friend's birthday
    
    // If birthday already passed this year, use next year
    if (now > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    
    const diff = nextBirthday - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Balloon Pop Game
const balloonContainer = document.getElementById('balloonContainer');
const scoreElement = document.getElementById('score');
let score = 0;

function createBalloons() {
    balloonContainer.innerHTML = '';
    score = 0;
    scoreElement.textContent = score;
    
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.setProperty('--color', getRandomColor());
        balloon.style.left = `${Math.random() * 80}%`;
        balloon.style.top = `${Math.random() * 60}%`;
        
        balloon.addEventListener('click', function() {
            if (!balloon.classList.contains('popped')) {
                balloon.classList.add('popped');
                score++;
                scoreElement.textContent = score;
                playPopSound();
                
                if (score === 10) {
                    setTimeout(() => {
                        alert('Congratulations! You popped all the balloons!');
                    }, 500);
                }
            }
        });
        
        balloonContainer.appendChild(balloon);
    }
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd', '#ff9ff3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playPopSound() {
    const popSound = new Audio('assets/audio/pop.mp3');
    popSound.volume = 0.3;
    popSound.play();
}

document.getElementById('resetBalloons').addEventListener('click', createBalloons);

// Initialize balloons
createBalloons();

// Spin the Wheel
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinWheel');
const result = document.getElementById('wheelResult');
let spinning = false;

spinBtn.addEventListener('click', function() {
    if (spinning) return;
    
    spinning = true;
    result.textContent = '';
    
    const spinDegrees = 1800 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${spinDegrees}deg)`;
    
    setTimeout(() => {
        spinning = false;
        const actualDegrees = spinDegrees % 360;
        const segment = Math.floor(actualDegrees / 60);
        
        const actions = ['Dance', 'Sing', 'Tell a Joke', 'Take a Selfie', 'Share a Story', 'Do an Impression'];
        result.textContent = `You got: ${actions[5 - segment]}!`;
    }, 3000);
});

// Quiz Game
const quizQuestions = [
    {
        question: "What is [Name]'s favorite color?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: 1 // Index of correct answer
    },
    {
        question: "What year was [Name] born?",
        options: ["1990", "1992", "1995", "1998"],
        answer: 2
    },
    {
        question: "What's [Name]'s favorite food?",
        options: ["Pizza", "Sushi", "Burgers", "Pasta"],
        answer: 0
    }
];

const quizContainer = document.getElementById('quizContainer');

quizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    
    let optionsHtml = '';
    q.options.forEach((opt, optIndex) => {
        optionsHtml += `
            <div class="quiz-option">
                <input type="radio" name="q${index}" id="q${index}o${optIndex}" value="${optIndex}">
                <label for="q${index}o${optIndex}">${opt}</label>
            </div>
        `;
    });
    
    questionDiv.innerHTML = `
        <h3>${index + 1}. ${q.question}</h3>
        ${optionsHtml}
    `;
    
    quizContainer.appendChild(questionDiv);
});

document.getElementById('submitQuiz').addEventListener('click', function() {
    let correct = 0;
    
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            correct++;
        }
    });
    
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = `
        You got ${correct} out of ${quizQuestions.length} correct!
        <br>
        ${correct === quizQuestions.length ? 'Perfect! You know [Name] very well!' : ''}
    `;
});