import 'normalize.css';
import './style/styles.css';
import CalcInput from './calcinput.js';

const calcKeysElem = document.querySelector('.calc-keys');
const calcInputElem = document.querySelector('.calc-input');
const calcResultPreviewElem = document.querySelector('.calc-result-preview');


const input = new CalcInput();

function calcButtonListener(e) {
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
    } catch (e){}
    console.log(input.input);

    calcInputElem.textContent = input.toString();
    calcResultPreviewElem.textContent = resultPreview;

    e.stopPropagation();
}
calcKeysElem.addEventListener('click', calcButtonListener);

function notify(text, duration=3000) {
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