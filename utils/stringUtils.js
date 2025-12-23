function getCurrentDateTimeLosAngeles(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).formatToParts(date);

    const pick = (t) => parts.find(p => p.type === t)?.value;

    return `${pick('month')} ${pick('day')}, ${pick('hour')}:${pick('minute')}${pick('dayPeriod').toLowerCase()}`;
}


module.exports = {
    getCurrentDateTimeLosAngeles
};