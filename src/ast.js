class Num {
    constructor(token) {
        this.token = token;
    }

    accept(visitor) {
        return visitor.visitNum(this);
    }
}

class UnaryOp {
    constructor(op, expr) {
        this.token = this.op = op
        this.expr = expr;
    }

    accept(visitor) {
        return visitor.visitUnaryOp(this);
    }
}

class BinOp {
    constructor(left, op, right) {
        this.left = left;
        this.token = op;
        this.right = right;
    }

    accept(visitor) {
        return visitor.visitBinOp(this);
    }
}
export {BinOp, Num, UnaryOp};