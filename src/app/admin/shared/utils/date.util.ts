import * as moment from 'moment';

const getDaysFromCurrentWeek = (day: any) => {
    const week = new Array();
    const startDate = moment().startOf('week').toDate();
    var d = new Date(startDate);
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(d)
        );
        d.setDate(d.getDate() + 1);
    }
    return week;
}

export const DateUtils = {
    getDaysFromCurrentWeek
}
