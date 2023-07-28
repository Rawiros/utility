// @ts-nocheck

export default function flattenObject<T extends Record<string, any>>(obj: T, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
        else acc[pre + k] = obj[k];

        return acc;
    }, {}) as Record<string, any>;
};