// selectors
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

const storeDisplayValues = function (variable, e) {
    operator = e.target.dataset.operation;
    secondNum = variable;
    outputMain.textContent = '0';
    outputSecondary.textContent = `${secondNum} ${operator}`;
};

const checkZeroDivisor = function () {
    if (firstNum === 0 && operator === '/') {
        alert("You can't divide by 0!");
        resetScreen();
    }
};

const disableOperator = function () {
    operations.forEach((el) => el.setAttribute('disabled', 'disabled'));
};

const enableOperator = function () {
    operations.forEach((el) => el.removeAttribute('disabled'));
};

const deleteLastDigit = function () {
    outputMain.textContent = outputMain.textContent.slice(0, -1);

    // prevent deleting all the numbers from the screen
    if (outputMain.textContent.length < 1) outputMain.textContent = '0';
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
        if (outputMain.textContent === '0') {
            outputMain.textContent = '';
        }
        outputMain.textContent += el.textContent;

        firstNum = +outputMain.textContent; // store firstNum

        enableOperator();

        // limit number of digits
        if (firstNum.toString().length > 9) {
            alert("You can't input a number containing more than 9 digits!");
        }
        console.log(firstNum, secondNum);
    })
);

operations.forEach((el) =>
    el.addEventListener('click', function (e) {
        // prevent from entering an operator before entering a digit
        if (firstNum === '' && secondNum === '') return;

        // prevent operators from incrementing value
        disableOperator();
        btnDot.removeAttribute('disabled');

        // main logic; storing values
        if (operator === '') {
            storeDisplayValues(firstNum, e); //  secondNum = firstNum
            firstNum = ''; // empty firstNum (store again from display)
        } else {
            computeResult();
            storeDisplayValues(result, e); // secondNum = result (chain operations)
        }
        checkZeroDivisor();
    })
);

btnEqual.addEventListener('click', function (e) {
    computeResult();
    checkZeroDivisor();
    if (firstNum === '' || operator === '') return;
    console.log(firstNum, secondNum, operator);

    outputMain.textContent = '0';
    outputSecondary.textContent = `${secondNum} ${operator} ${firstNum} = ${result} `;

    enableOperator();
    btnDot.removeAttribute('disabled');
});

btnClear.addEventListener('click', resetScreen);

btnDelete.addEventListener('click', deleteLastDigit);

// delete last digit on Backspace
document.addEventListener('keydown', deleteLastDigit);

// add decimal
btnDot.addEventListener('click', function (e) {
    outputMain.textContent = outputMain.textContent + '.';
    btnDot.setAttribute('disabled', 'disabled');
});