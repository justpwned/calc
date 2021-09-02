import Parser from './parser.js'

export default class Interpreter {
    constructor(tokens) {
        this.parser = new Parser(tokens);
    }

    visitNum(node) {
        return Number(node.token.value);
    }

    visitUnaryOp(node) {
        const exprResult = node.expr.accept(this);
        switch (node.op.type) {
            case 'subtract':
                return -exprResult;
            case 'add':
                return exprResult;
        }
    }

    visitBinOp(node) {
        const left = node.left.accept(this);
        const right = node.right.accept(this);
        const op = node.token.type;
        switch (op) {
            case 'add':
                return left + right;
            case 'subtract':
                return left - right;
            case 'multiply':
                return left * right;
            case 'divide':
                return left / right;
            default:
                throw new Error('Unknown operator type');
        }
    }

    eval() {
        const tree = this.parser.parse();
        return tree.accept(this);
    }
}