function checkForm() {
		var formList = [
										document.getElementById("fullname").value, 
										document.getElementById("streetaddr").value,
										document.getElementById("housenmbr").value,
										document.getElementById("postcodenmbr").value
										];
		var listIds = [
										"nameerrormsg", 
										"addrerrormsg",
										"nmbrerrormsg",
										"postcodeerrormsg"
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
														true
														];
		var listNumbersLength = [
														false,
														false,
														false,
														true
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