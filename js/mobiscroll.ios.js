(function ($) {

    $.mobiscroll.themes.ios = {
        defaults: {
            dateOrder: 'MMdyy',
            rows: 5,
            height: 30,
            width: 55,
            headerText: false,
            showLabel: false,
            useShortLabels: true,
			/*Custom by Chris Dorsey*/
			display: 'bubble', 
			dateFormat:'yy-mm-dd',
			startYear : new Date().getFullYear() - 1 ,
			endYear : new Date().getFullYear() + 5
			/*END: Custom by Chris Dorsey*/
        }
    };

})(jQuery);
