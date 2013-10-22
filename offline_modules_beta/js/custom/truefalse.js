// truefalse.js
TORF = {
//GENERAL
			isset									: function(variable){
			 					if(	
										typeof(variable) 	!= "undefined" 
										&& variable 		!== null 
										&& variable 		!= "false"
								){
									return true;
								} else {
									return false;	
								}	
			},
			isBlank									: function(variable){
				var is_blank = false; 
				if(
					variable 			== "" 			||
					variable 			=== null 		||
					variable 			== "null" 		||
					variable 			== "undefined" 	||
					typeof(variable) 	== "undefined"
				){ is_blank = true; }
				return is_blank;	
			},
			isAlphabetic	:function(char){
				return /^[A-Z]+$/i.test(char); 
			},
			isNumber		:function(n) {
  				return !isNaN(parseFloat(n)) && isFinite(n);
			},
			isLength		: function(str,integer){
				var len = str.length;
				if(len == integer){
					return true;	
				} else {
					return false;	
				}
			},
			isProperDeaNumber	: function(dea_num) {
				if(!_isLength(dea_num,9)){
					alert("DEA number must be 9 characters long");
					return false;
				}
				var letters = dea_num.substr(0,2);
				$.each(letters, function(index,letter){
					console.log(letter);
					if(!_isAlphabetic(letter)){
						alert( "The first 2 characters of the DEA number must be letters");
						return false;	
					}
				});
				var numbers = dea_num.substr(2,7);
				if(!_isNumber(numbers)){
						alert( "The last 7 characters of the DEA number must be numbers");
						return false;	
				};

				var first_digit 	= parseInt(dea_num.substr(2,1));
				var second_digit 	= parseInt(dea_num.substr(3,1));
				var third_digit 	= parseInt(dea_num.substr(4,1));
				var fourth_digit 	= parseInt(dea_num.substr(5,1));
				var fifth_digit 	= parseInt(dea_num.substr(6,1));
				var sixth_digit 	= parseInt(dea_num.substr(7,1));
				var seventh_digit 	= parseInt(dea_num.substr(8,1));
				var check_digit = seventh_digit;
				
				var calc135 = first_digit + third_digit + fifth_digit;
				var calc246 = (second_digit + fourth_digit + sixth_digit) * 2;
				
				var check = calc135 + calc246;
				check = check + ''; //convert to string
				var calc_check_digit = check.substr(-1,1);
				
				console.log("Check1 :"+first_digit);
				console.log("Check2 :"+second_digit);
				console.log("Check3 :"+third_digit);
				console.log("Check4 :"+fourth_digit);
				console.log("Check5 :"+fifth_digit);
				console.log("Check6 :"+sixth_digit);
				console.log("Check7 :"+seventh_digit);
				console.log("Check :"+check);
				console.log("Check Digit :"+calc_check_digit);
				
				if(check_digit != calc_check_digit){
					alert( " The DEA number does not appear to be valid" );
					return false;	
				} else {
					return true;	
				}
				
				function _isAlphabetic(char){
					return /^[A-Z]+$/i.test(char); 
				};
				function _isNumber(n) {
  					return !isNaN(parseFloat(n)) && isFinite(n);
				};
				function _isLength(str,integer){
					var len = str.length;
					if(len == integer){
						return true;	
					} else {
						return false;	
					}
				}
				
			},		
}