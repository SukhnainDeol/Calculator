/**
 *  Name: Sukhnain Deol
 *  Purpose: 
 */          


//todo
    // handle invalid order of operation (e.g. * as first input) or (* right before =)

/** 
 * What It Does
 * 
 * Optional Example
 * 
 * Variables
 * 
 * Returns
 */
function promptCalculator() 
{
    let validValues = ["0","1","2","3","4","5","6","7","8","9","+","-","/","*","="];
    let equationArr = [];
    let userChar;
    do 
    {
        userChar = prompt("Create an equation using the following values, one digit at a time: \n" + validValues + "\nCurrent Equation: " + equationArr);
        if(!validValues.includes(userChar)  && userChar !== null)
        {
            alert("ERROR: please input a single digit from the following values: \n" + validValues);
        }
        else
        {
            equationArr.push(userChar);
        }
    } while (userChar !== "=" && userChar !== null);

    let newArr = [];

    for (let i = 0; i < equationArr.length; i++)
    {
        // if element in number
        if(!isNaN(equationArr[i]))
        {
            // start making a number
            let number = equationArr[i];
            i++;
            // keeping adding the next elements if they are numbers
            while (!isNaN(equationArr[i]))
            {
                number += equationArr[i];
                i++;
            }

            newArr.push(number);
        }
        else 
        {
            newArr.push(equationArr[i]);
        }
    }


    let newArrTwo = [];

    for (let i = 0; i < newArr.length; i++)
    {
        // if element in number
        switch(equationArr[i])
        {
            case "*":
                newArrTwo.push(parseInt(equationArr[i-1]) * parseInt(equationArr[i+1]));
                break;
            case "/":
                newArrTwo.push(parseInt(equationArr[i-1]) / parseInt(equationArr[i+1]));
                break;
        }
    }

    let newArrThree = [];

    for (let i = 0; i < newArrTwo.length; i++)
    {
        // if element in number
        switch(equationArr[i])
        {
            case "+":
                newArrThree.push(parseInt(equationArr[i-1]) + parseInt(equationArr[i+1]));
                break;
            case "-":
                newArrThree.push(parseInt(equationArr[i-1]) - parseInt(equationArr[i+1]));
                break;
        }
    }

    alert(equationArr + " = " + equationResult);
    
    // arr
    // do while char isnt = {}
        // show user current arr in each prompt
    // if not in valid chars, dont add and tell user

    // go through arr
        // 1. combine numbers
        // 2. do * and /
        // 3. do + and - 
        // 4 alert number
    
}