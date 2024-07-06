// selectors

const btnsContainer = document.querySelector('.buttons');

const outputMain = document.querySelector('[data-output-main]');
const outputSecondary = document.querySelector('[data-output-secondary]');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation ]');
const btnEqual = document.querySelector('[data-equals]');
const btnDelete = document.querySelector('[data-delete]');
const btnClear = document.querySelector('[data-all-clear]');

class Calculator {
    constructor(outputMain, outputSecondary) {
        this.outputMain = outputMain;
        this.outputSecondary = outputSecondary;

        this.clear();
    }


    appendNumber(num) {
        if (num === '.' && this.firstNum.toString().includes('.')) return;
        if (num === '.' && this.firstNum.toString().length === 0) return;
        this.firstNum = this.firstNum.toString() + num.toString();
    }

    operate() { }

    updateDisplay() {
        this.outputMain.textContent = this.firstNum;
    }

    clear() {
        this.firstNum = '';
        this.secondNum = '';
        this.operator = '';
    }
}

const calculator = new Calculator(outputMain, outputSecondary);

numbers.forEach((num) =>
    num.addEventListener('click', function () {
        calculator.appendNumber(num.textContent);
        calculator.updateDisplay();
    })
);

