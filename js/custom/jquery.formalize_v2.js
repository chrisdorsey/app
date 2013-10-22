// Chris Dorsey 2012-10-15 9:08
//jquery.formalize.js

/*************************EXAMPLE*********************************************
		var	form_user = { 
							form_id 		: "frm_user",
							elements 		: [
								{ 	
									type			: "text",
									display			: "true",
									label_text		: "USER_ID",
									label_visible	: "true",
									attributes		: {
										name 			: "USER_ID",
										class			: "required",
										required		: "required",
										placeholder		: "required",
										value			: ""
									},
									data			:	{mini : "true"}
								},
								{ 	
									type			: "text",
									label_text		: "PASSWORD",
									//label_visible	: "true",
									attributes		: {
										name 			: "PASSWORD",
										class			: "required",
										required		: "required",
										placeholder		: "required",
										//value			: ""
									},
									data			:	{mini : "true"}
								},
								{ 	type			: "select",
									display			: "true",
									label_text		: "VISIBLE",
									label_visible	: "true",
									attributes		: {
														name			: "VISIBLE",
														required		: "required",
									},
									data			: {	mini 		: "true",
														theme		: "b",		
									},
									options	: [	{label:"SELECT..."},
												{label:"YES", value:"1", selected: "selected"},
												{label:"NO", value:"0"}
												
												]
								},
								{ 	type			: "select",
									display			: "true",
									label_text		: "LEVEL",
									label_visible	: "true",
									attributes		: {
														name			: "LEVEL",
														required		: "required",
									},
									data			: {	mini 		: "true",
														theme		: "b",		
									},
									options	: [	{label:"SELECT..."},
												{label:"Sales Rep", value:"1", selected: "selected"},
												{label:"Manager", value:"3"},
												{label:"Admin", value:"5"}
												
												]
								},

								{ 	tag			: "input",
									type		: "radio", //or checkbox... both will work
									horizontal		: "true",
									legend			: "LEGEND",
									name 			: "PR_ORDER",
									mini 			: "true",
									theme			: "b",
									radio_inputs	: [{
															label_text	:"P", 
															value		:"P",
															checked:"checked"
														},
														{
															label_text	:"S", 
															value		:"S",
															//checked:"checked"
														},
														{
															label_text	:"T", 
															value		:"T",
															//checked:"checked"
														}
														]
								},
							],
							form_buttons 	: [
								{
								type		: "cancel",
								button_text	: "CANCEL",
								//mini		: "true",
								//inline		: "true",	
								icon		: "minus",
								theme		: "e"
								},
								{
								type		: "insert",
								button_text	: "INSERT",
								//mini		: "true",
								//inline		: "true",	
								icon		: "plus",
								theme		: "b"
								},
								{
								type		: "update",
								button_text	: "UPDATE",
								//mini		: "true",
								//inline		: "true",	
								icon		: "gear",
								theme		: "b"
								},
								{
								type		: "delete",
								button_text	: "DELETE",
								//mini		: "true",
								//inline		: "true",	
								icon		: "delete",
								theme		: "f"
								}
							]
			}
		$.formalize(form_user);
***************************************************************************/		
		

