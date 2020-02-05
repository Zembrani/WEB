function checkForm() {
		var formList = [
										document.getElementById("fullname").value, 
										document.getElementById("streetaddr").value,
										document.getElementById("housenmbr").value,
										document.getElementById("postcodenmbr").value,
										document.getElementById("emailaddress").value
										];
		var listIds = [
										"nameerrormsg", 
										"addrerrormsg",
										"nmbrerrormsg",
										"postcodeerrormsg",
										"emailaddresserrormsg"
									];
		//this object is to redefine the error message.
		var listErrorText = {
												'nmbrerrormsg':'Please enter your house number',
												'postcodeerrormsg':'Please enter your postcode number'
												};
		//this list is to define which text area are numbers.
		var listNumbersForms = [
														false,
														false,
														true,
														true,
														false
														];
		var listNumbersLength = [
														false,
														false,
														false,
														true,
														false
														];														
		var someWrong = false;
		var listSomeWrong = [];
		var result;
			
		for(var i = 0; i < formList.length; i++) {
			someWrong = false;
			var text = document.getElementById(listIds[i]);
			
			if(formList[i] == "") {
				someWrong = true;
			}
			
			if(listNumbersForms[i] && isNaN(formList[i]) && someWrong == false) {
					text.innerHTML = 'Please enter a valid number';
					someWrong = true;
			} else if(listNumbersLength[i] && formList[i].length != 9 && someWrong == false){
					text.innerHTML = "This postcode isn't a valid one.";
					someWrong = true;
				} else if(listNumbersForms[i]) {
					text.innerHTML = listErrorText[listIds[i]];
			}
			
			if(listIds[i] == "emailaddresserrormsg" && someWrong == false) {
			someWrong = checkEmail(formList[i], text);
			}
			
			if(someWrong == true) {
				text.style.display = "block";
			} else {
				text.style.display = "none";
			}
			listSomeWrong.push(someWrong);
		}
		result = listSomeWrong.find(ifTrue);
		return !result;
	}
	
	function ifTrue(value) {
		return value == true;
	}
	
	function checkEmail(input, text) {
		var index = input.indexOf('@');
		var index2 = input.lastIndexOf('.');
		var diff = parseInt((index2 - index), 10);

		
		if(index == -1 || index2 == -1 || index == 0 || index2 == 0 || index == (input.length)-1 || index2 == (input.length)-1 || index2 == (input.length)-2 || index2 < index || diff < 3) {
			text.innerHTML = 'Please enter a valid email';
			return true;
		}		
	}