import Token from './token.js';
import Interpreter from './interpreter.js';

class CalcInput {
    constructor() {
        this.input = [];
    }

    append(type, value) {
        if ((value >= '0' && value <= '9')) {
            this.appendValue('number', value);
        } else {
            this.appendOperator(type, value);
        }
    }

    appendValue(type, value) {
        const lastToken = this.input[this.input.length - 1];
        if (!lastToken || lastToken.type !== 'number') {
            this.input.push(new Token(type, value));
        } else {
            if (lastToken.value.length < 15) {
                lastToken.value += value;
            } else {
                throw new RangeError('Can\'t enter more than 15 digits');
            }
        }
    }

    appendOperator(type, value) {
        switch (type) {
            case 'clear':
                this.clearInput();
                break;
            case 'reset':
                this.input = [];
                break;
            case 'evaluate':
                if (this.input.length !== 0) {
                    const result = this.eval();
                    this.input = [new Token('number', result.toString())];
                }
                break;
            case 'dot':
                if (this.input.length === 0) {
                    this.input = [new Token('number', '0.')];
                } else {
                    const lastToken = this.input[this.input.length - 1];
                    if (lastToken.type === 'number' && !lastToken.value.includes('.')) {
                        lastToken.value += '.';
                    }
                }
                break;
            default:
                this.input.push(new Token(type, value));
        }
    }

    clearInput() {
        const lastToken = this.input[this.input.length - 1];
        if (!lastToken) return;

        if (lastToken.value.length === 1) {
            this.input.pop();
        } else {
            lastToken.value = lastToken.value.slice(0, -1);
        }
    }

    eval() {
        const interpreter = new Interpreter(this.input);
        return interpreter.eval();
    }

    toString() {
        return this.input
            .map(e => e.type === 'number' ? this.numberNormalize(e.value) : e.value)
            .join('');
    }

    numberNormalize(num) {
        num = num.toString()
        const dotIndex = num.indexOf('.');
        if (dotIndex === -1) {
            return Number(num).toLocaleString();
        } else {
            return Number(num.slice(0, dotIndex + 1)).toLocaleString() + num.slice(dotIndex);
        }
    }
}

export default CalcInput;