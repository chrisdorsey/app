<?php
session_start();

if(!isset($_SESSION['USER_ID'])){
	if(!isset($_COOKIE['USER_ID'])){
		exit("Authorization is required. <a href='../../../index.php'>Login</a>");	
	} else {
		$cookies = $_COOKIE;
		foreach($cookies as $key=>$value){
			$_SESSION[$key] = $value;
		}	
	}
}
$user_id 		= $_SESSION['USER_ID'];
$show_user_id	= $_SESSION['SHOW_USER_ID'];
$level			= $_SESSION['LEVEL'];
$user_type 		= $_SESSION['USER_TYPE'];
$authorized		= $_SESSION['IS_AUTHORIZED'];
$date			= date('Y-m-d');

if(!isset($_SESSION['LEVEL']))			{ exit("Authorization is required. <a href='/index.php'>Login</a>");};
if(!isset($_SESSION['USER_TYPE']))		{ exit("Authorization is required. <a href='/index.php'>Login</a>");};
if(!isset($_SESSION['IS_AUTHORIZED']))	{ exit("Authorization is required. <a href='/index.php'>Login</a>");};
if($authorized 	== 'false') 			{ exit("Your account has been disabled.");};
if($level 		== 0 )					{ exit("Your account has been disabled.");};
if($user_type 	== 'UNAUTHORIZED') 		{ exit("Your account has been disabled.");};

require_once("../../../server/config/config_mysqli.php");
require_once("../../../server/class/core/class.MySqliResultHandler.php");

$sql = "
SELECT
	USER_ID AS 'label',
	USER_ID AS 'value'
FROM
	users
WHERE VISIBLE = 1
ORDER BY USER_ID";
	$result = $db_rxst_conn->query($sql);
	if (!$result) { 
   		 throw new Exception("Database Error [{$db_conn->errno}] {$db_conn->error}"); 
	} 
	$var = new MySqliResultHandler($result);
	$user_select_arr = $var->getAssocArray();
	
?>
<?
$module['page_title'] = "Coupon Module";;





?>
<!doctype html>
<html>
<head>
<!--  META DATA  -->
<meta charset="utf-8">
<meta 			name	=	"viewport" 
				content	=	"width=device-width, 
							minimum-scale=1.0, 
 							maximum-scale=1.0"/>
<meta 			name	=	"apple-mobile-web-app-capable" 
				content	=	"yes" />
<meta 			name	=	"format-detection" 			
				content	=	"telephone=no" />
<meta 			name	=	"apple-mobile-web-app-status-bar-style" 
				content	=	"black" />
<!--  CSS  -->
<link rel="stylesheet" type="text/css" href="/app/css/libs/jquery.mobile-1.3.1.min.css">
<link rel="stylesheet" type="text/css" href="/app/css/libs/jquery.mobile-red-theme.css">
<link rel="stylesheet" type="text/css" href="/app/css/plugins/datebox/jquery.mobile.datebox.min.css">
<link rel="stylesheet" type="text/css" href="/app/css/plugins/datatable/jquery.datatables.css">
<link rel="stylesheet" type="text/css" href="/app/css/app.css">
<link rel="stylesheet" type="text/css" href="/app/css/glyphish/glyphish.file.white.min.css">
<link rel="stylesheet" type="text/css" href="/app/css/glyphish/glyphish.button.white.css">
<link rel="stylesheet" type="text/css" href="/app/css/glyphish/glyphish.styles.css">
<!--<link rel="stylesheet" type="text/css" href="css/module.css">-->
<!--  JS  -->
<script 	src="/app/js/libs/jquery-1.9.1.min.js">			</script>
<script 	src="/app/js/libs/jquery-migrate-1.1.1.min.js">	</script>
<script 	src="/app/js/custom/jquery.dorsey.js">			</script>
<script 	src="/app/js/plugins/jquery.validate.min.js">	</script>
<script 	src="/app/js/plugins/jquery.form.js">			</script>
<script 	src="/app/js/plugins/jquery.datatables.min.js">	</script>
<script 	src="/app/js/app_core.js">						</script>
<script 	src="js/module.js">								</script>
<script 	src="/app/js/libs/jquery.mobile-1.3.1.min.js">	</script>
<script src="/app/js/plugins/jquery.mobile.datebox.min.js">	</script>
<link rel="stylesheet" type="text/css" href="/app/css/plugins/uploadifive/uploadifive.css">
<script src="/app/js/plugins/jquery.uploadifive.min.js"				type="text/javascript"></script>
<!--TEMP: CUSTOM JS-->
<script>
  //reset type=date inputs to text
  $( document ).bind( "mobileinit", function(){
    $.mobile.page.prototype.options.degradeInputs.date = true;
  });

	
