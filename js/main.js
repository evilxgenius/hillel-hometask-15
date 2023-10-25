// Ця дз складається з чотирьох невеликих завдань, за реалізацію кожної з них можна отримати 25 балів:
// - Дано масив з елементами різних типів. Створити функцію яка вираховує середнє арифметичне лише числових елементів даного масиву.
// - Написати функцію doMath(x, znak, y), яка отримує 3 аргументи: числа x і y, рядок znak. У змінній znak може бути: +, -, *, /, %, ^ (ступінь ).Вивести результат математичної дії, вказаної в змінній znak.Обидва числа і знак виходять від користувача.
// - Написати функцію заповнення даними користувача двомірного масиву. Довжину основного масиву і внутрішніх масивів задає користувач. Значення всіх елементів всіх масивів задає користувач.
// - Створити функцію, яка прибирає з рядка всі символи, які ми передали другим аргументом. 'func(" hello world", ['l', 'd'])' поверне нам "heo wor". Вихідний рядок та символи для видалення задає користувач.

function numberInput(message) {
    let number = NaN;

    while (isNaN(number)) {
        let answer = prompt(message);

        if (answer === null)
            return null;
        else if (answer.trim().length === 0 || isNaN(+answer))
            alert(`You passed <${answer}>. Please pass a Number!`);
        else
            number = +answer;
    }

    return number;
}

function mathOperationSignInput() {
    while (true) {
        let answer = prompt('operation sign (+ - * / % ^):');

        if (answer === null)
            return null;
        else if (['+', '-', '*', '/', '%', '^'].includes(answer.trim()))
            return answer;
        else
            alert(`Math operation sign: You passed <${answer}>. Possible signs -> + - * / % ^`);
    }
}

function stringInput(message) {
    let string = '';

    while (string.trim().length === 0) {
        let answer = prompt(message);

        if (answer === null) return null;
        else if (answer.trim().length) return answer;
        else alert(`You passed empty string!`);
    }
}

function calcAvgOnlyNumbers(arr) {
    const numbersArr = arr.filter(i => typeof i === 'number');

    return numbersArr.reduce((memo, i) => memo + i, 0) / numbersArr.length;
}

function doMath(x, znak, y) {
    switch (znak) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/': return x / y;
        case '%': return x % y;
        case '^': return x ** y;
        default: return null;
    }
}

function create2DArrayFromUserData(lengthOfMainArr, internalArraysLength, callbackFn) {
    const twoDArray = [...new Array(lengthOfMainArr)].map(() => [...new Array(internalArraysLength)]);

    for(let i = 0; i < lengthOfMainArr; i++) {
        for(let j = 0; j < internalArraysLength; j++) {
            const value = callbackFn(twoDArray);

            if (value === null) return;
            else twoDArray[i][j] = value;
        }
    }

    return twoDArray;
}

function removeSymbolsFrom(string, symbols = []) {
    if (symbols.length === 0) return string;

    const match = new RegExp(`(${symbols.join('|')})`, 'g');

    return string.replace(match, '');
}

(() => {
    // Дано масив з елементами різних типів. Створити функцію яка вираховує
    // середнє арифметичне лише числових елементів даного масиву.
    const someData = ['some text', 1, true, 12, 'false', 333, () => { Math.random() }, 43, 0]

    document.querySelector('#one').addEventListener('click', () => {
        const message = `Array -> ${someData}\n\nAverage of nums from array ->${calcAvgOnlyNumbers(someData)}`;

        alert(message);
    });

    // Написати функцію doMath(x, znak, y), яка отримує 3 аргументи: числа x і y, рядок znak.
    // У змінній znak може бути: +, -, *, /, %, ^ (ступінь ).Вивести результат математичної дії,
    // вказаної в змінній znak.Обидва числа і знак виходять від користувача.
    document.querySelector('#two').addEventListener('click', () => {
        const expresion = { num1: undefined, sign: undefined, num2: undefined };

        for (let i in expresion) {
            let dataFromUser;

            if(i === 'sign') dataFromUser = mathOperationSignInput();
            else dataFromUser = numberInput('number:');

            if (dataFromUser !== null) expresion[i] = dataFromUser;
            else return;
        }

        if(['/', '%'].includes(expresion['sign']) && expresion['num2'] === 0) {
            alert("You can't divide to zero!!! o_0");
        } else {
            const values = Object.values(expresion);
            alert(`${values.join(' ')} = ${doMath(...values)}`);
        }
    });

    // Написати функцію заповнення даними користувача двомірного масиву.
    // Довжину основного масиву і внутрішніх масивів задає користувач.
    // Значення всіх елементів всіх масивів задає користувач.
    document.querySelector('#three').addEventListener('click', () => {
        const mainArrLength = numberInput('number of internal arrays (only positive value!):');
        if (mainArrLength === null || mainArrLength < 1) return;

        const lengthOfInternalArrays = numberInput('length of internal arrays(only zero or positive value!):');
        if (lengthOfInternalArrays === null || lengthOfInternalArrays < 0) return;

        const pretty2DArray = (array) => {
            return "[\n  " + array.map(a => '[' + a  + ']').join("\n  ") + "\n]";
        }

        const twoDArray = create2DArrayFromUserData(mainArrLength, lengthOfInternalArrays, (result2DArr) => {
            const valueFromUser = prompt(pretty2DArray(result2DArr));

            return valueFromUser === null ? null : valueFromUser;
        });

        if (twoDArray) alert(pretty2DArray(twoDArray));
    });


    // Створити функцію, яка прибирає з рядка всі символи, які ми передали другим аргументом.
    // 'func(" hello world", ['l', 'd'])' поверне нам "heo wor".
    // Вихідний рядок та символи для видалення задає користувач.
    document.querySelector('#four').addEventListener('click', () => {
        const string = stringInput('String for manipulation:');
        if (string === null) return;

        const charsToDestroy = stringInput('Chars should be destroyed:');
        if (charsToDestroy === null) return;

        alert(
            `String -> ${string}\nChars to destroy -> ${charsToDestroy}\n` +
            `Result -> ${removeSymbolsFrom(string, charsToDestroy.split(''))}`
        );
    });
})();
