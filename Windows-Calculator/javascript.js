

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
    var dot = document.getElementById("dot");
    var neg = document.getElementById("neg");

    var inverseMult = document.getElementById("inverseMult");
    var pow = document.getElementById("pow");
    var sqrt = document.getElementById("sqrt");
    var porcentage = document.getElementById("porcentage");

    var oldVal = aux.innerHTML;
    /* Sobre a variavel oldVal
    0 - para quando a última entrada é um numero;
    1 - para a última entrada sendo um símbolo de operador;
    2 - para última entrada o botão equal;
    3 - sendo uma das funções;
    */
    var expreVal = expression.innerHTML;
    var resVal = cleanComma(res.innerHTML);
    var symbol = { "+": "+", "-": "-", "*": "*", "/": "/" };

    var lastSymbol = expreVal.substring(expreVal.length - 1, expreVal.length);

    //--------------------Add number on screen--------------------------//
    if (parseInt(number) > -1 && parseInt(number) < 10) {
        var lastChar = expreVal.substring(expreVal.length - 1, expreVal.length);
        if (oldVal == "2") {
            aux.innerHTML = "1";
            expression.innerHTML = "";
            oldVal = aux.innerHTML;
        }
        if (resVal === "0" || oldVal === "1" || oldVal === "3") {
            res.innerHTML = number;
            aux.innerHTML = "0";
        } else if (resVal === "-0") {
            res.innerHTML = "-" + number;
            aux.innerHTML = "0";
        } else {
            res.innerHTML = verifyScreen(resVal + number);
        }
    }
    oldVal = aux.innerHTML;
    //--------------------Add expression on screen--------------------------//
    if (number in symbol) {
        if (oldVal == "2") {
            aux.innerHTML = "1";
            expression.innerHTML = "";
            oldVal = aux.innerHTML;
        }
        expreVal = expression.innerHTML;
        //console.log(oldVal);
        if (lastSymbol in symbol && oldVal == "1") {
            //console.log("primeiro if");
            expreVal = expreVal.substring(0, expreVal.length - 1);
            expression.innerHTML = expreVal + symbol[number];
            oldVal = "0";
        } else if (oldVal == "3") {
            expression.innerHTML = expreVal + resVal + symbol[number];
            aux.innerHTML = "1";
        } else {
            //console.log("else");
            expression.innerHTML = expreVal + resVal + symbol[number];
        }
        if (oldVal == "1") {
            //console.log("oldval if");
            var tempExpre = expreVal + resVal;
            tempExpre = eval(tempExpre);
            res.innerHTML = verifyScreen(tempExpre);
        }
        aux.innerHTML = "1";
    }

    //--------Current values ​​in variables------------//

    resVal = cleanComma(res.innerHTML);
    expreVal = expression.innerHTML;

    //--------------------Remove number--------------------------//
    remove.onclick = function () {
        let temp = cleanComma(res.innerHTML);
        if (temp.length > 1) {
            temp = temp.slice(0, -1);
            res.innerHTML = verifyScreen(temp);
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
        resVal = cleanComma(res.innerHTML);
        var result;
        oldVal = aux.innerHTML;

        if (oldVal == "2") {
            var tempExpre = expression.innerHTML;
            
            var index = tempExpre.lastIndexOf(lastSymbol);
            if (index !== -1) {
                tempExpre = tempExpre.substring(index, tempExpre.length-3);
                console.log("tempExpre dentro do if = " + tempExpre);
            }

            tempExpre = resVal + tempExpre;
        } else {
            var tempExpre = expreVal + resVal;
        }
        console.log("tempexpre = " + tempExpre);
        console.log("resVal = " + resVal);

        result = eval(tempExpre);
        result = verifyScreen(result);
        console.log(result.toString().length);
        
        var length = result.length;

        if(fontSize(length)==1) {
            res.innerHTML = "Overflow";
        } else {
            res.innerHTML = result;
            expression.innerHTML = tempExpre + " = ";
            aux.innerHTML = "2";
        }
    }

    dot.onclick = function () {
        var indexDot = resVal.indexOf(".");
        if (indexDot !== -1) {
            return;
        }
        resVal = resVal + ".";
        res.innerHTML = verifyScreen(resVal);
    }

    neg.onclick = function () {
        resVal = res.innerHTML;

        var indexNeg = resVal.indexOf("-");

        if (indexNeg === 0) {
            res.innerHTML = verifyScreen(resVal.substring(1, resVal.length));
        } else if (indexNeg === -1) {
            res.innerHTML = verifyScreen("-" + resVal);
        }
    }
    //--------------------Functions--------------------------//
    inverseMult.onclick = function () {
        let value = res.innerHTML;
        let result = 0;

        result = parseFloat(eval("1/" + value).toFixed(3));
        res.innerHTML = verifyScreen(result);
        aux.innerHTML = "1";
        if (value === "0") {
            res.innerHTML = "Cannot divide by zero";
        }
        aux.innerHTML = "3";
    }

    pow.onclick = function () {
        let value = cleanComma(res.innerHTML);
        res.innerHTML = verifyScreen(parseFloat(Math.pow(value, 2).toFixed(3)));
        aux.innerHTML = "3";
    }

    sqrt.onclick = function () {
        let value = cleanComma(res.innerHTML);
        res.innerHTML = verifyScreen(parseFloat(Math.sqrt(value).toFixed(3)));
        aux.innerHTML = "3";
    }

    porcentage.onclick = function () {
        let valuePrcentg = res.innerHTML;
        let valueAmount = eval(expreVal.substring(0, expreVal.length-1));
        
        valuePrcentg = eval(valueAmount + "*" + valuePrcentg + "/100").toFixed(2);
        expression.innerHTML = expreVal + valuePrcentg;
        res.innerHTML = verifyScreen(valuePrcentg);
    }
}

