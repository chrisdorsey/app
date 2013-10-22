// JavaScript Document
APP = {};
TEST = {
		//AJAX TESTs
		processAjaxObject : function(){
					ajax_obj = AJAX_METHODS.getTESTAjaxObject();
					AJAX_METHODS.processAjaxObject(ajax_obj);
		},
		checkOnline : function(){
					var url_ping = CONFIG.server_url + "ping.php";
					//var url_ping = "http://rxst.pernix-net.com/server/ping.php";
					AJAX_METHODS.checkOnline(url_ping);	
		},
		
		getAjaxObject	: function(){
			var settings = {
									callback : function(data,textStatus,jqXHR){
													if (data.alive == 1){
														console.log("App is online TEST");
														APP.online  =  true;
														APP.timestamp_server = data.timestamp;
														APP.timestamp_ipad	 = _timeStamp();
													} else {
														console.log("App is Offline TEST");
														APP.online = false;
													}
													function	_timeStamp(){		
													var date_new = new Date();
													var yyyy = 	date_new.getFullYear();
													var MM	=	pad2(date_new.getMonth()+1);
													var dd =	pad2(date_new.getDate());
													var hh =	pad2(date_new.getHours());
													var mm = 	pad2(date_new.getMinutes());
													var ss = 	pad2(date_new.getSeconds());
													var current_ts = yyyy +'-'+MM +'-'+dd +'-'+hh +'-'+mm +'-'+ss;		
													return current_ts;
												}
													function 	pad2(number){
													return (number < 10 ? '0' : '') + number
												}
									}	
			}
			var ajax_obj = AJAX_METHODS.getAjaxQueue(settings);
			
			AJAX_METHODS.processAjaxQueue(ajax_obj);
		},
		getAjaxQueue    : function(){
			var settings_arr = [
								{
									url			: CONFIG.server_url + "ping.php",
									callback 	: function(data,textStatus,jqXHR){
													if (data.alive == 1){
														console.log("App is online Queue TEST1");
														APP.online  =  true;
														APP.timestamp_server = data.timestamp;
														APP.timestamp_ipad	 = _timeStamp();
													} else {
														console.log("App is Offline  Queue TEST1");
														APP.online = false;
													}
													function	_timeStamp(){		
													var date_new = new Date();
													var yyyy = 	date_new.getFullYear();
													var MM	=	pad2(date_new.getMonth()+1);
													var dd =	pad2(date_new.getDate());
													var hh =	pad2(date_new.getHours());
													var mm = 	pad2(date_new.getMinutes());
													var ss = 	pad2(date_new.getSeconds());
													var current_ts = yyyy +'-'+MM +'-'+dd +'-'+hh +'-'+mm +'-'+ss;		
													return current_ts;
												}
													function 	pad2(number){
													return (number < 10 ? '0' : '') + number
												}
									}	
								},
								{
									url			: CONFIG.server_url + "ping.php",
									callback 	: function(data,textStatus,jqXHR){
													if (data.alive == 1){
														console.log("App is online Queue TEST2");
														APP.online  =  true;
														APP.timestamp_server = data.timestamp;
														APP.timestamp_ipad	 = _timeStamp();
													} else {
														console.log("App is Offline  Queue TEST2");
														APP.online = false;
													}
													function	_timeStamp(){		
													var date_new = new Date();
													var yyyy = 	date_new.getFullYear();
													var MM	=	pad2(date_new.getMonth()+1);
													var dd =	pad2(date_new.getDate());
													var hh =	pad2(date_new.getHours());
													var mm = 	pad2(date_new.getMinutes());
													var ss = 	pad2(date_new.getSeconds());
													var current_ts = yyyy +'-'+MM +'-'+dd +'-'+hh +'-'+mm +'-'+ss;		
													return current_ts;
												}
													function 	pad2(number){
													return (number < 10 ? '0' : '') + number
												}
									}	
								},
								{
									url			: CONFIG.server_url + "ping.php",
									callback 	: function(data,textStatus,jqXHR){
													if (data.alive == 1){
														console.log("App is online Queue TEST3");
														APP.online  =  true;
														APP.timestamp_server = data.timestamp;
														APP.timestamp_ipad	 = _timeStamp();
													} else {
														console.log("App is Offline  Queue TEST3");
														APP.online = false;
													}
													function	_timeStamp(){		
													var date_new = new Date();
													var yyyy = 	date_new.getFullYear();
													var MM	=	pad2(date_new.getMonth()+1);
													var dd =	pad2(date_new.getDate());
													var hh =	pad2(date_new.getHours());
													var mm = 	pad2(date_new.getMinutes());
													var ss = 	pad2(date_new.getSeconds());
													var current_ts = yyyy +'-'+MM +'-'+dd +'-'+hh +'-'+mm +'-'+ss;		
													return current_ts;
												}
													function 	pad2(number){
													return (number < 10 ? '0' : '') + number
												}
									}	
								},
			
			];
			
			var queue = AJAX_METHODS.getAjaxQueue(settings_arr);
			AJAX_METHODS.processAjaxQueue(queue);
		},
		
		
		
		
		
		
		//ARRAY TESTS
		
		
	
	
}
