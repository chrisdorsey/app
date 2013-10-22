// JavaScript Document



$.CallValidation = function(){
	var call_validation = {
			default_config	: {
					valid_sample_call_requires 		: {
									lic_num 	: true,
									lic_exp		: true,
									designation	: true
					},
					valid_controlled_order_requires : {
									dea_num		: true,
									dea_exp		: true,
									lic_num		: true,
									lic_exp		: true,
									proper_dea	: true,
									designation	: true	
					},
					valid_no_sample_call_requires	: {
									detail		: true	
					}
			},
			isValidCallObject: function(dr_call,config){
				console.log("Running isValidCallObject");
				var default_config = this.default_config;
				var validation_obj = this.getCallValidationObject(dr_call);
				var return_obj = {
						valid : true,
						messages : []	
				};
				if(this.isset(config)){
					config = $.extend(true,{},default_config,config);	
				} else {
					config = default_config;	
				}
				if(config.valid_no_sample_call_requires.detail === true){	
					if(	
						validation_obj.has_call_details 	=== false && 
						validation_obj.is_controlled_order 	=== false
						) {
						console.log("Failed : Detail or Controlled Detail is required")	;
						return_obj.valid === false;
						return_obj.messages.push("At least 1 detail or controlled order is required.");
						return return_obj;
					}
				}
				if(validation_obj.is_detail_only === true){
						console.log("Passed : Detail Only Call.");	
						return_obj.valid === true;
						return_obj.messages.push("Detail Only, call is Valid.");
						return return_obj;
				}
				if(validation_obj.is_sample_call === true){
						var require_obj = config.valid_sample_call_requires;
						var valid_obj = this.isValidSampleCall(validation_obj,require_obj);
						//console.log(valid_obj);
						if( valid_obj.valid === false ){
							console.log("Failed : isValidSampleCall");
							return_obj.valid === false 
							return_obj.messages === valid_obj.messages;
							return return_obj;
						} else {
							console.log("Passed : isValidSampleCall");
							return_obj.messages.push("This is a valid sample Call.");	
						}
				}
				if(validation_obj.is_controlled_order === true){
						var require_obj = config.valid_controlled_order_requires;
						var valid_obj = this.isValidControlledOrder(validation_obj,require_obj);
						if( valid_obj.valid === false ){
							console.log("Failed : isValidControlledOrder");
							return_obj.valid === false 
							return_obj.messages.concat(valid_obj.messages);
							return return_obj;
						} else {
							console.log("Passed : isValidControlledOrder");
							return_obj.messages.push("This is a valid Controlled Order.");	
						}
						
				}
				return return_obj;
			},
			
			//GET METHODS
			getDrValidationObject 	: function(dr_obj){
					var validation_obj = {};
						validation_obj.lic_num 		= this.isValidLicNum(dr_obj.LIC_NUM);
						validation_obj.lic_exp 		= this.isValidLicExp(dr_obj.LIC_EXP);
						validation_obj.dea_num 		= this.isValidDeaNum(dr_obj.DEA_NUM);
						validation_obj.dea_exp 		= this.isValidDeaExp(dr_obj.DEA_EXP);
						validation_obj.designation 	= this.isValidDesignation(dr_obj.DESIGNATION);
						var last_sample_date		= dr_obj.LAST_SAMPLE_DATE;
						var lic_valid				= dr_obj.LIC_VALID;
						validation_obj.sample_able	= this.isSampleAbleDr(lic_valid,last_sample_date);
					return validation_obj;
			},
			getCallValidationObject : function(dr_call){
					var validation_obj = {};
						validation_obj.lic_num 				= this.isValidLicNum(dr_call.LIC_NUM);
						validation_obj.lic_exp 				= this.isValidLicExp(dr_call.LIC_EXP);
						validation_obj.dea_num 				= this.isValidDeaNum(dr_call.DEA_NUM);
						validation_obj.dea_exp 				= this.isValidDeaExp(dr_call.DEA_EXP);
						validation_obj.designation 			= this.isValidDesignation(dr_call.DESIGNATION);
						//validation_obj.proper_dea			= this.isProperDeaNumber(dr_call.DEA_NUM);
						validation_obj.is_detail_only		= this.isDetailOnlyCall(dr_call);
						validation_obj.has_call_details		= this.hasCallDetails(dr_call.details);
						validation_obj.is_sample_call		= this.isSampleCall(dr_call.details);
						validation_obj.is_controlled_order 	= this.isControlledOrder(dr_call.controlled_order_details);
						return validation_obj;	
			},
			
			//HAS METHODS
			hasCallDetails				: function(dr_call_detail_arr){
				//console.log("hasCallDetails");
				if(!this.isset(dr_call_detail_arr)){ 
					return false; 
				};
				//console.log(dr_call_detail_arr);
				var detail_count = dr_call_detail_arr.length;
				if(detail_count === 0){
					return false;	
				} else {
					return true;
				}
			},
			hasControlledOrderDetails	: function(controlled_order_detail_arr){
				if(!this.isset(controlled_order_detail_arr)){ 
					return false; 
				};
				var order_count = controlled_order_detail_arr.length;
				if(order_count === 0){
					return false;	
				} else {
					return true;
				}
			},
			
			//IS METHODS	
			isSampleCall				: function(dr_call_detail_arr){
				//console.log("isSampleCall");
				var has_details = this.hasCallDetails(dr_call_detail_arr);
				if(has_details === false){
					return false;	
				} else {
					var sample_qty = this.getTotalQtyFromArrayOfObjects(dr_call_detail_arr,'SAMPLE_QTY');
					if(sample_qty > 0)	{ return true;  }
					else 				{ return false; }
				}
			},
			isDetailOnlyCall			: function(dr_call){
				//console.log("isDetailOnlyCall");
				var has_details = this.hasCallDetails(dr_call.details);
				var is_sample_call = this.isSampleCall(dr_call.details);
				var is_controlled_order = this.isControlledOrder(dr_call.controlled_order_details);
				if(
					is_sample_call 		=== false &&
					is_controlled_order === false &&
					has_details 		=== true
				){ 
					return true; 
				} else {
					return false;
				};
			},
			isControlledOrder			: function(controlled_order_detail_arr){
				//console.log("isControlledOrder");
				var has_details = this.hasControlledOrderDetails(controlled_order_detail_arr);
				return has_details;
			},
			isValidDesignation			: function(designation){
				var is_blank = this.isBlank(designation);		
				if	(is_blank) 						{ return false; }
				else if	(designation.length <= 1) 	{ return false; }
				else 								{ return true; } 	
			},
			isValidLicNum				: function(lic_num){
				//console.log("isValidLicNum Using : " +lic_num);
				var is_zero = this.isZero(lic_num);
				var is_blank = this.isBlank(lic_num);		
				if	(is_blank === true) 	{ return false; }
				else if	(is_zero === true)	{ return false; }
				else 						{ return true; } 	
			},
			isValidDeaNum				: function(dea_num){
					var is_proper_dea_num_obj = this.isProperDeaNumber(dea_num);
					console.log(is_proper_dea_num_obj);
					return is_proper_dea_num_obj;
			},
			isValidLicExp				: function(lic_exp){
						var is_blank = this.isBlank(lic_exp);		
						if	(is_blank) 							{ return false; }
						else if	(lic_exp == '0000-00-00')		{ return false; }	
						else if	(lic_exp < this.unixDate()){ return false; }
						else { return true; }	
			},
			isValidDeaExp				: function(dea_exp){
						var is_blank = this.isBlank(dea_exp);		
						if	(is_blank) 							{ return false; }
						else if	(dea_exp == '0000-00-00')		{ return false; }	
						else if	(dea_exp < this.unixDate()){ return false; }
						else { return true; }	
			},
			isValidSampleCall			: function(validation_obj,require_obj){
				//console.log("isValidSampleCall");
				var return_obj = {
					valid : 	true,
					messages : 	[]	
				};
				if(require_obj.lic_num === true){
						if (validation_obj.lic_num === false){ 
							return_obj.valid = false;
							return_obj.messages.push("License Number is invalid.");	
						}
				}
				if(require_obj.lic_exp === true){
						if (validation_obj.lic_exp === false){ 
							return_obj.valid = false;
							return_obj.messages.push("License Expiration is invalid.");
						}
				}
				if(require_obj.designation === true){
						if (validation_obj.designation === false){ 							
							return_obj.valid = false;
							return_obj.messages.push("Designation is invalid.");
						}
				}
				return return_obj;
			},
			isValidControlledOrder		: function(validation_obj,require_obj){
				//console.log("isValidControlledOrder");
				var return_obj = {
					valid : 	true,
					messages : 	[]	
				};

				if(require_obj.lic_num === true){
						if (validation_obj.lic_num === false){ 
							return_obj.valid = false;
							return_obj.messages.push("License Number is invalid.");	
						}
				}
				if(require_obj.lic_exp === true){
						if (validation_obj.lic_exp === false){ 
							return_obj.valid = false;
							return_obj.messages.push("License Expiration is invalid.");
						}
				}
				if(require_obj.designation === true){
						if (validation_obj.designation === false){ 							
							return_obj.valid = false;
							return_obj.messages.push("Designation is invalid.");
						}
				}
				if(require_obj.dea_num === true){
						var valid = validation_obj.dea_num.valid;
						var message = validation_obj.dea_num.message;
						if (valid === false){ 							
							return_obj.valid = false;
							return_obj.messages.push(message);
						}
				}
				if(require_obj.dea_exp === true){
						if (validation_obj.dea_exp === false){ 							
							return_obj.valid = false;
							return_obj.messages.push("DEA Expiration is invalid.");
						}
				}
				/*if(require_obj.proper_dea === true){
						var valid = validation_obj.proper_dea.valid;
						var message = validation_obj.proper_dea.message;
						if (valid === false){ 							
							return_obj.valid = false;
							return_obj.messages.push(message);
						}
				}*/
				return return_obj;
			},
			
			//PUBLIC METHODS
			isSampleAbleDr				: function(lic_valid,last_sample_date){
				var is_blank_last_sample_date = this.isBlank(last_sample_date);
				var is_zero_last_sample_date  = this.isZero(last_sample_date);
				var is_zero_lic_valid = this.isZero(lic_valid);
				if( is_zero_lic_valid ){ 
						if	(is_blank_last_sample_date) 			{ return true; }
						else if	(is_zero_last_sample_date)			{ return true; }
						else 										{ return false; };	
				} else { 
					return true; 
				}
			},
			isValidSignature			: function(sig_json){
				var is_blank = this.isBlank(sig_json);		
				if	(is_blank === true) {return false;}
				else { return true; };	
			},
			isValidSRN					: function(srn){
				var is_blank = this.isBlank(srn);		
				if	(is_blank) 			{ return false; }
				else if	(srn == "0") 	{ return false; }
				else 					{ return true; } 	
			},
			isProperDeaNumber			: function(dea_num) {
				var return_obj = {
					valid			: true,
					message			: ""	
				};
				if(!_isLength(dea_num,9)){
					var message = "DEA number must be 9 characters long";
					setReturnObjectError(message);
					return return_obj;
				}
				var letters = dea_num.substr(0,2);
				$.each(letters, function(index,letter){
					console.log(letter);
					if(!_isAlphabetic(letter)){
					var message = "The first 2 characters of the DEA number must be letters";
					setReturnObjectError(message);
					return return_obj;	
					}
				});
				var numbers = dea_num.substr(2,7);
				if(!_isNumber(numbers)){
					var message = "The last 7 characters of the DEA number must be numbers";
					setReturnObjectError(message);
					return return_obj;	
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
					var message = " The DEA number does not appear to be valid" ;
					setReturnObjectError(message);
					return return_obj;	
				} else {
					var message = " The DEA number appears valid" ;
					setReturnObjectSuccess(message);
					return return_obj;	
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
				};
				function setReturnObjectError(message){
					return_obj.valid = false;
					return_obj.message = message;
					console.log(message);
				};	
				function setReturnObjectSuccess(message){
					return_obj.valid = true;
					return_obj.message = message;
					console.log(message);
				};
			},
			
			//HELPER METHODS
			isset			: function(variable){
				if(variable === null) 						{ return false; }
				else if(variable == "null" ) 				{ return false; }
				else if(variable == "undefined") 			{ return false; }
				else if(typeof(variable) == "undefined") 	{ return false; }
				else 										{ return true; }
			},
			isBlank			: function(variable){ 
				if(variable == "") 						{ 
					return true; 
				} 
				else if(variable === null) 				{
					return true;
				}
				else if(variable == "null" ) 			{
					return true;
				}
				else if(variable == "undefined") 		{
					return true;
				}
				else if(typeof(variable) == "undefined") {
					return true;
				}
				else 										{ return false; }
			},
			isAlphabetic	: function(char){
				return /^[A-Z]+$/i.test(char); 
			},
			isNumber		: function(n) {
  				return !isNaN(parseFloat(n)) && isFinite(n);
			},
			isLength		: function(str,integer){
				var len = str.length;
				if(len == integer){return true;	} 
				else {return false;	}
			},
			isZero			: function(variable){
				if(variable === 0) 						{ return true; }
				else if(variable == "0" ) 				{ return true; }
				else if(variable == "0000-00-00") 		{ return true; }
				else 									{ return false;}
			},	
			unixDate 		: function()		{		
										var date_new = new Date();
										var yyyy = 	date_new.getFullYear();
										var MM	=	pad2(date_new.getMonth()+1);
										var dd =	pad2(date_new.getDate());
										var current_date = yyyy +'-'+MM +'-'+dd;		
										return current_date;
										function pad2(number) 				{
     										return (number < 10 ? '0' : '') + number
										}	//END pad2 //adds leading zero to single digits
		},
			getTotalQtyFromArrayOfObjects	: function(arr,qty_property_name){
					var total_qty = 0;
					$.each(arr,function(index,qty_obj){
						total_qty = total_qty + parseInt(qty_obj[qty_property_name]);
					});
					return total_qty;
			}
	};
	return call_validation;
}







