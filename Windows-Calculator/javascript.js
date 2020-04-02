

window.onload = function () {
    click();
};

function click () {
    var button = document.querySelectorAll("#bottom span");
    var expression = document.getElementById("expression");
    var res = document.getElementById("res");
    
    
    for (let i = 0; i < button.length; i++) {
        var keyboard = button[i];
        keyboard.onclick = function () {
            var number = this.dataset["number"];
            screen(number);
        }
    }
}

function clean(number) {
    if(number === "C" || number === "CE") {
        res.innerHTML = "0";
            if(number === "C") {
                expression.innerHTML = "&nbsp";
            }
    }
}

function addNumber(number, resVal,expreVal, symbol) {
    if(parseInt(number)>-1 && parseInt(number)<10){
        var lastChar = expreVal.substring(expreVal.length-1, expreVal.length);
        if(res.innerHTML==="0" || lastChar in symbol){
            res.innerHTML = number;       
        } else {          
            res.innerHTML = resVal + number;
        }
    }
}

function addExpression(number, expreVal, resVal, symbol) {
    if(number in symbol) {
        if(expreVal==="&nbsp"){
            alert(resVal);
            expression.innerHTML = resVal + " " + symbol[number];        
        }else{
            expression.innerHTML = expreVal + " " + resVal + " " + symbol[number];
        }
    }
}

function screen(number) {
    var expreVal = expression.innerHTML;
    var resVal = res.innerHTML;  
    var symbol = {"+":"+", "-":"-", "*":"*", "/":"/"};

    clean(number);
    addNumber(number, resVal, expreVal, symbol);
    addExpression(number, expreVal, resVal, symbol);
        

}