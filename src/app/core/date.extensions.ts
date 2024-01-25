export {};

declare global {
   interface Date {
      addDays(days: number, useThis?: boolean): Date;
      isToday(): boolean;
      clone(): Date;
      isAnotherMonth(date: Date): boolean;
      isWeekend(): boolean;
      isSameDate(date: Date): boolean;
      getStringDate(): String;
      formatDate(separator?: string): String;
   }
}

Date.prototype.addDays = function(days: number): Date {
   if (!days) { return this; }
   const date = this;
   date.setDate(date.getDate() + days);

   return date;
};

Date.prototype.isToday = function(): boolean {
   const today = new Date();
   return this.isSameDate(today);
};

Date.prototype.clone = function(): Date {
   return new Date(+this);
};

Date.prototype.isAnotherMonth = function(date: Date): boolean {
   return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = function(): boolean {
   return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function(date: Date): boolean  {
   return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};

Date.prototype.getStringDate = function(): String {
    // Month names in Brazilian Portuguese
    // let monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    // Month names in English
    // let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Month names in Spanish
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const today = new Date();
    if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay()) {
        return 'Hoy';
        // return "Hoje";
        // return "Today";
    } else if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay() + 1) {
        return 'Mañana';
        // return "Amanhã";
        // return "Tomorrow";
    } else if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay() - 1) {
        return 'Ayer';
        // return "Ontem";
        // return "Yesterday";
    } else {
        return this.getDay() + ' de ' + this.monthNames[this.getMonth()] + ' de ' + this.getFullYear();
        // return this.monthNames[this.getMonth()] + ' ' + this.getDay() + ', ' +  this.getFullYear();
    }
};

Date.prototype.formatDate = function(separator = '/'): String {
   const anio = this.getFullYear(), month = this.getMonth() + 1, day = this.getDate();
   return `${ day.addZero() + separator + month.addZero() + separator + anio}`;
};
