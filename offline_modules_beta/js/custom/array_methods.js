// JavaScript Document

ARRAY_METHODS = {
		deleteObjectFromArray 	: 	function(arr,search_property,search_value)	{		
			arr = $.grep(arr,function(obj,index){
				return obj[search_property] != search_value;
			});
		},
		replaceObjectInArray 			: function(arr,search_property,search_value,updated_object)	{		
				$.each(arr,function(index){
					var obj = this;
					if(obj[search_property] == search_value){
						arr.splice(index,1,updated_object);
					};
				});
				return arr;
		},
		getObjectFromArray 				: function(arr,search_property,search_value)	{		
			var filtered_arr = $.grep(arr,function(obj,index){
				return obj[search_property] = search_value;
			});
			var return_obj = filtered_arr[0];
			return return_obj;
		},
		getFilteredArrayOfObjects		: function(arr,search_property,search_value){
			var filtered_arr = $.grep(arr,function(obj,index){
				return obj[search_property] = search_value;
			});
			return filtered_arr;
		},
		getPropertyFromObjectInArray 	: function(arr,search_property,search_value,return_property){
				var filtered_arr = $.grep(arr,function(obj,index){
					return obj[search_property] = search_value;
				});
				var first_obj = filtered_arr[0];
				var return_value = first_obj[return_property];
				return return_value;
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
}
