// Takes a credit card string value and returns true on valid number
function valid_credit_card(value) {
    // Checks if value is empty
    if (value.length < 1) return false;

    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

export { valid_credit_card };

  // Credit to DiegoSalazar at https://gist.github.com/DiegoSalazar/4075533