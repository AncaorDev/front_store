export {};

declare global {
    interface String {
        // addZero():String
        strToDate(): Date;
        strFormatDate(): String;
    }
}

// String.prototype.addZero = function (): String {
//     let string = this;
//     string = +string > 10 ? string : '0' + string;
//     return string
// };

String.prototype.strToDate = function(): Date {
    const fecha_arr = this.split('/');
    if (fecha_arr.length > 2) {
        return new Date(`${fecha_arr[1]}/${fecha_arr[0]}/${fecha_arr[2]} 00:00:00`);
    } else {
        return new Date(this);
    }
};

String.prototype.strFormatDate = function(): String {
    const fecha_arr = this.split('-');
    return `${fecha_arr[2]}/${fecha_arr[1]}/${fecha_arr[0]}`;
};

