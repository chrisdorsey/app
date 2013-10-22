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
		getDefaultUploadifiveOptions	: function(){
			var uploadifive_options = {
                    'auto'            : false,              // Automatically upload a file when it's added to the queue
                    'buttonClass'     : 'btn-select-upload-file',  // A class to add to the UploadiFive button
                    'buttonText'      : 'Select File',      // The text that appears on the UploadiFive button
                    'checkScript'     : false,//'upload/check-exists.php', // Path to the script that checks for existing file names 
                    'dnd'             : true,               // Allow drag and drop into the queue
                    'fileObjName'     : 'file',         // The name of the file object to use in your server-side script
                    'fileSizeLimit'   : 2000,               // Maximum allowed size of files to upload
                    'fileType'        : [	"pdf",
											"jgp",
											"xls",
											"xlsx",
											"png",
											"csv",
											"gif",			
											"application/pdf",
											"application/msword",
											"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
											"application/excel",
											"application/vnd.ms-excel",
											"application/x-excel",
											"application/x-msexcel",
											"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
											"text/plain",
											"application/vnd.oasis.opendocument.text",
											"application/vnd.oasis.opendocument.spreadsheet"
										],// Type of files allowed (image, etc)
                   // 'formData'        : {"test":"testing"
					'formData'			: {},      // Additional data to send to the upload script
                    'height'          : 30,                 // The height of the button
                    'itemTemplate'    : '<div class="uploadifive-queue-item"><span class="filename"></span> | <span class="fileinfo"></span><div class="close"></div></div>',      // The HTML markup for the item in the queue
                    'method'          : 'post',             // The method to use when submitting the upload
                    'multi'           : true,              // Set to true to allow multiple file selections
                    'overrideEvents'  : [],                 // An array of events to override
                    'queueID'         : 'queue',            // The ID of the file queue
                    'queueSizeLimit'  : 15,                  // The maximum number of files that can be in the queue
                    'removeCompleted' : true,              // Set to true to remove files that have completed uploading
                    'simUploadLimit'  : 1,                  // The maximum number of files to upload at once
                    'truncateLength'  : 0,                  // The length to truncate the file names to
                    'uploadLimit'     : 50,                  // The maximum number of files you can upload
                    'uploadScript'    : 'uploadifive.php',  // The path to the upload script
                    'width'           : 150,                // The width of the button
                    // Events
                    'onAddQueueItem'   : function(file) 		{
						var $li = $("<li></li>").append(file.name);
						$('#log ul').append($li);
					}, // Triggered for each file that is added to the queue
                    'onCancel'         : function(file) 		{
						console.log('The file ' + file.name + ' was removed from the queue.');
					}, // Triggered when a file is cancelled or removed from the queue
                    'onCheck'          : function(file, exists) {
						if (exists) {
                				console.log('The file ' + file.name + ' exists on the server.');
            			}
					}, // Triggered when the server is checked for an existing file
                    'onClearQueue'     : function(queue) 		{
						queue.css('border', '2px solid #F00');
					}, // Triggered during the clearQueue function
                    'onDestroy'        : function() 			{
						console.log('You destroyed UploadiFive!');
					}, // Triggered during the destroy function
				    'onError'          : function(errorType) {
						console.log('The error was: ' + errorType);
					},// Triggered when an error occurs
                    'onFallback'       : function() {
						console.log('You have to use the non-HTML5 file uploader.');
					}, // Triggered if the HTML5 File API is not supported by the browser
                    'onInit'           : function() {
						console.log('Add files to the queue to start uploading.');
					},// Triggered when UploadiFive if initialized
                    'onQueueComplete'  : function(data) {
						console.log(data);
					},// Triggered once when an upload queue is done
                    'onProgress'       : function(file, event) {
						//console.log("progess updating");
					},// Triggered during each progress update of an upload
                    'onSelect'         : function() {
						console.log("File Selected");
					},// Triggered once when files are selected from a dialog box
                    'onUpload'         : function(filesToUpload) {
            			if(filesToUpload === 0) {
							alert('You must select at least one file to upload.');
						}
					},// Triggered when an upload queue is started
                    'onUploadComplete' : function(file, data) {
						console.log(data);
					}, // Triggered when a file is successfully uploaded
                    'onUploadFile'     : function(file) {
						console.log('The file ' + file.name + " is uploading");
					},// Triggered for each file being uploaded	
			};
			return uploadifive_options;
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
		resetZeroDateInputs		: function(form_id){
					$(form_id +' input[type = "date"]').each(function(index,element){
						var date_value = $(element).val();
							if(date_value =='0000-00-00'){
								$(element).val("");	
							}
					});	
		},
		loadFormWithObject				: function(form_id,obj){
												$.each(obj,function(key,value){
													$(form_id + ' [name="' + key + '"]').val(value);	
												});
												try{	
													$(form_id + ' select').selectmenu("refresh");
												} catch(e) {
													$(form_id + ' select').selectmenu();	
												};
		},
		loadMobileFormWithObject				: function(form_id,obj){
												$.each(obj,function(key,value){
													$(form_id + ' [name="' + key + '"]').val(value);	
												});
												try{	
													$(form_id + ' select').selectmenu("refresh");
												} catch(e) {
													$(form_id + ' select').selectmenu();	
												};
												try {
													$(form_id + ' input[type="radio"]').checkboxradio("refresh")
												}catch(err){
														$(form_id + ' input[type="radio"]').checkboxradio()
												};
												try {
														$(form_id + ' input[type="checkbox"]').checkboxradio("refresh");
												}catch(err){
														$(form_id + ' input[type="checkbox"]').checkboxradio(); 
												}
												try {
														$(form_id).trigger( "updatelayout" );
												}catch(err){ 
														console.log(err);
												}
		},//END: loadFormWithObject
		showMobileFormButton			: function(form_id,btn_class)	{
			hideAllFormButtons(form_id);
			//$(form_id +' .' + btn_class).parent('div').show().trigger( 'updatelayout' );
			if($.isArray(btn_class)){
				$.each(btn_class, function(index,single_btn_class){
					showButton(form_id,single_btn_class);
				});
			} else {
				showButton(form_id,btn_class);
			}
			showButton(form_id,"cancel");
			
			//$(form_id +' .cancel')		.parent('div').show().trigger( 'updatelayout' );
			function hideAllFormButtons(form_id){
				$(form_id+' button')	.parent('div').hide().trigger( 'updatelayout' );
				console.log("Hiding Buttons");
			};
			function showButton(form_id,btn_class){
				console.log("Showing Button "+ btn_class);
				$(form_id +' .' + btn_class).parent('div').show().trigger( 'updatelayout' );
			};
		},	//END: showFormButton	
		updateMobileFormLayout 					: function (form_id){
				try {
						
						$(form_id + ' select').selectmenu("refresh");
							console.log(form_id + ' select  HAS REFRESHED');
						} 
				catch(err){
						console.log("Couldn't refresh Select, trying to initialize");
						$(form_id + ' select').selectmenu();
				};
				try {$(form_id + ' input[type="radio"]').checkboxradio("refresh")}
				catch(err){
					console.log("Couldn't refresh Radio, trying to initialize");
					$(form_id + ' input[type="radio"]').checkboxradio()
				};
				try {$(form_id + ' input[type="checkbox"]').checkboxradio("refresh");}
				catch(err){
						console.log("Couldn't refresh CheckBox, trying to initialize");
						$(form_id + ' input[type="checkbox"]').checkboxradio(); }
			},
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
		maintainSession: function(url_ping){
				console.log("Initalized Session");
				setInterval(				function(){
					$.get(url_ping,function(){
						console.log("Session pinged");	
					});
				}, 900 * 1000);
		},
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
		},
		removeHash								: function(str)		{
					return str.replace('#','');
		},
		addHash									: function(str)		{
					var unhashed = str.replace('#','');
					var hashed = '#'+ unhashed;
					return hashed;
		},
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