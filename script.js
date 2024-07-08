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
    firstNum;
    secondNum;
    operator;

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
    chooseOperation(op) {
        if (this.firstNum === '') return;
        if (this.secondNum !== '') {
            this.operate();
        }
        this.secondNum = this.firstNum;
        this.firstNum = '';
        this.operator = op;
    }

    operate() {

        let result;
        const first = Number(this.firstNum);
        const second = Number(this.secondNum);

        switch (this.operator) {
            case '+':
                result = second + first;
                break;
            case '-':
                result = second - first;
                break;
            case '*':
                result = second * first;
                break;
            case '/':
                if (first === 0) {
                    alert("Can't divide by 0 !");
                    this.clear();
                    return;
                } else {
                    result = second / first;
                }
                break;
            default:
                return;
        }
        this.firstNum = result;
        this.secondNum = '';
        this.operation = '';
    }

    updateDisplay() {
        if (this.firstNum === '')
            this.outputSecondary.textContent = `${this.secondNum} ${this.operator}`;
        if (this.secondNum === '') this.outputSecondary.textContent = '';
        this.outputMain.textContent = this.firstNum;
    }

    deleteLastDigit() {
        this.firstNum = this.firstNum.slice(0, -1);
    }

    clear() {
        this.firstNum = '';
        this.secondNum = '';
        this.operator = undefined;
    }
}

const calculator = new Calculator(outputMain, outputSecondary);

numbers.forEach((num) =>
    num.addEventListener('click', function () {
        calculator.appendNumber(num.textContent);
        calculator.updateDisplay();
    })
);

operations.forEach((op) =>
    op.addEventListener('click', function () {
        calculator.chooseOperation(op.textContent);
        calculator.updateDisplay();
    })
);

btnEqual.addEventListener('click', function () {
    calculator.operate();
    calculator.updateDisplay();
});

btnDelete.addEventListener('click', function () {
    calculator.deleteLastDigit();
    calculator.updateDisplay();
});

btnClear.addEventListener('click', function () {
    calculator.clear();
    calculator.updateDisplay();
});