//-----Verifications on screen value, length, dot, comma

function findDot(value) {
    var indexDot = value.indexOf(".");
    if (indexDot !== -1) {
        return indexDot;
    }
    return value.length;
}

function cleanComma(value) {
    var index = value.indexOf(",");
    while (index != -1) {
        index = value.indexOf(",");
        value = value.substring(0, index) + value.substring(index + 1, value.length);
    }
    return value;
}

function addComma(value, indexDot) {
    var tempValue = value;
    var length = indexDot;
    var qtdComma = Math.floor((length - 1) / 3);
    var firstComma = Math.floor(((length - 1) % 3) + 1);

    for (let i = 0; i < qtdComma; i++) {
        tempValue = tempValue.slice(0, firstComma + (3 * i) + i) + "," + tempValue.slice(firstComma + (3 * i) + i);
    }
    return tempValue;
}

function verifyScreen(valueScreen) {
    valueScreen = valueScreen.toString();
    var firstSymbol = valueScreen.substring(0, 1);
    var isNegative = false;
    if (firstSymbol === "-") {
        isNegative = true;
        valueScreen = valueScreen.substring(1, valueScreen.length);
    }
    valueScreen = cleanComma(valueScreen);
    var indexDot = findDot(valueScreen);

    if (indexDot > 3) {
        valueScreen = addComma(valueScreen, indexDot);
    }
    
    if(fontSize(valueScreen.length)==0){
        if (isNegative == true) {
            valueScreen = "-" + valueScreen;
        }
        return valueScreen;
    } else {
        return verifyScreen(valueScreen.substring(0, valueScreen.length - 1));
    }
}

function fontSize (length) {
    if (length < 11) {
        res.style.fontSize = "33pt";
    } else if (length > 10 && length < 12) {
        res.style.fontSize = "28pt";
    } else if (length > 11 && length < 13) {
        res.style.fontSize = "24pt";
    } else if (length > 13) {
        return 1;
    }
    return 0;
}