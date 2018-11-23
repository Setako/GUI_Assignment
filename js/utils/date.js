Date.prototype.addMinutes = function (minutes = 0) {
    return new Date(this.getTime() + minutes * 60000);
};
Date.prototype.addHours = function (hours = 0) {
    return this.addMinutes(60 * hours);
};

Date.prototype.addDays = function (days = 0) {
    return new Date(this.addHours(24 * days));
};

Date.prototype.addMonths = function(months = 0) {
    const result = new Date(this);
    result.setMonth(this.getMonth() + months);
    return result;
};

Date.prototype.to12HString = function () {
    const addZero = (day) => `${day}`.padStart(2, '0');

    const hour = this.getHours();
    const minutes = this.getMinutes();

    return hour < 12
        ? `${addZero(hour)}:${addZero(minutes)} AM`
        : hour > 12
            ? `${addZero(hour - 12)}:${addZero(minutes)} PM`
            : `${addZero(hour)}:${addZero(minutes)} PM`;
};

Date.prototype.getDayString = function () {
    return this.toLocaleString('en-us', {
        weekday: 'long'
    })
};

Date.prototype.getMonthString = function () {
    return this.toLocaleString('en-us', {
        month: 'long'
    })
};

Date.prototype.toTitleString = function () {
    return `${this.getDayString()} ${this.getDate()} ${this.getMonthString()} ${this.getFullYear()}`
};

Date.prototype.isSameDay = function (day2) {
    return this.getFullYear() === day2.getFullYear() &&
        this.getMonth() === day2.getMonth() &&
        this.getDate() === day2.getDate();
};

Date.prototype.getNextDay = function() {
    const nextDay = new Date(this);
    nextDay.setDate(this.getDate() + 1);
    return nextDay;
};

Date.prototype.getPreviousDay = function() {
    const previousDay = new Date(this);
    previousDay.setDate(this.getDate() - 1);
    return previousDay;
};

Date.prototype.isSame = function (date) {
    return +this === +date;
};

Date.of = function (...args) {
    return new Date(...args);
};