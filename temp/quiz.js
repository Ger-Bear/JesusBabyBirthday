function shuffle(arr) {
    return arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
}

function shuffleQuestions(questions) {
    const withShuffledOptions = questions.map((question) => ({ ...question, options: shuffle(question.options) }));
    return shuffle(withShuffledOptions);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Quiz {
    score = 0;
    currentQuestion = 0;
    questions = [];

    constructor() {
        this.score = 0;
        this.currentQuestion = 0;
        this.questions = [];
    }

    async readData() {
        this.questions = await fetch("data/questions.json")
                        .then(response => response.json())
                        .catch(error => console.error("Error loading JSON:", error));
        
        this.questions = shuffleQuestions(this.questions);
    }

    async start(quizContainer) {
        for (let index = 0; index < this.questions.length; ++index) {
            await this.showQuestion(quizContainer, index);
        } 

        this.clearContainer(quizContainer);
        quizContainer.appendChild(this.finalScore(this.score));
    }

    showQuestion(quizContainer, index) {
        return new Promise((resolve) => {
            this.clearContainer(quizContainer);

            const question = this.questions[index];
            this.addQuestion(quizContainer, question);

            var submitButton = document.getElementById('submit');

            submitButton.addEventListener('click', async () => {
                var scoreElement = document.getElementById('score');
                var resultElement = document.getElementById('result');
                var selectedAnswer = document.querySelector('input[name="answer"]:checked');

                if (selectedAnswer.value) {
                    console.log(`Selected: ${selectedAnswer.value}. Correct: ${question.answer}`);
                    if (selectedAnswer.value === question.answer.toString()) {
                        resultElement.innerHTML = 'Correct!';
                        resultElement.style.color = 'green';
                        this.score += 1;
                    } else {
                        resultElement.innerHTML = `Incorrect. The correct answer is ${question.answer}.`;
                        resultElement.style.color = 'red';
                    }

                    resultElement.classList.remove('hidden');
                    scoreElement.textContent = `Your total score: ${this.score}`;

                    console.log('Curr', index);
                    
                    await sleep(1000);
                    resolve();
                    index += 1;

                    console.log("Next!", index);
                }
            });
        });
    }

    clearContainer(container) {
        const heading = container.querySelector('#heading');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(heading);
    }
    
    addQuestion(quizContainer, question) {
        let questionElement = document.createElement('div');
        questionElement.id = 'question';
        questionElement.textContent = question.question;
        quizContainer.appendChild(questionElement)

        let answersElement = document.createElement('ul');
        answersElement.id = 'answers';
        question.options.forEach((option, index) => {
            const li = document.createElement('li');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'answer';
                input.value = option;
                input.id = index;
                const label = document.createElement('label');
                label.textContent = option;
                li.appendChild(input);
                li.appendChild(label);
                answersElement.appendChild(li);
        });
        quizContainer.appendChild(answersElement);

        const submitButton = document.createElement('button');
        submitButton.id = 'submit';
        submitButton.textContent = 'Submit Answer';
        quizContainer.appendChild(submitButton);

        const resultElement = document.createElement('div');
        resultElement.id = 'result';
        resultElement.classList.add('hidden');
        quizContainer.appendChild(resultElement);

        const scoreElement = document.createElement('div');
        scoreElement.id = 'score';
        scoreElement.textContent = `Your total score: ${this.score}`;
        quizContainer.appendChild(scoreElement);
    }

    finalScore(score) {
        let scoreElement = document.createElement('div');
        scoreElement.textContent = `Quiz completed! Your total score is ${this.score}/${this.questions.length}.`;

        return scoreElement;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    let quiz = new Quiz();
    await quiz.readData();

    var quizContainer = document.querySelector('.quiz-container');

    quiz.start(quizContainer);
});