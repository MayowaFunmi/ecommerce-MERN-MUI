var word = "USa";

const detect_capital = (param1) => {
    if (param1.toUpperCase() || param1.toLowerCase()) {
        return true
    }
    return false
}

console.log(detect_capital(word))