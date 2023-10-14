/**
 *  Name: Sukhnain Deol
 *  Purpose: This program prompts the user to enter an equation digit by digit
 *           and the program will alert the user with the answer.
 */          



/** 
 * Prompts the user to enter digits of an equation and calculates then alerts the
 * result onces the last digit they input is "="
 */
function promptCalculator() 
{
    let validValues = ["0","1","2","3","4","5","6","7","8","9","+","-","/","*","="];
    let equationArr = [];
    let userChar;

    do // ask user for equation's digits until "="
    {
        userChar = prompt("Create an equation, one digit at a time, using the following values: ["
         + validValues + "]\nCurrent Equation: " + equationArr);

        // only add digits that have been validated
        var isValid = validateUserChar(userChar, validValues, equationArr);
        if (isValid) {equationArr.push(userChar);}
        else if (isValid === null) {return;}
    } while (userChar !== "=" || !isValid);


    // calculations

    equationArr.pop(); // remove "="
    equationArr = combineDigits(equationArr); // combine digits into numbers

    // apply operations in PEMDAS order
    equationArr = applyOperations(equationArr, ["*", "/"]); 
    // if equation tried to divide by 0, alert user and end function 
    if (equationArr === undefined) {alert("ERROR: Can't divide by 0."); return;}
    equationArr = applyOperations(equationArr, ["+", "-"]);

    alert("Result: " + equationArr);
}



/** 
 * Validates a one digit string entered by the user to be valid 
 * in an equation of given validValues
 * 
 * @param {string} userChar - one digit string entered by user
 * @param {array} validValues - array of valid values for userChar
 * @param {array} equationArr - array of current equation
 * 
 * @returns - true/false if it passes validation
 */
function validateUserChar(userChar, validValues, equationArr)
{
    let operationValues = ["+","-","/","*"];

    // possible error outputs
    let invalidInputError = "ERROR: Please input a single digit from the following values: [" + validValues + "]";
    let invalidOperatorError = "ERROR: Please input a number before you input this operator.";

    // if/else data validation

    // if null (user pressed cancel) return null
    if (userChar === null) {return null;}
    // if invalid char
    else if (!validValues.includes(userChar)) 
    {
        alert(invalidInputError);
        return false;
    }
    // if first char is "="
    else if (userChar === "=" && equationArr.length === 0) 
    {
        alert(invalidOperatorError);
        return false;
    }
    // if first char is an operator
    else if (operationValues.includes(userChar) && equationArr.length === 0)
    {
        alert(invalidOperatorError);
        return false;
    }
    // if operator equal sign inputted after operator
    else if (userChar === "=" && operationValues.includes(equationArr[equationArr.length-1]))
    {
        alert(invalidOperatorError);
        return false;
    }
    // if input an operator after an operator
    else if (operationValues.includes(userChar) && 
        operationValues.includes(equationArr[equationArr.length-1]))
    {
        alert(invalidOperatorError);
        return false;
    }

    return true; // return true if no errors
}



/** 
 * combines adjacent digits in an array, not seperated
 * by non-number values
 * 
 * Example: arr = [1,1,2,+,1,3], returns [112,+,13]
 * 
 * @param {array} arr - array to operate on
 * 
 * @returns - array with combined digits
 */
function combineDigits(arr) 
{
    let returnArr = [];
    let num = ""; 
    for (let i = 0; i < arr.length; i++)
    {
        // add each number to a single variable
        if (!isNaN(arr[i])) {num += arr[i];}
        // add operator and finished number to new arr and clear num
        else // if operator
        {
            returnArr.push(num);
            returnArr.push(arr[i]);
            num = "";
        }
    }
    returnArr.push(num); // push last number before "="
    return returnArr;
}



/** 
 * apply given mathmatical operations 
 * 
 * Example: arr = [1,+,1,-,2] returns [0]
 * 
 * @param {array} arr - array to apply operations on
 * @param {array} operations - operations to be applied
 * 
 * @returns - array withh operations applied
 */
function applyOperations(arr, operations)
{
    // loop through arr and apply given operations
    for (let i = 0; i < arr.length; i++)
    {
        // if on an operator
        if (operations.includes(arr[i]))
        {
            // assign var to operator and adjacent values
            let numberOne = parseInt(arr[i-1]);
            let numberTwo = parseInt(arr[i+1]);
            let operator = arr[i];
            // apply appropiate math
            switch(operator)
            {
                // splice out equation and replace with result
                case "*":
                    arr.splice(i-1, 3, numberOne * numberTwo);
                    break;
                case "/":
                    // return undefined if dividing by 0
                    if (numberTwo == 0) {return undefined;}
                    arr.splice(i-1, 3, numberOne / numberTwo);
                    break;
                case "+":
                    arr.splice(i-1, 3, numberOne + numberTwo);
                    break;
                case "-":
                    arr.splice(i-1, 3, numberOne - numberTwo);
                    break;
            }
            i--; // move back to account for removing current index
        }
    }
    return arr;
}