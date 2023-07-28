export default (time: string): number => {
    const matches = time.match(/^(\d*\.?\d+)(ms|s|m|h|d|w)$/);

    if (!matches)
        throw new Error("Invalid Time Format");

    const value = parseFloat(matches[1]);
    const unit = matches[2];

    switch (unit) {
        case 'ms':
            return value;
        case 's':
            return value * 1000;
        case 'm':
            return value * 60000;
        case 'h':
            return value * 3600000;
        case 'd':
            return value * 86400000;
        case 'w':
            return value * 604800000;
        default:
            throw new Error('Invalid Time Unit');
    };
};