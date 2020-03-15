var lives = 3;
var data = undefined;
var usedIndex = [];
var answerUsedIndex = []; // хранит индексы ответов
var counter = 0;
var score = 0;
var mode = 1;
var currentQuestion = undefined;
var name = 'Vasya';

fetch('data.json').then(response => response.json()).then(json => data = json);

$('.jsStartGame').on('click', () => {
    $('.homeScreen').addClass('animated').addClass('flipOutY');

    setTimeout(() => {
        $('.homeScreen').hide();
        $('.gameScreen').show().addClass('animated').addClass('flip').addClass('slower');
    }, 800);
    let inputName = $('#name').val();
    if (inputName) {
        name = inputName;
    }
    startGame(1, name);

});

$(document).on('click', '.js_answer', (e) => {
    var answerIsTrue = checkAnswer(mode, $(e.currentTarget).text(), currentQuestion);
    if (answerIsTrue) {
        score++;
        $(e.target).addClass('rightAnswer');
        $('.answer').addClass('zoomOutRight');
        $('.gameQuestion').removeClass('flipInX').addClass('flipOutX');
        setTimeout(() => {
            $('.answer').removeClass('rightAnswer').removeClass('wrongAnswer').removeClass('zoomOutRight').addClass('zoomIn');
            $('.gameQuestion').removeClass('flipOutX').addClass('flipInX');
        }, 2000);
        setTimeout(() => nextQuestion(mode), 1200);

    } else {
        $(e.target).addClass('wrongAnswer');
        $('.gameHealth img').eq((lives--) - 1).addClass('zoomOutRight');
        if (lives === 0) {
            $('.gameField').addClass('zoomOut');
            $('.popupWrapper').addClass('zoomIn').show();
            $('.resultPopup').addClass('flipInX');
            $('.js_score').text(name + ", Ваш счет: " + score);
        }
    }

});

$('.js_radio_mode').click((e) => {
    $('.js_radio_mode').removeClass('selectedMode');
    $(e.currentTarget).addClass('selectedMode');
});

function nextQuestion(mode) {
    switch (mode) {
        case 1:
            showRandomCountry();
            break;
    }
}

function startGame(mode = 1, userName = 'Vasya') {
    switch (mode) {
        case 1:
            showRandomCountry();
            break;
    }
}

function findDataByField(field, value) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][field] === value) {
            return data[i];
        }
    }
}

function checkAnswer(mode = 1, selectedAnswer, currentQuestion) {
    switch (mode) {
        case 1:
            return selectedAnswer.trim() === findDataByField('country_name', currentQuestion).country_capital.trim();
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }

}

function showRandomCountry() {
    var question = getRandomData(true);
    currentQuestion = question.country_name;
    var answers = [];
    answers.push(question.country_capital);
    for (let i = 0; i < 3; i++) {
        answers.push(getRandomAnswerIndex().country_capital);
    }
    answerUsedIndex = [];
    answers = shuffle(answers);
    $('.answer').each((ind, e) => {
        $(e).text(answers[ind]);
    });

    $('.questionCountry').text(question.country_name);
    $('.gameQuestion img').attr('src', question.country_flag_image);
}

function getRandomData(addIndexToUsed = false) {
    var index = Math.floor(Math.random() * data.length);
    if (usedIndex.includes(index)) {
        do {
            index = Math.floor(Math.random() * data.length);
        } while (!usedIndex.includes(index));
    }

    if (addIndexToUsed) {
        usedIndex.push(index);
    }

    return data[index];
}

function getRandomAnswerIndex() {
    var index = Math.floor(Math.random() * data.length);
    if (answerUsedIndex.includes(index)) {
        do {
            index = Math.floor(Math.random() * data.length);
        } while (!answerUsedIndex.includes(index));
    }

    answerUsedIndex.push(index);

    return data[index];
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}