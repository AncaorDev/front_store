export {};

declare global {
    interface Number {
        addZero(): Number;
    }
}

Number.prototype.addZero = function(): Number {
    let num = this;
    num = +num >= 10 ? num :  ('0' + num);
    return num;
};
