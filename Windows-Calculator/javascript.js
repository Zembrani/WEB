

window.onload = function () {
    click();
};

function click() {
    var button = document.querySelectorAll("#bottom span");
    var expression = document.getElementById("expression");
    var res = document.getElementById("res");
    var aux = document.getElementById("aux");


    for (let i = 0; i < button.length; i++) {
        var keyboard = button[i];
        keyboard.onclick = function () {
            var number = this.dataset["number"];
            screen(number);
        }
    }

}


function screen(number) {

    var remove = document.getElementById("backspace");
    var c = document.getElementById("C");
    var ce = document.getElementById("CE");
    var equal = document.getElementById("equal");

    var inverseMult = document.getElementById("inverseMult");
    var pow = document.getElementById("pow");
    var sqrt = document.getElementById("sqrt");

    var oldVal = aux.innerHTML;
    var expreVal = expression.innerHTML;
    var resVal = res.innerHTML;
    var symbol = { "+": "+", "-": "-", "*": "*", "/": "/" };

    var lastSymbol = expreVal.substring(expreVal.length - 1, expreVal.length);

    //--------------------Add number on screen--------------------------//
    if (parseInt(number) > -1 && parseInt(number) < 10) {
        var lastChar = expreVal.substring(expreVal.length - 1, expreVal.length);
        if(oldVal == "2") {
            aux.innerHTML = "1";
            expression.innerHTML = "";
            oldVal = aux.innerHTML;
        }
        if (resVal === "0" || oldVal == "1") {
            res.innerHTML = number;
            aux.innerHTML = "0";
        } else {
            res.innerHTML = resVal + number;
        }
    }
    oldVal = aux.innerHTML;
    //--------------------Add expression on screen--------------------------//
    if (number in symbol) {
        if(oldVal == "2") {
            aux.innerHTML = "1";
            expression.innerHTML = "";
            oldVal = aux.innerHTML;
        }
        expreVal = expression.innerHTML;
        if (lastSymbol in symbol && oldVal == "1") {
            expreVal = expreVal.substring(0, expreVal.length - 1);
            expression.innerHTML = expreVal + symbol[number];
            oldVal = "0";
        } else {
            expression.innerHTML = expreVal + resVal + symbol[number];
        }
        if(oldVal == "1"){
            var tempExpre = expreVal + resVal;
            res.innerHTML = eval(tempExpre);
        }
        aux.innerHTML = "1";
    }

    //--------Current values ​​in variables------------//
    resVal = res.innerHTML;
    expreVal = expression.innerHTML;

    //--------------------Remove number--------------------------//
    remove.onclick = function () {
        let temp = res.innerHTML;
        if (temp.length > 1) {
            temp = temp.slice(0, -1);
            res.innerHTML = temp;
        } else {
            res.innerHTML = 0;
        }
    }

    //--------------------Clean screen number and expression--------------------------//
    c.onclick = function () {
        res.innerHTML = 0;
        expression.innerHTML = "";
    }

    //--------------------Clean screen number only--------------------------//
    ce.onclick = function () {
        res.innerHTML = 0;
    }

    //--------------------Does the calculations and show on the expression screen--------------------------//
    equal.onclick = function () {
        var tempExpre = expreVal + resVal;
        oldVal = aux.innerHTML;
        if(oldVal == "2") {
            console.log("Dentro");
            console.log(symbol);
            for (let i = 0; i < symbol.length; i++) {
                var indexSymbol = expression.indexOf(symbol[i]);
                console.log(symbol[i]);
                if(indexSymbol != undefined) i=symbol.length;              
            }
            expreVal = expression.innerHTML;
            tempExpre = res.innerHTML;
            console.log(indexSymbol);
            console.log(tempExpre);
            console.log(expreVal.substring(indexSymbol, expreVal.length-2));
            tempExpre += expreVal.substring(indexSymbol, expreVal.length-2);
            console.log(tempExpre);
        }
        res.innerHTML = eval(tempExpre);
        expression.innerHTML = tempExpre + " = ";
        aux.innerHTML = "2";
    }

    //--------------------Function 1/x--------------------------//
    inverseMult.onclick = function () {
        let temp = res.innerHTML;
        if (expreVal.length < 1) {
            expression.innerHTML = "1/(" + temp + ")";
        } else {
            expression.innerHTML = "1/(" + oldVal + ")";
        }
        aux.innerHTML = "1";
        if (temp === "0") {
            res.innerHTML = "Cannot divide by zero";
        }
    }
    /*
    pow.onclick = function () {
        let temp = res.innerHTML;
        
        if(expreVal.length<1) {
            expression.innerHTML = "sqrt( " + temp + " )";
        }else{
            expression.innerHTML = "sqrt( " + lastSymbol + " )";
        }
    }
    */

    //    clean(number);
    //  addNumber(number, resVal, expreVal, symbol);
    //addExpression(number, expreVal, resVal, symbol);


}
