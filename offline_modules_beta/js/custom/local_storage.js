// JavaScript Document

LOCAL_STORAGE = {
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
}
