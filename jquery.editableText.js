/**
 * editableText plugin that uses contentEditable property (FF2 is not supported)
 * Project page - http://github.com/valums/editableText
 * Copyright (c) 2009 Andris Valums, http://valums.com
 * Licensed under the MIT license (http://valums.com/mit-license/)
 */
(function(){
    /**
     * The dollar sign could be overwritten globally,
     * but jQuery should always stay accesible
     */
    var $ = jQuery;
	/**
     * Extending jQuery namespace, we
     * could add public methods here
     */
	$.editableText = {};
    $.editableText.defaults = {		 
		/**
		 * Pass true to enable line breaks.
		 * Useful with divs that contain paragraphs.
		 */
		newlinesEnabled : false,
		/**
		 * Event that is triggered when editable text is changed
		 */
		changeEvent : 'change'
	};   		
	/**
	 * Usage $('selector).editableText(optionArray);
	 * See $.editableText.defaults for valid options 
	 */		
    $.fn.editableText = function(options){
        var options = $.extend({}, $.editableText.defaults, options);
        
        return this.each(function(){
             // Add jQuery methods to the element
            var editable = $(this);
            
			/**
			 * Save value to restore if user presses cancel
			 */
			var prevValue = '';
			
			// Create edit/save buttons
            var buttons = $(
				"<div class='editableToolbar'>" +
            		"<a href='#' class='edit'></a>" +
            		"<a href='#' class='save'></a>" +
            		"<a href='#' class='cancel'></a>" +
            	"</div>")
				.insertBefore(editable);
			
			// Save references and attach events            
			var editEl = buttons.find('.edit').click(function() {
	  			prevValue = editable.html();	/* Every time you start editing, a new version of the data is saved. Useful for ajax websites */
				startEditing();
				return false;
			});							
			
			buttons.find('.save').click(function(){
				stopEditing();
				editable.trigger(options.changeEvent);
				return false;
			});
						
			buttons.find('.cancel').click(function(){
				stopEditing();
				editable.html(prevValue);
				return false;
			});		
			
			// Display only edit button			
			buttons.children().css('display', 'none');
			editEl.show();			
			
			if (!options.newlinesEnabled){
				// Prevents user from adding newlines to headers, links, etc.
				editable.keypress(function(event){
					// event is cancelled if enter is pressed
					return event.which != 13;
				});
			}
			
			/**
			 * Makes element editable
			 */
			function startEditing(){               
                buttons.children().show();
                editEl.hide();
				                
	            editable.attr('contentEditable', true);
			}
			/**
			 * Makes element non-editable
			 */
			function stopEditing(){
				buttons.children().hide();
				editEl.show();				
                editable.attr('contentEditable', false);
			}
        });
    }
})();