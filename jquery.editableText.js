/**
 * editableText plugin that uses contentEditable property
 * Project page - http://github.com/secrgb/editableText
 * Copyright (c) 2009 Andris Valums, http://valums.com
 * Copyright (c) 2012 Jaan Janesmae, http://janesmae.com
 * Licensed under the MIT license (see the LICENCE file)
 */
( function ( $ )
{
    
	/**
     * Extending jQuery namespace, we
     * could add public methods here
     */
	
    $.editableText = {};

    /**
	 * Usage $('selector).editableText(optionArray);
	 * See $.editableText.defaults for valid options 
	 */		
    
    $.fn.editableText = function ( options )
    {
        var options = $.extend (
            {
                newlinesEnabled : false,
                changeEvent : 'change'
            }, options
            );
        
        return this.each(function ()
            {
             // Add jQuery methods to the element
            var editable = $(this);
            
			/**
			 * Save value to restore if user presses cancel
			 */
			var prevValue = '';
			
			// Create edit/save buttons
            var buttons = $("<div class='editableToolbar'>" + "<a href='#' class='edit'></a>" + "<a href='#' class='save'></a>" + "<a href='#' class='cancel'></a>" + "</div>")
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
}
)( jQuery );