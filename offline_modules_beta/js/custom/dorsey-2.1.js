UTILITIES = {
	//GENERAL
			isset									: function(variable){
			 					if(	
										typeof(variable) 	!= "undefined" 
										&& variable 		!== null 
										&& variable 		!= "false"
										&& variable 		!= "undefined"
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
			removeHash								: function(str)		{
					return str.replace('#','');
			},
			addHash									: function(str)		{
					var unhashed = str.replace('#','');
					var hashed = '#'+ unhashed;
					return hashed;
			},
			timeStamp 								: function()		{		
										var date_new = new Date();
										var yyyy = 	date_new.getFullYear();
										var MM	=	pad2(date_new.getMonth()+1);
										var dd =	pad2(date_new.getDate());
										var hh =	pad2(date_new.getHours());
										var mm = 	pad2(date_new.getMinutes());
										var ss = 	pad2(date_new.getSeconds());
										var current_ts = yyyy +'-'+MM +'-'+dd +'-'+hh +'-'+mm +'-'+ss;		
										return current_ts;

										function pad2(number) 				{
     										return (number < 10 ? '0' : '') + number
										}	//END pad2 //adds leading zero to single digits
			},
			unixDate 								: function()		{		
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
			toProperCase							: function(str) 	{
								return str.replace(/\w\S*/g, function(txt){
													return 	txt.charAt(0).toUpperCase() +
													 		txt.substr(1).toLowerCase();
										}); 
			},
			checkOnline								: function(url_ping){
								var response = 1;
								$.ajax({
										url: 		url_ping,
										dataType	:	"json",
										type		:	"GET",
										data		: {"data":""},
										cache:		false, 
										error:		function(){return 0;},
										success:	function (data){
															//alert(data.alive);
															if (data.alive == 1){response =  1;} 
															else {response = 0}
										}
									})
									return response;					

			},
			getServerTimeStamp			: function(url_ping){
							
				
			},
			getDeviceId								: function(user_id) {
				var device_id = user_id +"_"+ this.timeStamp();
				return device_id;	
			},
	//FORM METHODS
			serializeObject 						: function(form_id){
									form_id = this.addHash(form_id);
								   var obj = {};
 								   var arr = $(form_id).serializeArray();
 								   $.each(arr, function() {
 								       if (obj[this.name]) {
 								           if (!obj[this.name].push) {
 								               obj[this.name] = [obj[this.name]];
  								          }
								          obj[this.name].push(this.value || '');
  								      } else {
  								          obj[this.name] = this.value || '';
  								      }
  								  });
 								  return obj;
 			},	
			getFormData								: function(form_id){
				form_id = this.addHash(form_id);
				var obj = this.serializeObject(form_id);
				return obj;	
			},
			resetForm								: function(form_id) {
				return $(form_id).each(function() {
					if (	typeof this.reset == 'function' || 
							(
								typeof this.reset == 'object' && 
								!this.reset.nodeType
							)
						) {
						this.reset();
					}
				});
			},
			resetMobileForm							: function(form_id) {
				console.log(form_id + " resetting"); 
				this.resetForm(form_id);
				this.updateMobileFormLayout(form_id);	
			},
			setFormData								: function(form_id,obj){
				form_id = this.addHash(form_id);
				$.each(obj,function(key,value){
					$(form_id + ' [name="' + key + '"]').val(value);	
				});
				this.updateMobileFormLayout(form_id);
			},
			getFormSelectOptionsHtml				: function(arr)	{//console.log(arr);	
										var options_html = "<option value=''>select...</option>";
										var object_sort_field = 'label';
										if($.isArray(arr)){
											var ordered_arr = this.sortArrayOfObjects(arr,object_sort_field);
											$.each(ordered_arr,function(){
												var value 		= $.trim(this.value);
												var label 		= $.trim(this.label);
												options_html 	+= '<option value="' + value + '">' + label +'</option>';
											});//console.log(options_html);
										}
										return options_html;
			},
			setFormSelectOptionsHtml				: function(select_id, options_html){
					select_id = this.addHash(select_id);
					$(select_id).html(options_html);
			},
			existsInSelectOptions					: function(select_id,the_value){
					select_id = this.addHash(select_id);
					var exists = false;
					$('#select-box option').each(function(){
    					if (this.value == the_value) {
        					exists = true;
        					return false;
    					}
					});
					return exists;
			},
			addSelectedOptionToSelect				: function(select_id,label,value){
					select_id = this.addHash(select_id);
					var $option = $('<option value="' +value+ '" selected="selected" >' +label+ '</option>');
					$(select_id).prepend($option);
			},
			addSelectedOptionIfNotExists			: function(select_id,value,label){
					var exists = this.existsInSelectOptions(select_id, value);
					if (exists == false){
						this.addSelectedOptionToSelect(select_id,label,value);	
					} else {
						$.noop();	
					}
			},
	//SHOW-HIDE SELECT OPTIONS
			enableAllSelectOptions					: function(container_id){
				console.log("enabling all Options");
				
				$(container_id + ' option').each(function(){
						$(this).removeAttr('disabled');
						$(this).show();
				});
			},
			enableSelectOptionsWithValue			: function(container_id,value){
				var selector = container_id +" option[value='"+value+"']";
				console.log(selector);
				$(selector).each(function(){
						$(this).removeAttr('disabled');
						$(this).show();
				});
			},
			enableUnselectedSelectOptions			: function(container_id){
				this.enableAllSelectOptions(container_id);
				console.log("enabling all Options");
				var selected_values = this.getSelectedOptionsArray(container_id);
				console.log(selected_values);
				$(container_id + ' option').each(function(){
					if(!$.inArray($(this).val(),selected_values)){
						$(this).removeAttr('disabled');
						$(this).show();
					}
				});
			},
			disableSelectedOptions					: function(container_id){
				this.enableAllSelectOptions(container_id);
				var selected_arr = this.getSelectedOptionsArray(container_id);
				$.each(selected_arr, function(index,value){
					var selector = container_id +" option[value='"+value+"']";
					$(selector).each(function(){
									console.log("disabling "+ selector);
									//$(this).attr('disabled','disabled');
									$(this).hide();
					});
				});
			},
			disableSelectOptionsWithValue			: function(container_id, value){
				console.log("Disabling Options with "+value);
				var selector = container_id +" option[value='"+value+"']";
				$(selector).each(function(){
									console.log("disabling "+ selector);
									//$(this).attr('disabled','disabled');
									$(this).hide();
				});
			},
			getSelectedOptionsArray					: function(container_id){
				var selected_arr = [];
				var $selected_options = $(container_id + ' option:selected');
				$selected_options.each(function(){
					var value = $(this).val();
					if (value != "" || !$.inArray(selected_arr)){
						selected_arr.push(value);
					}
				});
				return selected_arr
			},
			
			renderFormSelectOptionsHtml				: function(arr,select_id){
					select_id = this.addHash(select_id);
					var options_html = this.getFormSelectOptionsHtml(arr);
					this.setFormSelectOptionsHtml(select_id, options_html);
			},
			renderMulipleFormSelectOptionsHtml		: function(arr,select_name){
					var selector = "select[name='"+ select_name+"']"
					var options_html = this.getFormSelectOptionsHtml(arr);
					$(selector).html(options_html);
			},
			updateMobileFormLayout 					: function (selector){
				$(selector + ' select').each(function(index,element){
					try {
							$(this).selectmenu("refresh");
								console.log(selector + ' select  HAS REFRESHED');
							} 
					catch(err){
							console.log(selector + ' select Could NOT refresh Select, trying to initialize');
							$(this).selectmenu();
					}	
				});
				$(selector + ' input[type="radio"]').each(function(index,element){
					try {
							$(this).checkboxradio("refresh");
						}
					catch(err){
						console.log("Could Not refresh Radio, trying to initialize");
						$(this).checkboxradio()
					}
				});
				$(selector + ' input[type="checkbox"]').each(function(index,element){
					try {
							$(this).checkboxradio("refresh");
						}
					catch(err){
						console.log("Could Not refresh checkbox, trying to initialize");
						$(this).checkboxradio()
					}
				});
			},
			updatePageMobileFormLayouts				: function (page_id){
					//var update = this.updateMobileFormLayout;
					console.log
					page_id = this.addHash(page_id);
					$(page_id + " form").each(function(index,form){
							var form_id = $(form).attr("id");
							UTILITIES.updateMobileFormLayout(form_id);
					});
			},
			showMobileFormButton					: function(selector)	{
					$(selector).each(function(index,element){
            			$(this).closest('.ui-btn').show();
					});
					console.log("Hiding Buttons");
			},
			hideMobileFormButtons					: function(selector){
					$(selector).each(function(index,element){
            			$(this).closest('.ui-btn').hide();
					});
					console.log("Hiding Buttons");
			},
			getDataAttributesString					: function(data_obj){
				var data_str = "";
				$.each(data_obj, function(key,value){
					var str = ' data-' + key + '="'+ value +'" '
					data_str += str;
				});
				return data_str;
			},
			getDataAttributesObject			: function(element_id){
				element_id = this.addHash(element_id);
				var data_obj = $(element_id).data();
				return data_obj;
			},
			setDataAttributes						: function(selector, data_obj){
				$(selector).each(function(index,element){
					$.each(data_obj, function(key,value){
						$(element).data(key,value);
					});
				});
			},
	//ARRAY METHODS		
			sortArrayOfObjects              		: function(arr,object_sort_field){
					var sorted_array = arr.sort(function(a, b){
  											var itemA=a[object_sort_field].toLowerCase()
											var itemB=b[object_sort_field].toLowerCase()
  										if (itemA < itemB) //sort string ascending
   											{return -1}; 
 										if (itemA > itemB)
   											{return 1};
  										return 0; //default return value (no sorting)
									})
					return sorted_array;				
			},
			getRecordObjectFromArray				: function(arr,id_column,id_value){
				var data_record = $.grep(arr,function(obj,index){
										return obj[id_column] == id_value;
				});
				return data_record[0];
			},
			countRecordObjectsInArray				: function(arr,id_column,id_value){
				var data_record = $.grep(arr,function(obj,index){
										return obj[id_column] == id_value;
				});
				return data_record.length;
			},
			insertRecordObjectInToArray				: function(arr,record_obj){
				console.log(arr);
				arr.push(record_obj);
				return arr
			},
			replaceRecordObjectInArray 				: function(arr,id_column,id_value,updated_object)	{		
				if($.isArray(arr)){
					$.each(arr,function(index,obj){
						if(obj[id_column] == id_value){
							console.log("Replacing " +id_column +" = "+ id_value);
							arr.splice(index,1,updated_object);
						};
					});
					return arr;
				} else {
					console.log("Array was not provided to replaceRecordObjectInArray");
				};
			},
			deleteRecordObjectFromArray				: function(arr,id_column,id_value){
				var keep_arr = $.grep(arr,function(obj,index){
										return obj[id_column] != id_value;
							});
				return keep_arr;	
			},
			getPropertyValueFromArrayOfObjects 		: function(arr,id_column,id_value,return_property){
						var return_value;
						var record_obj = this.getRecordObjectFromArray(arr,id_column,id_value)
							return_value = record_obj[return_property];
						return return_value;
			},
			mapColumnAndDataArraysToArrayOfObjects 	: function(column_arr,data_arr_arr){
					var arr_of_objects = [];
					$.each(data_arr_arr, function(index,data_arr){
						var data_obj = {}
						$.each(data_arr, function(index2,value){
							data_obj[column_arr[index2]] = value;
						});
						arr_of_objects.push(data_obj);
					});
					return arr_of_objects;
			},
			mapArrayOfObjectsToColumnAndDataArrays	: function(arr_of_objects){
					var column_arr = [];
					var data_arr_arr = []
					$.each(arr_of_objects, function(index,data_obj){
						var data_arr = [];
						$.each(data_obj, function(key,value){
							if(index == 0){column_arr.push(key)};
							data_arr.push(value);		
						});
						data_arr_arr.push(data_arr);
					});
					var return_obj = {};
					return_obj.columns = columns_arr;
					return_obj.data		= data_arr_arr;
					return return_obj;
			},
	//LOCAL STORAGE
			localStorageSet							: function(key,data)	{
					try{
						var datajson = JSON.stringify(data);
						try {
							localStorage.setItem(key,datajson);
						} catch(e) {
							console.log("Could not Set Item. Error :" + e.message);
						}
					} catch (e){
						console.log("An error occured saving to Local Storage.");
					}
			},
			localStorageGet							: function(key)	{
					if(_isset(localStorage.getItem(key))){
						var local = localStorage.getItem(key);
					} else {return ""};
					if (local.length > 0){
						try { 
								var o = $.parseJSON(local);
								return o;
						} catch(e) {
								console.log("Local Storage Get Error").
								alert("Local Storage Get Error " + e.message);		
								return ""; //alert(e)
						}
					} else {return ""};

						
					function _isset(variable){
			 					if(	
										typeof(variable) 	!= "undefined" 
										&& variable 		!== null 
										&& variable 		!= "false"
										&& variable 		!= "undefined"
								){
									return true;
								} else {
									return false;	
								}	
					}
			}, 
			localStorageRemove						: function(key)	{
				try {
					localStorage.removeItem(key);
					console.log("Removed Item " +key+ "From LocalStorage");
				} catch(e) {
					console.log("Could not remove Item. Error :" + e.message);
				}
			},
			localStorageDeleteAll					: function(){
					localStorage.clear();	
			},
	//DOM
			getOnOffMobileSliderHtml				: function(id,name,label)	{
														var onoff 		= "<div data-role='fieldcontain' class='onoff'>";
															onoff		+= "<label for='"+id+"'>"+label+"</label>";
															onoff 		+= "<select id='"+id+"' name='"+name+"' data-role='slider' data-mini='true'>";
															onoff		+= "<option value='0'>OFF</option>";
															onoff 		+= "<option value='1'>ON</option>";
															onoff		+=	"</select></div>";
															return onoff;
			},
			setMobilePageHeaderTitles				: function(){
				var pages = $( ":jqmData(role='page')" );
				$.each(pages,function(){
					var page_id = $(this).attr('id');
					var title = $('#'+page_id).jqmData('title');
					if (typeof title === "undefined"){
						$.noop();
					} else {
						$('#'+page_id+ " .header-title").html(title);
					};
				});
			},
			setMobileNavLinksActive					: function(){
												$(":jqmData(role=page)").each(function(){
															var page_id = "#" + $(this).attr("id");
															$(page_id +" nav a[href ="+page_id+ "]").addClass("ui-btn-active");	
												});		
			},
			refreshMobileListView					: function(listview_id){
						listview_id = this.addHash(listview_id);
						try {
							$(listview_id).listview('refresh');
						} catch (err) {
							console.log(err);
							$(listview_id).listview();
						}					
			},
			refreshMobileForm						: function(form_id){
				form_id = this.addHash(form_id);
				$(form_id +' select').each(function(index,element){
						try {
							$(this).selectmenu('refresh');
						} catch (err) {
							console.log(err);
							$(this).selectmenu();
						}
				});
				$(form_id +" input[type='checkbox']").each(function(index,element){
						try {
							$(this).checkboxradio("refresh");
						} catch (err) {
							console.log(err);
							$(this).checkboxradio();
						}
				});
				$(form_id +" input[type='radio']").each(function(index,element){
						try {
							$(this).checkboxradio("refresh");
						} catch (err) {
							console.log(err);
							$(this).checkboxradio();
						}
				});
			},
			refreshMobileSelect						: function(selector){
					$(selector).each(function(index,element){
						try {
							$(this).selectmenu('refresh');
						} catch (err) {
							console.log(err);
							$(this).selectmenu();
						}
					});
			},
			refreshMobileCheckBoxRadio				: function(selector){
					$(selector).each(function(index,element){
						try {
							$(this).checkboxradio('refresh');
						} catch (err) {
							console.log(err);
							$(this).checkboxradio();
						}
					});
			},
			refreshMobileButton						: function(selector){
						$(selector).each(function(index,element){
								
								try {
									$(this).button('refresh');
								} catch (err) {
									console.log("Couldn't refresh, trying to create");
									$(this).button();
								}	
						});
			},
			updateMobileSelectTheme					: function($select,theme){
				var old_theme = $select.attr('data-theme');
				$select.attr('data-theme',theme);
				console.log("removing class "+old_theme);
				$select.parent('div').removeClass('ui-btn-up-'+old_theme);
				console.log("adding class "+theme);
				$select.parent('div').addClass('ui-btn-up-'+theme);
			},
			setDefaultImageOnError					: function(selector,default_image){
				$(selector).each(function(index,element){
					element.onerror = function(){
						$(element).attr("src",default_image);	
					};
				});
			},
			TESTprocessAjaxObject : function(){
								ajax_obj = {
								url	:  "/server/download/json/dr_call_detail_product_array.php",
								callback : function(data,textStatus,jqXHR){
										console.log(textStatus);
								},
								ajax: function(){
									return $.getJSON(this.url,this.callback)
								},
								fail:function(data,textStatus,jqXHR){
									alert("failed : "+ textStatus);
								},
								always:  function(data,textStatus,jqXHR){
										console.log(textStatus);
								}
							};
			},
			processAjaxObject				: function(ajax_obj){
					if(	ajax_obj.ajax ){
						$.when( ajax_obj.ajax() )
							.done(
								ajax_obj.callback(data, textStatus, jqXHR)		
							)
							.fail(
								ajax_obj.fail(data, textStatus, jqXHR)	
							)
							.always(
								ajax_obj.always(data, textStatus, jqXHR)
							);
					}
			},
			processAjaxQueue 				: function(queue){
				var i = 0;
				var n = queue.length;
				var processQueueItem = function(queue,i){
					var queue_item = queue[i];
					console.log(queue[i]);
					if(	queue[i].ajax ){
						$.when( queue[i].ajax() )
							.done(
								function(data, textStatus, jqXHR){
									console.log("Finished queue item " + i);
									if(i < (n - 1)){
										i = i + 1;
										console.log("Starting queue item " + i);
										processQueueItem(queue,i);
									};
								}
							)
							.fail(
								function(data, textStatus, jqXHR){
									if(queue[i].fail){
										queue[i].fail(data, textStatus, jqXHR);
									} else {
										alert("failed : "+ textStatus);	
									}
								}
							)
							.always(
								function(data, textStatus, jqXHR){
									if(queue[i].always){
										queue[i].always(data, textStatus, jqXHR);
									} else {
										console.log(textStatus);
									};
								}
							);
					} else {
						$.when( queue[i]() )
							.done(
								function(){
									console.log("Finished queue item " + i);
									if(i < (n - 1)){
										i = i + 1;
										console.log("Starting queue item " + i);
										processQueueItem(queue,i);
									};
								}
							)
					};	
				}
				processQueueItem(queue,i);
			},
 };
