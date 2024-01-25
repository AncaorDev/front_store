export function __stringToDate(date_string, separator = '/') : Date {
    let date  = date_string.split(separator),
        day   = date[0],
        month = date[1],
        year  = date[2];
    return new Date(`${month}-${day}-${year}`);
}
