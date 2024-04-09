export default function isNumeric(value) {
    return value === '' || /^-?\d+$/.test(value);
}