TEST_APP = {
	initClicks : function(){
		$('#btn_get_signature').on('click', function(){
			var call_obj = getCallObject();

			
			
			
			
			
			
			
		});		
	},
	testCallValidation	: function(dr_call){
		var call_validation = new $.CallValidation();

		
		console.log("Call Validate 1 with '0':" + call_validation.isZero(0));
		console.log("Call Validate 1 with '1':" + call_validation.isZero(1));
		var dr_call = APP.current_call;
		var validation_obj = call_validation.isValidCallObject(dr_call)
		return(validation_obj);
		//var a = call_validation.isZero(0);
	},
	validateCallObject : function(call_obj){
			
			var sample_qty 				= getSampleQty(call_obj);
			var controlled_order_qty	= getControlledOrderQty(call_obj);
			var is_sample_call 			= VALIDATE.isSampleCall(sample_qty);
			var is_controlled_order 	= VALIDATE.isControlledOrder(controlled_order_qty);
			var to_validate_obj 		= getObjectToValidate();
			var validation_obj 			= VALIDATE.getDrValidationObject(to_validate_obj);			
			var return_obj = {
					valid	: true,
					errors	: []
			};
			
			if(is_controlled_order){
				console.log("This is a Controlled Order with a total order qty of " + controlled_order_qty);
				validateControlledOrder();
			} else {	
				console.log("This call does not contain controlled orders");
			}
			if(is_sample_call){
				console.log("This is a sample call with a total sample qty of " + sample_qty);
				validateSampleCall();
			} else {
				console.log("This is not a sample call");
			}
			return return_obj;
		//HELPER FUNCTIONS 
			function getObjectToValidate(){
				to_validate_obj 					= {};
				var dr_id							= call_obj.DR_ID;
				var dr_obj 							= APP.getDrObject(dr_id);
				to_validate_obj.lic_num				= call_obj.LIC_NUM;
				to_validate_obj.lic_exp				= call_obj.LIC_EXP;
				to_validate_obj.dea_num				= call_obj.DEA_NUM;
				to_validate_obj.dea_exp				= call_obj.DEA_EXP;
				to_validate_obj.designation			= call_obj.DESIGNATION;
				to_validate_obj.lic_valid			= dr_obj.LIC_VALID;
				to_validate_obj.last_sample_date	= dr_obj.LAST_SAMPLE_DATE;
				to_validate_obj.srn					= call_obj.SRN;
				return to_validate_obj;
			};
			function validateControlledOrder(){
				if(validation_obj.lic_num === false){ 
					var message = "Controlled Orders require a valid State License number.";
					setReturnObjectInvalid(message);
				}
				if(validation_obj.lic_exp === false){ 
					var message = "Controlled Orders require a valid License Expiration Date.";
					setReturnObjectInvalid(message);
				}
				if(validation_obj.designation === false){ 
					var message = "Controlled Orders require a valid Designation.";
					setReturnObjectInvalid(message);
				}
				if(validation_obj.dea_num === false){ 
					var message = "Controlled Orders require a valid DEA number.";
					setReturnObjectInvalid(message);
				}
				if(validation_obj.dea_exp === false){ 
					var message = "Controlled Orders require a valid DEA expiration date.";
					setReturnObjectInvalid(message);
				}
			};
			function validateSampleCall(){
				if(validation_obj.lic_num === false){ 
					var message = "Delivering samples requires a valid State License number.";
					setReturnObjectInvalid(message);
				}
				if(validation_obj.lic_exp === false){ 
					var message = "Delivering samples requires a valid License expiration date.";
					setReturnObjectInvalid(message);
				}
				if(validation_obj.designation === false){ 
					var message = "Delivering samples requires a valid Designation..";
					setReturnObjectInvalid(message);
				}
			};
			function setReturnObjectInvalid(message){
					error_obj = { message : message};
					return_obj.valid = false;
					return_obj.errors.push(error_obj);
					console.log(message);
			};
	},
	validateSampleAble	: function(dr_id){
				var dr_obj 				= APP.getDrObject(dr_id);
				var lic_valid 			= dr_obj.LIC_VALID;
				var last_sample_date 	= dr_obj.LAST_SAMPLE_DATE;
				var is_sample_able		= VALIDATE.isSampleAble(lic_valid,last_sample_date);
				if(is_sample_able === false){ 
					console.log(" This Dr is NOT able to receive samples ");
					APP.hideSampleInputs();
					APP.showNotSampleAbleMessage();
				} else {
					console.log(" This Dr is able to receive samples ");
					APP.showSampleInputs();
					APP.hideNotSampleAbleMessage();
				}
	},
	validateDeaNumber:		function(dea_num){
					var is_proper_dea_num_obj = VALIDATE.isProperDeaNumber(dea_num);
					if 	(is_proper_dea_num_obj.valid == true) {
						return true;	
					} else {
						alert(is_proper_dea_num_obj.message);
						return false;	
					}
	},
	getDrObject			: function(dr_id){
		
		return dr_obj;
	},
	getCallObject		: function(){
		// gather all the information
		
		
		return call_obj;	
	},

	getSampleQty		: function(call_obj){
		
		return sample_qty;	
	},
	getControlledOrderQty : function(){
		
		return controlled_order_qty;
	},
	hideSampleInputs    : function(){
		var selector = "input[name='SAMPLE_QTY']";
		$(selector).hide();
		console.log(" Hiding Sample Inputs ");
	},
	showSampleInputs	: function(){
		var selector = "input[name='SAMPLE_QTY']";
		$(selector).show();
		console.log(" Showing Sample Inputs ");
	},
	hideNotSampleAbleMessage : function(){
		var selector = ".not-sample-able-message";
		$(selector).hide();
		console.log("Hiding Not Sample Able Message");	
	},
	showNotSampleAbleMessage : function(){
		var selector = ".not-sample-able-message";
		$(selector).show();
		console.log("Showing Not Sample Able Message");
	}
}