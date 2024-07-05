const numbers = document.querySelectorAll('.btn__number');
const operations = document.querySelectorAll('.btn__operation');
const outputMain = document.querySelector('.output__main');
const outputSecondary = document.querySelector('.output__secondary');
const btnsContainer = document.querySelector('.buttons');
const container = document.querySelector('.container');
const btnEqual = document.querySelector('.btn__operation__equal');
const deletes = document.querySelector('.btn__delete');
const clear = document.querySelector('.btn__clear');
const btnDot = document.querySelector('.btn__dot');

// functions
const add = function (a, b) {
    return parseFloat(a) + parseFloat(b);
};

const subtract = function (a, b) {
    return parseFloat(a) - parseFloat(b);
};

const multiply = function (a, b) {
    return parseFloat(a) * parseFloat(b);
};

const divide = function (a, b) {
    return parseFloat(a) / parseFloat(b);
};

function operate(a, b, op) {
    if (op === '+') return add(a, b);
    if (op === '*') return multiply(a, b);
    if (op === '-') return subtract(a, b);
    if (op === '/') return divide(a, b);
}

const resetScreen = function () {
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    outputMain.textContent = '0';
    outputSecondary.textContent = '';
    btnDot.removeAttribute('disabled');
};

const computeResult = function () {
    result = Math.round(operate(secondNum, firstNum, operator) * 100) / 100;
};

const calcDisplayValues = function (valueNum, e) {
    operator = e.target.dataset.operation;
    secondNum = valueNum;
    outputMain.textContent = '0';
    outputSecondary.textContent = `${secondNum} ${operator}`;
};

const disableOperator = function () {
    operations.forEach((el) => el.setAttribute('disabled', 'disabled'));
};

const enableOperator = function () {
    operations.forEach((el) => el.removeAttribute('disabled'));
};

// global variables
let firstNum = '';
let secondNum = '';
let operator = '';
let stateTracker = false;
let result;

// event listeners
numbers.forEach((el) =>
    el.addEventListener('click', function (e) {
        if (outputMain.textContent === '0') outputMain.textContent = '';
        outputMain.textContent += el.textContent;

        firstNum = +outputMain.textContent;

        enableOperator();

        if (firstNum.toString().length > 9) {
            alert("You can't input a number containing more than 9 digits!");
        }
    })
);

operations.forEach((el) =>
    el.addEventListener('click', function (e) {
        disableOperator();
        btnDot.removeAttribute('disabled');
        if (!firstNum) return;

        // prevent operators from incrementing value
        if (operator === '') {
            calcDisplayValues(firstNum, e);
            firstNum = '';
        } else {
            computeResult();
            calcDisplayValues(result, e);
        }
    })
);

btnEqual.addEventListener('click', function (e) {
    if (!firstNum) return;

    computeResult();

    outputMain.textContent = '0';
    outputSecondary.textContent = `${secondNum} ${operator} ${firstNum} = ${result} `;

    enableOperator();
    btnDot.removeAttribute('disabled');

    if (firstNum === 0 && operator === '/') alert("You can't divide by 0");
    if (secondNum === '') outputSecondary.textContent = '';
});

btnClear.addEventListener('click', function (e) {
    resetScreen();
});

btnDelete.addEventListener('click', function (e) {
    outputMain.textContent = outputMain.textContent.slice(0, -1);
    if (outputMain.textContent.length < 1) outputMain.textContent = '0';
});

btnDot.addEventListener('click', function (e) {
    outputMain.textContent = outputMain.textContent + '.';

    // prevent deleting all the numbers from the screen
    btnDot.setAttribute('disabled', 'disabled');
});