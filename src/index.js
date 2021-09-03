import 'normalize.css';
import './style/styles.css';
import CalcInput from './calcinput.js';

function notify(text, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = text;
    document.body.appendChild(notification);
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
    })
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.parentNode.removeChild(notification);
        }, 500);
    }, duration);
}

const calcKeysElem = document.querySelector('.calc-keys');
const calcInputElem = document.querySelector('.calc-input');
const calcResultPreviewElem = document.querySelector('.calc-result-preview');
const input = new CalcInput();

calcKeysElem.addEventListener('click', e => {
    const target = e.target;
    if (!target.matches('button')) return;

    const value = target.textContent;
    const type = target.dataset.operator;
    try {
        input.append(type, value);
    } catch (e) {
        console.log(`${e.message}`);
        notify('Malformed expression');
    }

    let resultPreview = '';
    try {
        resultPreview = input.numberNormalize(input.eval());
    } catch (e) {
    }
    console.log(input.input);

    calcInputElem.textContent = input.toString();
    calcResultPreviewElem.textContent = resultPreview;

    e.stopPropagation();
});



const themeChk = document.getElementById('theme-chk');
const theme = localStorage.getItem('theme');
if (theme) {
    document.body.classList.add(theme);
    if (theme === 'dark') {
        themeChk.checked = true;
    }
}

themeChk.addEventListener('change', () => {
    console.log(themeChk.checked);
    const isDark = themeChk.checked;
    if (isDark) {
        document.body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
})

const operatorButtons = {
    'clear': document.querySelector('button[data-operator=\'clear\']'),
    'leftParen':document.querySelector('button[data-operator=\'left-paren\']'),
    'rightParen': document.querySelector('button[data-operator=\'right-paren\']'),
    'divide': document.querySelector('button[data-operator=\'divide\']'),
    'multiply': document.querySelector('button[data-operator=\'multiply\']'),
    'add': document.querySelector('button[data-operator=\'add\']'),
    'subtract': document.querySelector('button[data-operator=\'subtract\']'),
    'reset': document.querySelector('button[data-operator=\'reset\']'),
    'dot': document.querySelector('button[data-operator=\'dot\']'),
    'evaluate': document.querySelector('button[data-operator=\'evaluate\']')
}

window.addEventListener('keydown', (e) => {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
    });

    if (e.key >= '0' && e.key <= '9') {
        const numberElem = document.querySelector(`.key-${e.key}`);
        numberElem.dispatchEvent(event);
    } else {
        switch (e.key) {
            case 'Escape':
                operatorButtons['reset'].dispatchEvent(event);
                break;
            case '(':
                operatorButtons['leftParen'].dispatchEvent(event);
                break;
            case ')':
                operatorButtons['rightParen'].dispatchEvent(event);
                break;
            case 'Backspace':
                operatorButtons['clear'].dispatchEvent(event);
                break;
            case '*':
                operatorButtons['multiply'].dispatchEvent(event);
                break;
            case '/':
                operatorButtons['divide'].dispatchEvent(event);
                break;
            case '+':
                operatorButtons['add'].dispatchEvent(event);
                break;
            case '-':
                operatorButtons['subtract'].dispatchEvent(event);
                break;
            case '.':
                operatorButtons['dot'].dispatchEvent(event);
                break;
            case 'Enter':
                operatorButtons['evaluate'].dispatchEvent(event);
                break;
        }
    }
})