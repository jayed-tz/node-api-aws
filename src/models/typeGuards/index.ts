import {IdType} from "../types/IdType";

export const isIdType = (value: string | number): value is IdType => {
    if (typeof value === 'number') {
        return true; // Numbers are always valid types
    } else if (!isNaN(tryParseNumber(value))) {
        return true; // Check if string is a valid number
    } else if (typeof value === 'string') {
        return value.startsWith('tt'); // Check if string starts with 'tt'
    }
    return false; // Other are not valid types
}

const tryParseNumber = (str: string) => {
    // Check if the string consists only of numeric characters
    if (/^\d+$/.test(str)) {
        return parseInt(str);
    } else {
        // If the string contains non-numeric characters, return NaN
        return NaN;
    }
}