</script>

<!--TEMP: CUSTOM STYLE-->
<style>
.progress { position:relative; width:400px; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
.bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
.percent { position:absolute; display:inline-block; top:3px; left:48%; } 
#queue {
	border: 1px solid #E5E5E5;
	height: 200px;
	overflow: auto;
	margin-bottom: 10px;
	padding: 0 3px 3px;
	border-radius: 3px;
	/*width: 300px;*/
	/*display:none;*/
}
</style>
<title><?php echo $module['page_title'] ?></title>
</head>
<body>
<!-- PAGE  -->	
<section 	id="index" 
			data-role="page" 
            data-theme="g"
            data-title = "<?php echo $module['page_title'] ?>" >
		<!--  HEADER  -->
		<header data-role="header" class="page-header"  data-theme="g" >			 
        </header>
		<!--  CONTENT  -->
 	 	<article data-role="content" class="page-content" data-theme="d" > 
        	<nav class="edit-buttons">
                <a 	href		="#file_upload" 
                    data-role	="button" 
                    data-theme	="a"
                    data-inline	="true"
                    data-icon	="plus" 
                    data-mini	="true" 
                    >Upload File
                </a>
            </nav>
            <div class="datatable">
            	<table 	id="datatable_coupon_data_daps"
                		cellpadding="0" 
            			cellspacing="0" 
                    	border="0" 
                    	class="display"></table>
			</div>
        </article>
	<!--  FOOTER -->
		<footer data-role="footer" class="nav-glyphish page-footer" data-position="fixed" data-theme="g"> 
  		</footer>
</section>
<section 	id="file_upload" 
			data-role="page" 
            data-theme="g"
            data-title = "File Upload"
            data-add-back-btn="true" >
		<!--  HEADER  -->
		<header 	 
        			data-role="header" 
                    class="custom-header"  
                    data-theme="a" >			
                	<h3> File Upload </h3>
        </header>
		<!--  CONTENT  -->
 	 	<article 	data-role="content" 
        			class="page-content" 
                    data-theme="d" > 
			<div data-role="collapsible" data-theme="b" data-mini="true">
            	<h3>Upload New Files</h3>	
                <div style="width:50%">
					<form 	id = "frm_file_upload"
                			data-ajax = "false"
                			action = "upload_file.php" 
                			method = "post"
 							enctype = "multipart/form-data">
 						<label for = "file">Choose File to upload:</label>
 						<input 	id 		= "file"
                    		type 	= "file" 
                    		name 	= "file" ><br>
 						<input 	data-role 	= "button"
                    		data-mini 	= "true"
                    		data-inline = "true"
                            data-theme	= "b"
                    		type 	= "submit" 
                            name 	= "upload" 
                            value 	= "Upload">
 					</form>
            	</div>
				<br>
            	<div class="progress">
        			<div class="bar"></div>
        			<div class="percent">0%</div>
    			</div>
            	<div id="status">Status:</div>
           		<br>
            </div> 
             <div data-role="collapsible" data-theme="b" data-mini="true">
             	<h3>Upload Multiple Files</h3>
            	<form 	id="frm_multi_file_upload" 
                		action="upload_file.php" 
                        method="post" 
                        data-ajax="false"
                        style="max-width:600px"
                        data-response_text_selector = "#rma_server_response"
                        data-response_popup_id 		= "#popup_rma_server_response"
                        enctype = "multipart/form-data">

                    <fieldset data-role="fieldcontain" class="ui-grid-a">
           				<div class="ui-block-a">
						<input 	id="frm_multi_file_upload_USER_ID"  
                        		name = "EMAIL" 
                                type="hidden" 
                                value="<?php echo $user_id; ?>"/>
                        </div>        
           			</fieldset>
            <div class="ui-grid-a" >     
				
                <div class="ui-block-a">
				<input 	data-role="none" 
                		id="multi_file_upload" 
                        class="file-upload" 
                        name="file_upload" 
                        type="file" 
                        />
                </div> 
                <div class="ui-block-b">       
                	<div id="queue"></div>
				</div>

           </div>
           		<br><br>
               <a 	class="btn-upload-file"
            		data-role="button"
                	data-theme="b"
					data-inline="true"
                    data-mini="true" 
                	href="#">Upload File
           		</a>
           		</form> 
             
             </div>  
            	<br>
            	<div class="datatable">
            		<table 	id="datatable_uploaded_files"
                		cellpadding="0" 
            			cellspacing="0" 
                    	border="0" 
                    	class="display"></table>
				</div>
        </article>
		<footer data-role="footer" class="nav-glyphish page-footer" data-position="fixed" data-theme="g"> 
  		</footer>