/**** JQUERY formalize PLUGIN REGISTERED BELOW **********************************************/
(function($) {
	$.extend({
		formalize	: function(form_config){
	var FORMALIZE = {
		default_buttons 	: [
								{
								name		: "cancel",
								button_text	: "CANCEL",
								icon		: "minus",
								theme		: "e"
								},
								{
								name		: "insert",
								button_text	: "INSERT",	
								icon		: "plus",
								theme		: "b"
								},
								{
								name		: "update",
								button_text	: "UPDATE",	
								icon		: "gear",
								theme		: "b"
								},
								{
								name		: "delete",
								button_text	: "DELETE",
								display		: "false",
								icon		: "delete",
								theme		: "f"
								}
							],
		default_input		: {
									display			: "true",
									label_text		: "TEST",
									label_visible	: "true",
									attributes		: {
										name			: "TEST",
										value			: ""
									},
									data			:	{mini : "true"}
		},
		setFieldId		: function(form_id,form_field){
					if (form_field.type == "radio" || form_field.type == "checkbox"){
						form_field.id		= form_id + "_" + form_field.name;
					} else {
						form_field.id 		= form_id + "_" + form_field.attributes.name;
					};	
		},
		createForm 			: function(form_config)				{
			var formalize = this;
			var form_inputs_html; 
			var form_id = form_config.form_id;
			var action =  form_config.action;
			var data	= form_config.data;
			var form_html = $('<div>');
			$.each(form_config.elements, function( index, form_field ){
				formalize.setFieldId(form_id,form_field);
				switch(form_field.type)
 						{
						 	case 'button':
								form_field.tag = 'button';
								var $field = Button();
   								break;
 							case 'checkbox':
  								form_field.tag = 'input';
  								var $field = Checkbox();
   								break;
							case 'color':
							  	form_field.tag = 'input';
  								var $field = Color();
								break;
 							case 'date':
								form_field.tag = 'input';
  								var $field = DateField();
   								break;
						 	case 'datetime':
								form_field.tag = 'input';
  								var $field = DateTime();
   								break;
							case 'email':
								form_field.tag = 'input';
  								var $field = Email();
   								break;
							case 'hidden':
								form_field.tag = 'input';
  								var $field = Hidden();
   								break;
 							case 'month':
								form_field.tag = 'input';
  								var $field = Month();
   								break;
						 	case 'number':
								form_field.tag = 'input';
  								var $field = NumberField();
   								break;
 							case 'password':
								form_field.tag = 'input';
  								var $field = Password();
   								break;
						 	case 'range':
								form_field.tag = 'input';
  								var $field = Range();
   								break;
						 	case 'radio':
								form_field.tag = 'input';
  								var $field = Radio();
   								break;
						 	case 'reset':
								form_field.tag = 'input';
  								var $field = Reset();
   								break;
							case 'search':
								form_field.tag = 'input';
  								var $field = Search();
   								break;
						 	case 'select':
  								form_field.tag = 'select';
								var $field = Select();
   								break;
						 	case 'submit':
								form_field.tag = 'input';
  								var $field = Submit();
   								break;
							case 'text':
								form_field.tag = 'input';
  								var $field = Text();
								break;
							case 'textarea':
  								form_field.tag = 'textarea';
								var $field = TextArea();
								break;
 							case 'time':
								form_field.tag = 'input';
  								var $field = Time();
   								break;
							case 'url':
								form_field.tag = 'input';
  								var $field = Url();
   								break;
							case 'week':
								form_field.tag = 'input';
  								var $field = Week();
   								break;
 							default:
								form_field.tag = 'input';
   								var $field = getInput();
 						}
				return $field;

					var container_html 	= FORMALIZE.createContainer(form_field.class);
					var label_html = FORMALIZE.createLable(input_id,form_field);
					if (
								form_field.type == "text" 		||
								form_field.type == "password" 	||
								form_field.type == "email" 		||
								
								form_field.type == "number"
						){
							var input_html = FORMALIZE.createInput(input_id,form_field)
							container_html.append(label_html);
							container_html.append(input_html);
					}
					if ( form_field.type == "date" ){
							console.log("activating Datebox");
							var input_html = FORMALIZE.createDateInput(input_id,form_field)
							container_html.append(label_html);
							container_html.append(input_html);
							var datebox_options = {mode : "calbox"};
							var json = JSON.stringify(datebox_options);
							$('#input_id').data('options',json);
							
								
					}
					if ( form_field.type == "hidden"){
						var input_html = FORMALIZE.createInput(input_id,form_field)
						container_html.append(label_html).addClass("ui-hidden-accessible");
						container_html.append(input_html).attr("type","hidden");
					}
					if (form_field.type == "select"){
						var input_html = FORMALIZE.createSelect(input_id,form_field)
						container_html.append(label_html);
						container_html.append(input_html).selectmenu({mini:true})
					}
					if ( form_field.type == "radio"){
						var input_html = FORMALIZE.createRadioGroup(input_id,form_field)
						container_html.append(input_html);
					}
					if (form_field.type == "checkbox"){
						var input_html = FORMALIZE.createRadioGroup(input_id,form_field)
						container_html.append(input_html);
					}
					if(form_field.label_visible == false || form_field.label_visible == "false" ){container_html.addClass("ui-hide-label") };
					form_html.append(container_html);
			});
			if(form_config.form_buttons.length > 0){ var buttons = form_config.form_buttons }
			else { var buttons = this.default_buttons; };
			var button_container_html = FORMALIZE.createContainer();
			$.each(	buttons, function(){
							var button_options = this;
							var button_html = FORMALIZE.createButton(form_id,button_options);
							button_container_html.append(button_html)
			});
			$(form_html).append(button_container_html);
			$("#" +form_id).append(form_html).trigger("updatelayout");
			if(this.isset(data)){
				this.setData(form_id,data);
			}
			if(this.isset(action)){
				$('#'+form_id).attr('action',action);
			}

			
			
		},
		DataString		: function(data_obj){
			var data_attr_str = "";
			$.each(data_obj,function( key , value ){
					data_attr += ' data-'+key+' = "'+value+'" ';
			});	
			return data_attr_str;
		},
		addAttributes	: function(attributes_obj){
			$.each(attributes_obj,function( key , value ){
					$this.attr(key,value);
			});
			return $this;
		},
		createInput 		: function(input_id,form_field)		{
			
			var default_input = this.default_input;
			form_field = $.extend(true,{},default_input,form_field);
			var data_attr = this.DataString(form_field.data);
			var input_html = $('<input type = "'+ form_field.type +'" '+ data_attr +' />').attr("id",input_id);
			//console.log(input_html);
			$.each(form_field.attributes,function( key , value ){
					input_html.attr(key,value);
			});
			return input_html;			
		},
		createDateInput 	: function(input_id,form_field)		{
			console.log("Creating Date Input");
			var default_input = this.default_input;
			form_field = $.extend(true,{},default_input,form_field);
			var data_attr = ' data-role = "datebox" ';
			data_attr	+= ' data-options = \'{"mode":"datebox"}\' ';
			//var json = JSON.stringify(datebox_options);
			//data_attr += ' data-options = '+datebox_options+' ';
			$.each(form_field.data,function( key , value ){
					//console.log(data_attr);
					data_attr += ' data-'+key+' = "'+value+'" ';
					//console.log(data_attr);
			});
			//var input_html = $('<input type = "'+ form_field.type +'" '+ data_attr +' />').attr("id",input_id)
			var input_html = $('<input type = "'+ form_field.type +'" '+ data_attr +' />').attr("id",input_id)
			//console.log(input_html);
			$.each(form_field.attributes,function( key , value ){
					input_html.attr(key,value);
			});
			return input_html;			
		},
		createSelect 		: function(input_id,form_field)		{
			var data_attr = '';
			$.each(form_field.data,function( key , value ){
					data_attr += ' data-'+key+' = "'+value+'" ';
			});
			var select_html = $('<select ' +data_attr + '></select>').attr("id",input_id)
			$.each(form_field.attributes,function( key , value ){
					select_html.attr(key,value);
			});	
			$.each(form_field.options, function(){
				var option = this;
				var options_html = $('<option>').html(option.label);
					$.each(option,function(key,value){
							options_html.attr(key,value);	
					});
				select_html.append(options_html);		
			});
			return select_html;			
		},
		createLable 		: function(input_id,form_field)		{
			var label_html = $('<label>')
						.attr("for",input_id)
						.html(form_field.label_text);
			if(form_field.label_visible == "false" || form_field.label_visible === false  ){
					label_html.addClass("ui-hidden-accessible");	
			}
			return label_html;			
		},
		createContainer 	: function(field_class)				{
					if (!$.isset(field_class)){ field_class = "database-field";};
					var container_html = $('<div data-role="fieldcontain" class="'+field_class+'"></div>');
					return container_html;
		},
		createButton		: function(form_id,button_options)	{
					var default_options = {
								//type			: "cancel",
								//button_text	: "CANCEL",
								mini		: "true",
								inline		: "true",	
								theme		: "b"
								}
					var button_options = $.extend({},default_options,button_options);			
					var button_id 		= "btn_"+form_id +"_"+button_options.name;
					var button_attr 	= 	' data-role="button" ';
						button_attr			+= 	' data-inline="'+button_options.inline	+'" ';
						button_attr			+= 	' data-mini="'	+button_options.mini	+'" ';
						button_attr			+= 	' data-theme="'	+button_options.theme	+'" ';
						if (this.isset(button_options.icon)){
							button_attr			+= 	' data-icon="'	+button_options.icon	+'" ';
						}
					var button_html = $('<button '+ button_attr  +'>')
													.attr("id",button_id)
													.addClass(button_options.name)
													.html(button_options.button_text);							
					return button_html;							
		},
		createLegend		: function(legend_text)				{
					var legend = $('<legend></legend>').html(legend_text);
					return legend;	
		},
		createRadioGroup 	: function(input_id,form_field)		{
					var default_options = {
								legend		: "Choose One",
								mini		: "true",
								horizontal	: "true",	
								theme		: "b"
								};
					var radio_options = $.extend({},default_options,form_field);
					var container_attr 	= 	' data-role="controlgroup" '; 
						container_attr 	+=  ' data-theme="'+ radio_options.theme +'" ';
						container_attr 	+= 	' data-mini="'+ radio_options.mini +'" ';
					if (radio_options.horizontal == "true"){
						container_attr 	+= ' data-type="horizontal" ';
					} 
					var radio_container = $('<fieldset '+ container_attr +' ></fieldset>');
					var legend 			= this.createLegend(radio_options.legend);
					radio_container.append(legend);
					$.each(radio_options.radio_inputs,function(index,input){
								var name = radio_options.name
								var id = input_id +"_"+index;
								var label = $('<label></label>')
															.attr("for",id)
															.html(this.label_text);
								var input = $('<input/>')
													.attr("type",form_field.type)
													.attr("id",id)
													.attr("name",name)
													.val(this.value);
								if( JQFORM.isset(this.checked) ){
									input.attr("checked","checked");	
								}						
								radio_container.append(input).append(label);
								radio_container.find('input').checkboxradio();		 	
					});	
					return radio_container;	
		},
		isset				: function(variable)				{
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
	};
	FORMALIZE.createForm(form_config);	
		}
	})

})(jQuery);
