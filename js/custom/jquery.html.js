// JavaScript Document





HTML = {
		getUiGrid		: function(grid_letter){
			var obj = {
						tag : "div",
						attributes:{
								class:"ui-grid-"+grid_letter,
						},
						data :{ 	
						}
			};
			$tag = this.getJqObject(obj);
			return $tag;	
		},
		getUiGridBlock	: function(block_obj){
			var default_obj = {
						tag : "div",
						attributes:{
								class:"ui-block-b",
						},
						data :{ 	
						},
						jq_obj: $('<span>BLOCK CONTENT</span>')
			};
			var obj = $.extend(true,{},default_obj,block_obj);
			$tag = this.getJqObject(obj);
			return $tag;	
		},
		
		getJqObject		: function(obj){
			if($.isset(obj.data)){
				var data = "";
				$.each(obj.data, function(key,value){
					data += ' data-'+key+'="'+value+'" ';
				});
			};
			var $tag = $('<'+obj.tag + data+'></'+obj.tag+'>');
			if($.isset(obj.attributes)){
				$.each(obj.attributes, function(attributeName,value){
					$tag.attr(attributeName,value);
				});
			};
			if($.isset(obj.data)){
				$.each(obj.data, function(key,value){
					$tag.data(key,value);
				});
			};
			if($.isset(obj.jq_obj)){
				$tag.append(obj.jq_obj);
			};
			return $tag;
		},
		getSection		: function(section_obj){
			var default_obj = {
						tag : "section",
						attributes:{
						},
						data :{ 	
								role : "page",
						}
			};
			var obj = $.extend(true,{},default_obj,section_obj);
			$tag = this.getJqObject(obj);
			return $tag;	
		},
		getHeader    	: function(header_obj){
			var default_obj = {
						tag : "header",
						attributes:{
								class:"page-header"
						},
						data :{ 	
								role : "header",
						},
						jq_obj :$('<h3>DEFAULT HEADER</h3>')
			};
			var obj = $.extend(true,{},default_obj,header_obj);
			$tag = this.getJqObject(obj);
			return $tag;
		},
		getArticle   	: function(content_obj){
			var default_obj = {
						tag : "article",
						attributes:{
								class:"page-content"
						},
						data :{ 	
								role : "content",
								//theme: theme,
						},
						jq_obj :$('<p>DEFAULT CONTENT</p>')
			};
			var obj = $.extend(true,{},default_obj,content_obj);
			$tag = this.getJqObject(obj);
			return $tag;
		},
		getFooter    	: function(footer_obj){
			var default_obj = {
						tag : "footer",
						attributes:{
								class:"page-footer"
						},
						data :{ 	
								role : "footer",
								//theme: theme,
						},
						jq_obj :$('<p>FOOTER CONTENT</p>')
			};
			var obj = $.extend(true,{},default_obj,footer_obj);
			$tag = this.getJqObject(obj);
			return $tag;
		},
		getJqmPage		: function(page_obj){
			default_obj = {
						page_id : "index",
						theme	: "a",
						header  : $('<h3>DEFAULT HEADER</h3>'),
						content	: $('<p>DEFAULT CONTENT</p>'),
						footer	: $('<h4>DEFAULT FOOTER</h4>'),		
			}
			var obj = $.extend(true,{},default_obj,page_obj);
			var section_obj = { 
								attributes : {
												id: page_obj.page_id
								},
								data		: {
												theme: page_obj.theme
								}		
			};
			var $section = this.getSection(section_obj);
			var $page = $section
					.append(obj.header)
					.append(obj.content)
					.append(obj.footer);	
			return $page;
		},
		createJQMPages  : function(pages_arr){
			var html = this;
			$.each(pages_arr, function(index,page){
				var page_obj = {};
				page_obj.page_id 	= page.page_id;
				page_obj.theme 		= page.theme;
				page_obj.header 	= html.getHeader(page.header_obj);
				page_obj.content 	= html.getArticle(page.content_obj);
				page_obj.footer 	= html.getFooter(page.footer_obj);
		
				$page = html.getJqmPage(page_obj);
				$('body').append($page);
				//console.log($page);
			});
		},	
		createUiGrids	: 	function(grids_arr){
			var html = this;
			$.each(grids_arr, function(index, grid){
				
				var $grid = html.getUiGrid(grid.grid_letter);
				$.each(grid.grid_blocks, function(index,block_obj){
					 var $block = HTML.getUiGridBlock(block_obj);
					 $grid.append($block)
				});
				$(grid.append_to).append($grid);
			
			
			});
		}
};

TEST_GRID = [
				{
					append_to			: "#index article",
					grid_letter			: "b",
					grid_blocks	: [ 
							{ 
								block_letter 	: "a" ,
								content 		: "CONTENT BLOCK 1"
							},
							{ 
								block_letter : "b" ,
								content : "CONTENT BLOCK 2"
							},
							{ 
								block_letter : "c" ,
								content : "CONTENT BLOCK 3"
							}
					]
				}
]

	

function createJQMPage2 (){
		var page_id = "index";
		var theme = "a";
		//var $section = $('#'+page_id);
		
		var header_obj = {
			jq_obj : $('<h3>SUPPLIED HEADER</h3>'),
			data	:{
						theme:"b",
						position:"fixed"
			}
		};
		var $header = HTML.getHeader(header_obj);
		 var content_obj = {
			jq_obj : $('<p>SUPPLIED CONTENT</p>'),
			data	:{theme:"c"}
		};
		var $article = HTML.getArticle(content_obj);
		 var footer_obj = {
			jq_obj : $('<h4>SUPPLIED FOOTER</h4>'),
			data	:{
						theme:"e",
						position:"fixed"
			}
		};
		var $footer = HTML.getFooter(footer_obj);
		
		var section_obj = {
					attributes : { id : page_id }
		};
		
		var $section = HTML.getSection(section_obj);	
		
		var $page = $section
					.append($header)
					.append($article)
					.append($footer);
		$('body').append($page);
		//console.log($page);				
 };
