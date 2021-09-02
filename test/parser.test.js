import Parser from '../src/parser.js';
import Token from '../src/token';
import {BinOp, Num, UnaryOp} from '../src/ast';

const createTokensFromPairs = tokens => {
    return tokens.map((p) => new Token(...p));
}

describe('Parser', () => {
    beforeEach(() => {

    })

    it('build ast: addition first', () => {
        // 12 + 34 * 56
        const tokenStream = [['number', 12], ['add', '+'], ['number', 34], ['multiply', '*'], ['number', 56]];
        const tokens = createTokensFromPairs(tokenStream);
        const parser = new Parser(tokens);

        const tree = parser.parse();
        const expectedTree = new BinOp(
            new Num(tokens[0]),
            tokens[1],
            new BinOp(new Num(tokens[2]), tokens[3], new Num(tokens[4])));

        expect(tree).toEqual(expectedTree);
    });

    it('build ast: multiplication first', () => {
        // 12 * 34 + 56
        const tokenStream = [['number', 12], ['multiply', '*'], ['number', 34], ['add', '+'], ['number', 56]];
        const tokens = createTokensFromPairs(tokenStream);
        const parser = new Parser(tokens);

        const tree = parser.parse();
        const expectedTree = new BinOp(
            new BinOp(new Num(tokens[0]), tokens[1], new Num(tokens[2])),
            tokens[3],
            new Num(tokens[4]));

        expect(tree).toEqual(expectedTree);
    });
});