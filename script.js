const display = document.querySelector('#display')
const display2 = document.querySelector('#display2')
const AC = document.querySelector('#AC');
const C = document.querySelector('#C');
const equal = document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');


let data = '';
let operatorData = '';
let cashedData = '';

numbers.forEach(number => number.addEventListener('click', inputNumber));
C.addEventListener('click', deleteLastDigit);
AC.addEventListener('click', allClear);
operators.forEach(operator => operator.addEventListener('click', inputOperator));
equal.addEventListener('click', inputEqual);



function inputNumber(e) {
    if (e.target.textContent === '.') {
        if (display.textContent.includes(e.target.textContent)) return;
        if (display.textContent === '0') {
            data = '0.';
            display.textContent = data;
            return;
        }
    };
    if (e.target.textContent === '0') {
        if (data === '0') return;
    };
    data += e.target.textContent;
    display.textContent = data;
};

function deleteLastDigit() {
    if (data.length > 0) data = data.split('').slice(0, -1).join('');
    display.textContent = data;
    if (data.length === 0) display.textContent = '0';
};

function allClear() {
    data = '';
    operatorData = '';
    cashedData = '';
    display.textContent = '0';
    display2.textContent = '';
};

function inputOperator(e) {
    if (data === '') return;
    if (operatorData === '') cashedData = data;
    if (operatorData === '+') cashedData = (Number(cashedData) + Number(data)).toString();
    if (operatorData === '-') cashedData = (cashedData - data).toString();
    if (operatorData === 'x') cashedData = (cashedData * data).toString();
    if (operatorData === '÷') cashedData = (cashedData / data).toString();
    if (operatorData === '^') cashedData = (Math.pow(cashedData, data)).toString();
    operatorData = e.target.textContent;
    data = '';
    display.textContent = '0';
    display2.textContent = cashedData + ' ' + operatorData;
};

function inputEqual() {
    if (data === '' || operatorData === '') return;
    display2.textContent = cashedData + ' ' + operatorData + ' ' + data;
    if (operatorData === '+') data = (Number(cashedData) + Number(data)).toString();
    if (operatorData === '-') data = (cashedData - data).toString();
    if (operatorData === 'x') data = (cashedData * data).toString();
    if (operatorData === '÷') data = (cashedData / data).toString();
    if (operatorData === '^') data = (Math.pow(cashedData, data)).toString();
    cashedData = '';
    operatorData = '';
    display.textContent = data;
};



// codes for keyboard support --------------------------------------------------------------
document.addEventListener('keydown', checkKeyPress)

function checkKeyPress(e) {
    if (e.key >= 0 && e.key <= 9 || e.key === '.') keyInputNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '^' ) keyInputOperator(e.key);
    if (e.key === '=' || e.key === 'Enter') inputEqual();
    if (e.key === 'Backspace') deleteLastDigit();
    if (e.key === 'A' || e.key === 'a') allClear();
};

function keyInputNumber(key) {
    if (key === '.') {
        if (display.textContent.includes(key)) return;
        if (display.textContent === '0') {
            data = '0.';
            display.textContent = data;
            return;
        }
    };
    if (key === '0') {
        if (data === '0') return;
    };
    data += key;
    display.textContent = data;
};

function keyInputOperator(key) {
    if (data === '') return;
    if (operatorData === '') cashedData = data;
    if (operatorData === '+') cashedData = (Number(cashedData) + Number(data)).toString();
    if (operatorData === '-') cashedData = (cashedData - data).toString();
    if (operatorData === 'x') cashedData = (cashedData * data).toString();
    if (operatorData === '÷') cashedData = (cashedData / data).toString();
    if (operatorData === '^') cashedData = (Math.pow(cashedData, data)).toString();
    operatorData = key;
    if (operatorData === '*') operatorData = 'x';
    if (operatorData === '/') operatorData = '÷';
    data = '';
    display.textContent = '0';
    display2.textContent = cashedData + ' ' + operatorData;
};