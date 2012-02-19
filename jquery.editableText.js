
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
        var settings = $.extend (
            {
                newlinesEnabled : false,
                changeEvent : 'change',
                textButtons : false
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

            var buttons = $('<div/>').addClass('editableToolbar').insertBefore(editable);

            if( settings.textButtons === true )
            {
                buttons.append( '<a href="#" class="etEdit etText">edit</a>' , '<a href="#" class="etSave etText">save</a>' , '<a href="#" class="etCancel etText">cancel</a>' );
            }
            else
            {
                buttons.append( '<a href="#" class="etEdit etButton"></a>' , '<a href="#" class="etSave etButton"></a>' , '<a href="#" class="etCancel etButton"></a>' );
            }

			// Save references and attach events
			var editEl = buttons.find( '.etEdit' ).click( function()
                {
                    /* Every time you start editing, a new version of the data is saved. Useful for ajax websites */
                    prevValue = editable.html();
				    startEditing();
				    return false;
			    }
            );

			buttons.find( '.etSave' ).click( function()
                {
				    stopEditing();
				    editable.trigger(settings.changeEvent);
				    return false;
			    }
            );

			buttons.find( '.etCancel' ).click( function()
                {
				    stopEditing();
				    editable.html( prevValue );
				    return false;
			    }
            );

			// Display only edit button			
			buttons.children().css('display', 'none');
			editEl.show();

			if ( !settings.newlinesEnabled )
            {
				// Prevents user from adding newlines to headers, links, etc.
				editable.keypress( function( event )
                    {
					    // event is cancelled if enter is pressed
					    return event.which != 13;
				    }
                );
			}

			/**
			 * let's make the element editable
			 */

            var startEditing = function ()
            {
                buttons.children().show();
                editEl.hide();
	            editable.attr('contentEditable', true);
			};

			/**
			 * Let's make the element non-editable
			 */

            var stopEditing = function ()
            {
				buttons.children().hide();
				editEl.show();
                editable.attr('contentEditable', false);
			};

        });
    }
}
)( jQuery );