// JavaScript Document

CONFIG = {
				server_url 	: "http://rxst.pernix-net.com/server/",
				features	: {
								call_notes 			: false,
								promo_items			: false,
								spend				: false,
								email_receipt		: true,
								controlled_orders 	: false,
								clinics				: true,
								routes				: false,
								market_data			: false,
								dea_validation		: false,
								no_signature_calls	: true
				},
				call_validation :{
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
				rules : {
							state_license :{
											check_validated 	: true,
											check_expired		: true,
											check_one_time		: true,		
							},
							dea_number	: {
											check_valid_number 	: true,
											check_validated		: true,
											check_expired		: true	
								
							},
							samples		: {
											require_signature		: true,
											require_detail			: true,	
											require_state_license 	: true,
											quantity_limit			: false,
							},
							address		: {
											edit_primary_address	: false,
											edit_primary_zipcode	: false
							},
							drs			: {
											set_visibility		: true,
											user_defined_targets: true,
												
							},
							inventory	: {
											quantity_visible		: false,
											transfer_non_district 	: false,	
							},
							selectors_visible :[
												
								
							]
				}	
}