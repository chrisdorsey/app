// JavaScript Document
AJAX_METHODS = {
			default_settings : {
									url	:  CONFIG.server_url + "ping.php",
									ajax: function(){
										return $.getJSON(this.url);
									},
									callback : function(data,textStatus,jqXHR){
													if (data.alive == 1){
														console.log("App is online");
														APP.online  =  true;
														APP.timestamp_server = data.timestamp;	
														APP.timestamp_ipad	 = _timeStamp();
													} else {
														console.log("App is Offline");
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
									},
									fail:function(data,textStatus,jqXHR){
											console.log("App is Offline");
											APP.online = false;
									},
									always:  function(data,textStatus,jqXHR){
											console.log(textStatus);
									}
			},
			checkOnline	: function(url_ping){
							ajax_obj = this.default_settings;
							AJAX_METHODS.processAjaxObject(ajax_obj);	
			},
			getAjaxQueue		: function(settings_arr){
				var default_settings = this.default_settings;
				var queue = [];
				if($.isArray(settings_arr)){
					$.each(settings_arr, function(index,settings){
						var ajax_obj = _getAjaxObject(settings);
						queue.push(ajax_obj)
					});
				} else if ($.isPlainObject(settings_arr)){
						var ajax_obj = _getAjaxObject(settings_arr);
						queue.push(ajax_obj)
				}
				else { return false }
				return queue;
				function _getAjaxObject(settings){
					return $.extend({}, default_settings,settings);		
				}	
			},
			processAjaxQueue 				: function(queue){
				if(!$.isArray(queue)){
					var queue_arr = [];
					queue_arr.push(queue);
					queue = queue_arr;
				};
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
			getTESTAjaxObject : function(){
								ajax_obj = {
								url	:  "http://rxst.pernix-net.com/server/download/json_ipad/dr_object_array.php?TERRITORY_ID=10",
								//url	:  "http://rxst.pernix-net.com/failure_test_404.php",
								ajax		: function(){
									return $.getJSON(this.url)
								},
								callback 	: function(data,textStatus,jqXHR){
										console.log(textStatus);
										var storage_key = 'dr';
										var saveData = function(data){
												console.log("Putting into local Storage key:  " + storage_key);
												LOCAL_STORAGE.localStorageSet(storage_key,data)
												return storage_key;
										};
										var getSavedData = function(storage_key){
												console.log("Getting data "+storage_key+" from local Storage");	
												if(!APP.data){ APP.data = {}; }
												APP.data[storage_key] = LOCAL_STORAGE.localStorageGet(storage_key);
										};
										$.when( saveData() )
											.then ( getSavedData(storage_key) );
								},
								fail		: function(data,textStatus,jqXHR){
									alert("failed : "+ textStatus);
								},
								always		: function(data,textStatus,jqXHR){
										console.log("Always Executed");
								}
							};
							return ajax_obj;
			},
}
