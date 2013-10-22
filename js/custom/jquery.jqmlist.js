//JQM LISTWIDGET

LIST = {		
		getLiHtml						: function(/*li_text,href,li_data_record*/)	{
			
			var li_text = arguments[0], href , li_data_record ;
			if (arguments.length == 1){
				var href_html = '<a href="#">' + li_text + '</a>';
				return '<li class = "generated">' + href_html + '</li>';
			} else if (arguments.length == 2){
				href	= arguments[1]
				var href_html = '<a href="' +href+ '">' + li_text + '</a>';
				return '<li class = "generated">' + href_html + '</li>';
			} else if (arguments.length == 3){
				href			= arguments[1];
				li_data_record 	= arguments[2];
				var href_html = '<a href="' +href+ '">' + li_text + '</a>';
				return '<li class = "generated" data-record="' + li_data_record + '">' + href_html + '</li>';
			}
		},	//END: 
		getLiDividerHtml				: function(/*divider_text,divider_theme*/)	{
					var divider_text = arguments[0], divider_theme;
					if (arguments.length == 1){
						return '<li data-role="list-divider">' + divider_text + '</li>';
					} else {
						return '<li data-role="list-divider" data-divider-theme="'+ divider_theme +'">' + divider_text + '</li>';
					}
		},	//END: 
		getBlankLiHtml					: function()								{
					return "<li> No records returned. </li>";
		},	//END: getBlankHtml
		getAsideHtml					: function(aside_text)						{
					return '<span class="ui-li-aside">'+aside_text+'</span>';
		},	//END: 
		getCountHtml					: function(count_text)						{
						return '<span class="ui-li-count">'+count_text+'</span>';
		},	//END: 
		populateAdvancedDividedListHtml	: function(obj)								{
			var LIST = this;
				var li_array 			= obj.li_array;
				var list_id 			= obj.list_id;
				var divider_field 		= obj.divider_field;
				var li_field			= obj.li_field;
				var li_class			= obj.li_class;
				var data_record_field	= obj.data_record_field;
				//alert(li_data_record);
				var href			= obj.href;
				//var count 			= li_array.length;
				if($.isArray(li_array)){ var count = li_array.length } else { var count = 0};
				if (count == 0){
								$(list_id)	.html(LIST.getBlankLiHtml())
											.listview('refresh');
								}
				else { 
					$(list_id).html(""); 
				}
				if ($.isArray(li_array) === true) {
					var divider = "";	
					//SORT THE ARRAY
					var object_sort_field = divider_field;
					var sorted_array = $.sortArrayOfObjects(li_array,object_sort_field);
					$.each(sorted_array,function(index,value){
						var object 			= this;
						var divider_text 	= object[divider_field];
						var li_text 		= object[li_field];
						//console.log(li_text);
						var li_class_assign	= li_class;
						var li_data_record 	= object[data_record_field];
						if (divider == divider_text){
							var li = LIST.getLiHtml(li_text,href,li_data_record)
							//console.log( "li is : " +li);
						}
						else {
							var li = LIST.getLiDividerHtml(divider_text);
							li += LIST.getLiHtml(li_text,href,li_data_record);
							divider = divider_text;
						};
					$(list_id).append(li);
					if (index == count - 1) { $(list_id).listview('refresh'); /*alert("done")*/};//alert(list_html)};//
				});	//END:each
			}//END if
		},	//END: 	
};//END: LIST