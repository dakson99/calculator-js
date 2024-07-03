const numbers = document.querySelectorAll('.btn__number');
const operations = document.querySelectorAll('.btn__operation');
const outputMain = document.querySelector('.output__main');
const outputSecondary = document.querySelector('.output__secondary');
const deletes = document.querySelector('.btn__delete');
const clear = document.querySelector('.btn__clear');
const btnsContainer = document.querySelector('.buttons');
const container = document.querySelector('.container');
const btnEqual = document.querySelector('.btn__operation__equal');

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
    if (op == '+') return add(a, b);
    if (op == '*') return multiply(a, b);
    if (op == '-') return subtract(a, b);
    if (op == '/') return divide(a, b);
}

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

numbers.forEach((el) =>
    el.addEventListener('click', function (e) {
        if (outputMain.textContent === '0') outputMain.textContent = '';
        outputMain.textContent += el.textContent;

        firstNum = +outputMain.textContent;
        enableOperator();
    })
);

operations.forEach((el) =>
    el.addEventListener('click', function (e) {
        disableOperator();
        if (operator.length != 0) {
            result = operate(secondNum, firstNum, operator);
            operator = e.target.dataset.operation;
            secondNum = result;
            outputMain.textContent = '0';
            outputSecondary.textContent = `${secondNum} ${operator}`;
            console.log(firstNum, secondNum, result);
        } else {
            operator = e.target.dataset.operation;

            secondNum = firstNum;
            firstNum = '';
            outputMain.textContent = '0';
            outputSecondary.textContent = `${secondNum} ${operator}`;
            console.log(firstNum, secondNum, result);
        }
    })
);

btnEqual.addEventListener('click', function (e) {
    const resultEqual = operate(secondNum, firstNum, operator);
    outputSecondary.textContent = `${resultEqual} ${operator}`;
    outputMain.textContent = '0';
    enableOperator();
    console.log(firstNum, secondNum);
});