function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function performOperation(operators, operands) {
    const operator = operators.pop();
    const right = operands.pop();
    const left = operands.pop();
    switch (operator) {
        case '+':
            operands.push(left + right);
            break;
        case '-':
            operands.push(left - right);
            break;
        case '*':
            operands.push(left * right);
            break;
        case '/':
            if (right !== 0) {
                operands.push(left / right);
            } else {
                return 'Error'; // Division by zero
            }
            break;
        default:
            return 'Error';
    }
    return null;
}

function calculateExpression(expression) {
    const operators = [];
    const operands = [];
    let currentNum = '';
    
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char >= '0' && char <= '9' || char === '.') {
            currentNum += char;
        } else if (isOperator(char)) {
            if (currentNum !== '') {
                operands.push(parseFloat(currentNum));
                currentNum = '';
                
                while (
                    operators.length > 0 &&
                    isOperator(operators[operators.length - 1]) &&
                    ((char === '+' || char === '-') && (operators[operators.length - 1] === '+' || operators[operators.length - 1] === '-') ||
                     (char === '*' || char === '/') && (operators[operators.length - 1] === '*' || operators[operators.length - 1] === '/'))
                ) {
                    if (performOperation(operators, operands) === 'Error') {
                        return 'Error';
                    }
                }
                
                operators.push(char);
            } else {
                if (char === '-' && (i === 0 || (i > 0 && !isOperator(expression[i - 1]) && expression[i - 1] !== '('))) {
                    currentNum += char;
                } else {
                    return 'Error';
                }
            }
        } else if (char === '(') {
            operators.push(char);
        } else if (char === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                if (performOperation(operators, operands) === 'Error') {
                    return 'Error';
                }
            }
            if (operators.length > 0 && operators[operators.length - 1] === '(') {
                operators.pop();
            } else {
                return 'Error';
            }
        }
    }
    
    if (currentNum !== '') {
        operands.push(parseFloat(currentNum));
    }
    
    while (operators.length > 0) {
        if (operators[operators.length - 1] === '(' || operators[operators.length - 1] === ')') {
            return 'Error';
        }
        if (performOperation(operators, operands) === 'Error') {
            return 'Error';
        }
    }
    
    if (operands.length === 1) {
        return operands[0];
    } else {
        return 'Error';
    }
}

function onButtonClick(value) {
    let inputField = document.getElementById("result");
    let currentValue = inputField.value;

    if (value === "=") {
        let result = calculateExpression(currentValue);
        inputField.value = result;
    } else if (value === "C") {
        inputField.value = "";
    } else {
        inputField.value = currentValue + value;
    }
}

const buttons = document.querySelectorAll(".calculator-button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        onButtonClick(button.textContent);
    });
});

