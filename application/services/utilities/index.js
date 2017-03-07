module.exports = {
    /**
     * A regex checking if the value is a number.  format is /pattern/, "\" escapes special chars.
     * "^" checks beginning of input for the next character.
     * "?" matches the previous character only 0 or 1 times;
     * "^\+?"" matches a single plus sign at the beginning of input,
     * but not multiple
     * "(0|[1-9]\d*)" matches either 0, or 1 through 9, then [0-9] 0 or
     * more times
     * "$" makes the previous part of the pattern match at end of input
     *
     * Checks if the value is a valid number(ie. a solo 0, or starts with 1 through 9
     * and only contains digits)
     * Used for Client and Origin controllers
     * @param  {string}  value [an identifier]
     * @return {Boolean}       [description]
     */
    isNumber: value => /^(0|[1-9]\d*)$/.test(value),


    /**
     * Regex checking if the value starts with an alphabet character, then contains
     * any number of upper/lower case letters, numbers, -, /, or + characters.
     * Returns false if any other special chars(ie. !@#$%...) are in the string.
     * Used for Cluster controller
     * @param  {string}  value [an identifier]
     * @return {Boolean}       [description]
     */
    isAlphaNumericDashSlashPlus: value => /^[A-Za-z0-9/\-+]*$/.test(value),


    /**
     * Regex checking if the value is all uppercase letters, dashes(-), or colons(:).
     * Returns false otherwise.
     * Used for Datacenter controller.
     * @param  {string}  value [an identifier]
     * @return {Boolean}       [description]
     */
    isUppercaseDashColon: value => /^[A-Z\-:]*$/.test(value),

    /**
     * Regex checking if the value is a valid email address.  Taken from emailregex.com.
     * Looks horrifying, but works.
     * @param  {string} value [an identifier]
     * @return {Boolean}      [description]
     */
    isValidEmail: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),


    /**
     * Checks if a password is alphanumeric with symbols, minimum 8 chars
     * @param  {[type]}  value [description]
     * @return {Boolean}       [description]
     */
    isValidPassword: value => /^[a-zA-Z0-9@\#$%&*()_+\]\[';:?.,!^-]{8,40}$/.test(value)
}