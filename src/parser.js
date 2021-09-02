import {BinOp, UnaryOp, Num} from './ast.js';

class Parser {
    constructor(tokenStream) {
        this.tokenStream = tokenStream;
        this.tokenPos = 0;
        this.currentToken = this.getNextToken();
    }

    getNextToken() {
        return this.tokenStream[this.tokenPos++];
    }

    error(message) {
        const base = 'Parser error';
        const errMessage = message ? `${base}: ${message}` : base;
        throw new Error(errMessage);
    }

    consume(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.getNextToken();
        } else {
            this.error(`expected ${tokenType}, got ${this.currentToken}`);
        }
    }

    factor() {
        const token = this.currentToken;
        switch (token.type) {
            case 'number':
                this.consume(token.type);
                return new Num(token);
            case 'subtract':
            case 'add':
                this.consume(token.type);
                return new UnaryOp(token, this.expr());
            case 'left-paren':
                this.consume(token.type);
                const exprResult = this.expr();
                this.consume('right-paren');
                return exprResult;
        }
    }

    term() {
        let node = this.factor();
        let token = this.currentToken;
        while (token && (token.type === 'multiply' || token.type === 'divide')) {
            this.consume(token.type);
            node = new BinOp(node, token, this.factor());
            token = this.currentToken;
        }
        return node;
    }

    expr() {
        let node = this.term();
        let token = this.currentToken;
        while (token && (token.type === 'add' || token.type === 'subtract')) {
            this.consume(token.type);
            node = new BinOp(node, token, this.term())
            token = this.currentToken;
        }
        return node;
    }

    parse() {
        return this.expr();
    }
}

export default Parser;