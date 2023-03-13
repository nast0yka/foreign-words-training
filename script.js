class word {
    constructor(rusWord, engWord, example) {
        this.rusWord = rusWord;
        this.engWord = engWord;
        this.example = example;
    }
}
const word1 = new word('кот', 'cat', 'Cat says MEOW');
const word2 = new word('животное', 'animal', `Giraffe is the tallest animal in the world`);
const word3 = new word('пробовать', 'try', 'try to guess');
const word4 = new word('добрый', 'kind', 'Hagrid is a kind man');
const word5 = new word('балл', 'point', 'you scored 5 points');
const word6 = new word('давать', 'give', 'give a present');
const word7 = new word('свидание', 'date', 'romantic date');
const word8 = new word('целый', 'whole', 'whole hall of people');
const word9 = new word('ожидать', 'expect', 'expect offers');
const word10 = new word('единица', 'unit', 'unit');
const word11 = new word('океан', 'ocean', 'ocean');
const word12 = new word('меньше', 'less', 'less');
const word13 = new word('ряд', 'row', 'row');
const word14 = new word('точный', 'exact', 'exact');
const word15 = new word('полдень', 'noon', 'shadows disappear at noon');

const arr = [word1, word2, word3, word4, word5, word6, word7, word8, word9, word10, word11, word12, word13, word14, word14];
// console.log(arr);

function giveIndex(min = 0, max) {
    let a = Math.random() * (max - min) + min;
    let result = +(a.toFixed(0));
    return result;
}

let btnBack = document.querySelector('#back');
let btnNext = document.querySelector('#next');
let btnTest = document.querySelector('#exam');

let currentWord = document.querySelector('#current-word');

let sliderContainer = document.querySelector('.slider')
let flipCard = document.querySelector('.flip-card');

let cardConteinerFront = document.querySelector("#card-front");
let showWordFront = cardConteinerFront.querySelector('h1');
let cardConteinerBack = document.querySelector("#card-back");
let showWordBack = cardConteinerBack.querySelector('h1');
let cardExample = cardConteinerBack.querySelector('span');

sliderContainer.addEventListener("click", () => {
    flipCard.classList.toggle('active');
});

let i = 0;
let currentWordCalc = 1;

let arrFive = [arr[giveIndex(0, 15)], arr[giveIndex(0, 15)], arr[giveIndex(0, 15)], arr[giveIndex(0, 15)], arr[giveIndex(0, 15)]]
    // console.log(arrFive);
let wordcheck = arrFive[i];
// console.log(wordcheck);

const translation = {}
for (let word of arrFive) {
    const { rusWord, engWord } = word;
    translation[rusWord] = engWord;
    translation[engWord] = rusWord;
}
console.log(translation);

function makeCard(wordcheck) {
    showWordFront.textContent = wordcheck.rusWord;
    showWordBack.textContent = wordcheck.engWord;
    cardExample.textContent = wordcheck.example;
    return flipCard;
}

makeCard(wordcheck);


btnNext.addEventListener("click", () => {
    i++;
    currentWordCalc++;
    btnBack.removeAttribute("disabled");
    if (i < 5) {
        wordcheck = arrFive[i];
        makeCard(wordcheck);
        currentWord.textContent = currentWordCalc;
    }
    if (i === 4) {
        btnNext.setAttribute("disabled", "disabled");
    }
    // console.log(i);
});

btnBack.addEventListener("click", () => {
    i--;
    currentWordCalc--;
    currentWord.textContent = currentWordCalc;
    btnNext.removeAttribute("disabled");
    wordcheck = arrFive[i];
    makeCard(wordcheck);
    if (i === 0) {
        btnBack.setAttribute("disabled", "disabled");
    }
    // console.log(i);
});


// РЕЖИМ ТЕСТИРОВАНИЯ ЗНАНИЙ
let conteinerStudyCards = document.querySelector(".study-cards");
let conteinerExamCards = document.querySelector("#exam-cards");


// функция для перетусовки элементов массива 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//карточка в режиме тестирования
function makeExamCard(obj) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardWord = document.createElement('p');
    cardWord.textContent = obj;
    card.append(cardWord);
    return card;
}
//вставка карточек
function renderExamCards() {
    const fragment = new DocumentFragment();
    const arrForExam = [];
    arrFive.forEach((item) => {
        const [question, answer] = [makeExamCard(item.rusWord),
            makeExamCard(item.engWord),
        ];
        arrForExam.push(question, answer);
    });
    shuffle(arrForExam);
    fragment.append(...arrForExam);
    conteinerExamCards.innerHTML = "";
    conteinerExamCards.append(fragment);
}

btnTest.addEventListener("click", () => {
    conteinerStudyCards.classList.add('hidden');
    renderExamCards();
});

let a = 0;
//выбор карточек пользователем
conteinerExamCards.addEventListener("click", function chooseCard(event) {
    const element = event.target.closest('div');
    let checkElement = [document.querySelector('.correct')];

    if (checkElement[0] === null) {
        element.classList.add('correct');
    } else {
        if (translation[element.textContent] === checkElement[0].textContent) {
            element.classList.add('correct');
            a++;
            if (a === 5) {
                alert('Супер! Вы выучили 5 слов!')
            }
            const disappearanceId = setTimeout(() => {
                element.classList.add('fade-out');
                checkElement[0].classList.add('fade-out');
                checkElement[0].classList.remove('correct');
                element.classList.remove('correct');
            }, 500);
        } else {
            element.classList.add('wrong');
            const disappearanceTwoId = setTimeout(() => {
                element.classList.remove('wrong');
            }, 500);
            checkElement[0].classList.remove('correct');
        }
    }

});