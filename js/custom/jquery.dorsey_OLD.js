// JavaScript Document
/**** JQUERY PLUGINS REGISTERED BELOW **********************************************/
(function($) {
	$.extend({
		deleteObjectFromArray 	: 	function(arr,search_property,search_value)	{		
				var keep = [];
				$.each(arr,function(index){
					var obj = this;
					if(obj[search_property] != search_value){
						keep.push(obj);
					};
				});
				return keep;
		}, //END: deleteObjectFromArray
		replaceObjectInArray 			: function(arr,search_property,search_value,updated_object)	{		
				$.each(arr,function(index){
					var obj = this;
					if(obj[search_property] == search_value){
						var new_arr = arr.splice(index,1,updated_object);
					    arr = new_arr;
					};
				});
				return arr;
		}, //END: replaceObjectInArray
		getObjectFromArray 				: function(arr,search_property,search_value)	{		
				var return_object = {};
				$.each(arr,function(index){
					var obj = this;
					if(obj[search_property] == search_value){
							return_object = this;
					};
				});
				return return_object;
		}, //END: getObjectFromArray
		getObjectFromArray2 			: function(obj)	{		
				var arr 			= obj.arr;
				var search_property = obj.search_property;
				var search_value 	= obj.search_value;
				var return_object = {};
				$.each(arr,function(index){
					var obj = this;
					if(obj[search_property] == search_value){
							return_object = this;
					};
				});
				return return_object;
		}, //END: getObjectFromArray2
		getPropertyFromArrayOfObjects 	: function(obj){
						var arr 			= obj.arr;
						var search_property = obj.search_property;
						var search_value 	= obj.search_value;
						var return_property = obj.return_property;
						var return_value;
						$.each(arr, function(){
							var obj = this;
							if(obj[search_property] == search_value){ return_value = obj[return_property]; }
						});
						return return_value;
		},
		getObjectFromForm				: function(form_id){
					var obj = $(form_id).serializeObject();
					return obj;
		},
		sortArrayOfObjects              : function(arr,object_sort_field){
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
		getFormSelectOptionsArray		: function(obj)	{
										var arr 			= obj.arr;
										var display_field 	= obj.display_field;
										var value_field 	= obj.value_field;
										var options_arr = [];
										$.each(arr, function(){
											var record = this;
											var obj2 = {};
											obj2.option_display 	= record[display_field];
											obj2.option_value 	= record[value_field];
											options_arr.push(obj2);
										});
										//options_arr = $.sortArrayOfObjects(options_arr,obj2.option_display);
										return options_arr;
		},//END: getFormSelectOptionsArray
		makeJqueryNestedTagObject : function(tags_obj){
			/*var tags_obj ={
						tag: "nav",
						attributes: {id:"test_id",class:"testclass"},
						data:{role:"controlgroup",inline:"true"},
						tags: [
							{
							tag:"ul",
							attributes:{class:"ul"},
							tags: [
								{
									tag: "li",
									text : " list item 1",
									attributes:{
										class: "li-1"	
									}
								},
								{
									tag: "li",
									text : " list item 2",
									attributes:{
										class: "li-2"	
									}
								},
							]
						}]
				}*/
			var tags = tags_obj;
			return parseTags(tags);
			
			function parseTags (tags){
				var $elements = $('<tag>');
				if($.isArray(tags)){
					$.each(tags, function(index,tag){
						$elements.append(parseTag(tag));
					});
				} else {
					var tag = tags;
					$elements.append(parseTag(tag));	
				}
				var html_str = $($elements).html();
				var return_obj = $(html_str);
				return return_obj;	
			};
			function parseTag (obj){
				var data = "";
				if($.isset(obj.data)){
					$.each(obj.data,function(key,value){
						data += ' data-' + key + ' = "' + value + '" '; 
					});
				};
				var $element = $('<'+obj.tag + data + '></'+obj.tag+'>');
				if($.isset(obj.attributes)){
					$.each(obj.attributes, function(attributeName, value){
						$element.attr(attributeName,value);
					});
				};
				if($.isset(obj.text)){
					$element.text(obj.text);
				}
				if($.isset(obj.tags)){
					$element.append(parseTags(obj.tags));	
				}
				return $element;
			};
		},
		getFormSelectOptionsHtml		: function(arr)	{				
										var options_html = "<option value=''>select...</option>";
										var ordered_arr = $.sortArrayOfObjects(arr,'option_display');
										$.each(ordered_arr,function(){
											var value 		= this.option_value;
											var display 	= this.option_display;
											options_html 	+= '<option value="' + value + '">' + display +'</option>';
										});//END: each				
										return options_html;
		},//END: getFormSelectOptionsHtml
		getFormSelectOptionsHtml2		: function(arr)	{
										//console.log(arr);				
										var options_html = "<option value=''>select...</option>";
										var ordered_arr = $.sortArrayOfObjects(arr,'label');
										$.each(ordered_arr,function(){
											var value 		= $.trim(this.value);
											var label 		= $.trim(this.label);
											options_html 	+= '<option value="' + value + '">' + label +'</option>';
										});//END: each
										//console.log(options_html)				
										return options_html;
		},//END: getFormSelectOptionsHtml2
		renderFormSelectOptionsHtml		: function(input_id,options_html){
					$(input_id).empty();
					$(options_html).appendTo(input_id)
		},
		loadFormWithObject				: function(form_id,obj){
												$.each(obj,function(key,value){
													$(form_id + ' [name="' + key + '"]').val(value);	
												});
												$(form_id + ' select').selectmenu("refresh");
		},//END: loadFormWithObject	
		localStorageSet					: function(key,data)	{
					var datajson = JSON.stringify(data);
					localStorage.removeItem(key);
					localStorage.setItem(key,datajson);
		}, //END: localStorageSet
		localStorageGet					: function(key)	{
					var local = localStorage.getItem(key);
						if (local != null){
							if (local != undefined){
								if (local.length > 0){
									try { 
										var o = JSON.parse(local);
										return o;
									}
									catch(e) {
										return ""; alert(e)
									}
								} else {return ""};
							} else {return ""};
						}else {return ""};
		}, //END: localStorageGet
		timeStamp 						: function()	{		var date_new = new Date();
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
		}, //END: timeStamp
		unixDate 						: function()	{		var date_new = new Date();
										var yyyy = 	date_new.getFullYear();
										var MM	=	pad2(date_new.getMonth()+1);
										var dd =	pad2(date_new.getDate());
										var hh =	pad2(date_new.getHours());
										var mm = 	pad2(date_new.getMinutes());
										var ss = 	pad2(date_new.getSeconds());
										var current_ts = yyyy +'-'+MM +'-'+dd;		
										return current_ts;

										function pad2(number) 				{
     										return (number < 10 ? '0' : '') + number
										}	//END pad2 //adds leading zero to single digits
		}, //END: timeStamp
		toProperCase					: function(str) 	{return str.replace(/\w\S*/g, 
												function(txt){
													return 	txt.charAt(0).toUpperCase() +
													 		txt.substr(1).toLowerCase();
													 }); 
		}, //END: toProperCase
		checkOnline						: function(url_ping)	{
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
		}, 		//END: checkOnLine
		renderHeadFoot					: function(){
												var head = $('#template header:eq(0)').children().clone();
												$('.page-header').html(head);
												var foot = $('#template footer:eq(0)').children().clone();
												$('.page-footer').html(foot);
												//Update the navbar ui-btn-active
												$(":jqmData(role=page)").each(function(){
															var page_id = "#" + $(this).attr("id");
															$(page_id +" nav a[href ="+page_id+ "]").addClass("ui-btn-active");	
												});	
		},//END: renderHeadFoot
		renderHeaderTitle				: function(page_id,title_text){
			$(page_id +" .header-title h3").html(title_text);
		},
		renderNavbar					: function(page_id){
			var navbar = $('#template .template-navbar').clone();
			$(page_id +' .header-navbar').html(navbar);
			//$(page_id +" .header-navbar").html(title_text);
		},
		renderFooterNavbar				: function(page_id){
			var navbar = $('#template .template-navbar').clone();
			$(page_id +' .footer-navbar').html(navbar);
			//$(page_id +" .header-navbar").html(title_text);
		},
		renderHeaderTitles				: function(page_id,title_text){
			var pages = $( ":jqmData(role='page')" );
			$.each(pages,function(){
				var page_id = $(this).attr('id');
				var title = $('#'+page_id).jqmData('title');
				if (typeof title === "undefined"){
					//do nothing
				} else {
					$('#'+page_id+ " .header-title").html(title);
				};
			});
			//$(page_id +" .header-title h3").html(title_text);
		},
		isset							: function(variable){
			 					if(	
										typeof(variable) 	!= "undefined" 
										&& variable 		!== null 
										&& variable 		!= "false"
								){
									return true;
								} else {
									return false;	
								}	
		}
	})

})(jQuery);

$.fn.serializeObject = function(){
								    var o = {};
 								   var a = this.serializeArray();
 								   $.each(a, function() {
 								       if (o[this.name]) {
 								           if (!o[this.name].push) {
 								               o[this.name] = [o[this.name]];
  								          }
								          o[this.name].push(this.value || '');
  								      } else {
  								          o[this.name] = this.value || '';
  								      }
  								  });
 								  return o;
 };
/*!
 * jQuery Form Plugin
 * version: 2.63 (29-JAN-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
 };