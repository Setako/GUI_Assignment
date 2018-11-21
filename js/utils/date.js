Date.prototype.addMinutes = function (minutes = 0) {
    return new Date(this.getTime() + minutes * 60000);
};

Date.prototype.to12HString = function () {
    const addZero = (day) => `${day}`.padStart(2, '0');

    const hour = this.getHours();
    const minutes = this.getMinutes();
    const status = hour < 12 ? 'AM' : 'PM';

    return hour < 12
        ? `${addZero(hour)}:${addZero(minutes)} AM`
        : hour > 12
            ? `${addZero(hour - 12)}:${addZero(minutes)} PM`
            : `${addZero(hour)}:${addZero(minutes)} PM`;
};

Date.prototype.isSameDay = function (day2) {
    return this.getFullYear() === day2.getFullYear() &&
        this.getMonth() === day2.getMonth() &&
        this.getDay() === day2.getDay();
};

Date.prototype.isSame = function (date) {
    return +this === +date;
};

Date.of = function (...args) {
    return new Date(...args);
};