</section>
<section 	id="detail_view" 
			data-role="page" 
            data-theme="g"
            data-title = "Detail View"
            data-add-back-btn="true" >
		<!--  HEADER  -->
		<header 	 
        			data-role="header" 
                    class="custom-header"  
                    data-theme="a" >			
                	<h3> Detail View </h3>
        </header>
		<!--  CONTENT  -->
 	 	<article 	data-role="content" 
        			class="page-content" 
                    data-theme="d" > 
			<div class="detail-data"></div>
        </article>
		<footer 	data-role="footer" 
        			class="nav-glyphish page-footer" 
                    data-position="fixed" 
                    data-theme="g"> 
  		</footer>
</section>

<!--  TEMPLATE  -->	
    <aside id="template" data-role="page" data-theme="" >
		<header data-role="header" class="template-header"  data-theme="f" >			
            <div class="ui-grid-b">
                <div class="ui-block-a" style="width:50%">
                	<a	href="../index.php" 
                    	data-role="button" 
                        rel="external">
                		<img src="../../images/custom/logo/logo.png" alt="logo">
                	</a>
                </div>
                <div class="ui-block-b" style="width:35%">
                	<h3 class = "header-title ui-title" style="font-family:Helvetica,Arial,sans-serif;"> Template Module </h3>
                </div>
                <div class="ui-block-c" style="width:15%">	
           		</div>
           </div>
        </header>
 	 	<article data-role="content" class="page-content" data-theme="d" > 
        </article>
		<footer data-role="footer" class="nav-glyphish template-footer" data-position="fixed" data-theme="g"> 
			<nav	data-theme="a"
                    data-role="controlgroup" 
                   	data-type="horizontal" 
                    class=""
                    style="text-align:center;">
            	<a 	href="../index.php"  
                	data-role="button"  
                    data-theme="a" 
                    rel="external">
                	<div class="glyphish-file house-white border-black"></div>
                    <div >Home</div>
                </a>
				<a 	href="#index"  
                	data-role="button"  
                    data-theme="a" >
					<div class="glyphish-file shipping-crate-white border-black"></div>
					<div >Data</div>
				</a> 
				<a 	href="#file_upload"  
                	data-role="button"  
                    data-theme="a" >
					<div class="glyphish-file shipping-crate-white border-black"></div>
					<div >Files</div>
				</a> 
			</nav>  
  		</footer>
	</aside> 
<!-- END: TEMPLATE  --> 
<script>
(function() {
	var bar = $('.bar');
	var percent = $('.percent');
	var status = $('#status');
	$('#frm_file_upload').ajaxForm({
		beforeSend: function() {
			$.mobile.loading("show");
			status.empty();
			var percentVal = '0%';
			bar.width(percentVal)
			percent.html(percentVal);	
		},
		uploadProgress: function(event, position, total, percentComplete) {
			var percentVal = percentComplete + '%';
			bar.width(percentVal)
			percent.html(percentVal);
		},
		 success: function() {
				var percentVal = '100%';
				bar.width(percentVal)
				percent.html(percentVal);
		}, 
		complete: function(xhr) {
			status.html(xhr.responseText);
			APP.datatables.datatable_uploaded_files.fnClearTable();
			var source_url = 'upload/list_files.php';
			$.getJSON(source_url, function(data){
				var new_file_list = data.aaData;
				APP.datatables.datatable_uploaded_files.fnAddData(new_file_list);
				$.mobile.loading("hide");					
			});
			
		}
	});
})(); 
</script>
</body>
</html>