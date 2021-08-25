function clr() {
    document.getElementById("expression").value = "";
}

function display(x) {
    document.getElementById("expression").value += x;
}

function solve() {
    let eqn = document.getElementById("expression").value;
    const values = [];
    const ops = [];

    console.log(eqn);
    let num = '';
    for(let i = 0; i <= eqn.length; i++){       
        if((eqn[i] >= '0' && eqn[i] <= '9') || eqn[i] === '.')
            num += eqn[i];

        else if(eqn[i] === 'S' || eqn[i] === 'C' || eqn[i] === 'T' || eqn[i] === 'L' || eqn[i] === 'l')
            ops.push(eqn[i]);

        else if(eqn[i] === '(')
            ops.push(eqn[i]);  

        else if (eqn[i] === ')'){
            values.push(parseFloat(num))
            while (ops[ops.length - 1] !== '(')
                    values.push(operate(ops.pop(), values.pop(), values.pop()));
            ops.pop();

            if(ops.length && (ops[ops.length - 1] === 'S' || ops[ops.length - 1] === 'C' || ops[ops.length - 1] === 'T' || ops[ops.length - 1] === 'L' || ops[ops.length - 1] === 'l')){
                values.push(func(ops.pop(), values.pop()));
            }
            num = '';
        } 

        else if(eqn[i] === '+' || eqn[i] === '-' || eqn[i] === '/' || eqn[i] === '*' || eqn[i] === '^' || eqn[i] === '='){
            if(num)
                values.push(parseFloat(num))
            while(((ops.length === 1 && ops[ops.length - 1] != '=') || (ops.length > 1)) && priorityCheck(ops[ops.length - 1], eqn[i]))
                values.push(operate(ops.pop(), values.pop(), values.pop()));                  
            ops.push(eqn[i]);
            num = '';
        }

        console.log(values);
        console.log(ops);
    }

    while (ops.length > 1) {
        values.push(operate(ops.pop(), values.pop(), values.pop()));
    }

    console.log(values);
    console.log(ops);

    document.getElementById("expression").value = values[0];
}

function priorityCheck(op1, op2){
    if(op1 === 'S' || op1 === 'C' || op1 === 'T' || op1 === 'L' || op1 === 'l')
        return false;
    if (op1 === '(' || op1 === ')') 
        return false;
    if(op2 === '=')
        return true;
    if(op1 === '/' && op2 === '^')
        return false;
    if(op1 === '*' &&  op2 === '^')
        return false;
    if(op1 === '+' && (op2 === '/' || op2 === '^' || op2 === '*'))
        return false;
    if(op1 === '-' && (op2 === '/' || op2 === '^' || op2 === '*'))
        return false;  
    return true;
};

function operate(op, b, a){
    switch (op) {
        case '^':
            return Math.pow(a, b);
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                document.getElementById("expression").value = "Error: Cannot Divide By Zero";
                throw 'Cannot divide by zero';              
            }
            return a / b;
    }
}

function func(f, x){
    console.log("Function: ", f);
    switch(f){
        case 'S':
            return Math.sin(x);
        case 'C':
            return Math.cos(x);
        case 'T':
            return Math.tan(x);
        case 'L':
            return Math.log10(x);
        case 'l':
            return Math.log(x);
    }
}