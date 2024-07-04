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
        btnDot.removeAttribute('disabled');

        if (outputMain.textContent === '0') firstNum = 0;
        if (operator === '') {
            operator = e.target.dataset.operation;
            secondNum = firstNum;
            firstNum = '';
            outputMain.textContent = '0';
            outputSecondary.textContent = `${secondNum} ${operator}`;
            console.log(firstNum, secondNum, result);
        } else {
            operator.length != 0;
            result = operate(secondNum, firstNum, operator);
            operator = e.target.dataset.operation;

            secondNum = result;
            outputMain.textContent = '0';
            outputSecondary.textContent = `${secondNum} ${operator}`;
        }

        console.log(firstNum, secondNum);
    })
);

btnEqual.addEventListener('click', function (e) {
    const resultEqual = operate(secondNum, firstNum, operator);
    outputSecondary.textContent = `${secondNum} ${operator} ${firstNum} = ${resultEqual} `;
    outputMain.textContent = '0';
    enableOperator();
    btnDot.removeAttribute('disabled');
    if (firstNum === 0 && operator === '/') alert("You can't divide by 0");
    if (firstNum === '' && secondNum === '') {
        firstNum = '';
        secondNum = '';
        operator = '';
        result = '';
        outputMain.textContent = '0';
        outputSecondary.textContent = '';
    }
});

btnClear.addEventListener('click', function (e) {
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    outputMain.textContent = '0';
    outputSecondary.textContent = '';
    btnDot.removeAttribute('disabled');
});

btnDelete.addEventListener('click', function (e) {
    outputMain.textContent = outputMain.textContent.slice(0, -1);
    if (outputMain.textContent.length < 1) outputMain.textContent = '0';
});

btnDot.addEventListener('click', function (e) {
    outputMain.textContent = outputMain.textContent + '.';
    btnDot.setAttribute('disabled', 'disabled');
});