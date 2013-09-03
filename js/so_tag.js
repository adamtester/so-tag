/*/
 * SOTag - jQuery Plugin
 * This plugin allowed StackOverflow style tags with descriptions from a database
 *
 * Examples and documentation at: https://github.com/iog3/SOTag
 *
 * Copyright (c) 2013 Adam Tester @ Heliocentrix ltd
 *
 * License:
 * This work is licensed under the MIT License
 * http://opensource.org/licenses/MIT
 *
 * @author Adam Tester eMail: adam@genyx.co.uk | iog3.com
 * @version 1.0.0 (12.2013)
 * Requires: jQuery v1.4+
 *
 * Example of usage:
 *
 * $( "input.tag" ).sotag();
/*/
(function($){
	var SoTag = function(element, element_parent, options)
	{
		/*/
		/* Merge the new options with defaults
		/*/
		var elem = $(element);
		var elem_parent = $(element_parent);
		var obj = this;
		var settings = $.extend(true, {
			autocomplete_URL: 'SOTag.php',
			additional_class: '',
			allow_edit: true,
			allow_delete: true,
			allow_add: true,
			animation: false,
			animation_speed: 200,
			description: false,
			image: false,
			min_width: 50,
			break_keycodes: [ 13, 186, 188, 32 ],
		}, options || {});
		
		var SO_tags_width = 0;

		var SO_calculate_tag_widths = function ()
		{
			return elem.prev('.selected_tags').outerWidth();
		}
		
		var SO_resize_input = function (combined_tag_widths, new_elem)
		{
			/*
			var SO_input_width = new_elem.outerWidth();
			
			// We need to get the css padding
			var SO_padding_total = parseInt(elem.css('padding-left')) + parseInt(elem.css('padding-right'));
			SO_padding_total += parseInt(elem_parent.css('padding-left')) + parseInt(elem_parent.css('padding-right'));
			
			// And the border widths
			SO_padding_total += parseInt(elem_parent.css('border-left-width')) + parseInt(elem_parent.css('border-right-width'));
			
			console.log(SO_input_width + ' | ' + combined_tag_widths + ' | ' +SO_padding_total);
			elem.width(SO_input_width - combined_tag_widths - SO_padding_total);
			
			console.log(elem.width());
			
			if(elem.width() <= settings.min_width){
				console.log("Reset Needed");
				elem.width(SO_input_width - SO_padding_total);
			}
			*/
		}
		
		var SO_update_results = function ()
		{
			$.getJSON(settings.autocomplete_URL, { q: elem.val() }, function(json_data){
				var i = 1;
				var clear_html = ' style="clear:both;"';
				var result_object = elem.parents().next('.SO_results');
				result_object.show();
				
				if(!json_data){
					result_object.html('<strong style="padding:3px; font-size:12px;">There were no results</strong>');
				}else{
					result_object.html('');
				}
				
				$.each(json_data, function(index, item){
					// Break
					if(i === 4){
						var clear = clear_html;
					}else{
						var clear = '';
					}
					
					// Selected
					if(elem_parent.children('#tag_' + item.id).length == 0) {
						var selected = '';
					}else{
						var selected = ' SO_selected';
					}
					
					if(settings.description){
						var description = '<div class="SO_result_description">' + item.tag_description + '</div>';
						result_object.append();
					}else{
						var description = '';	
					}
					
					result_object.append('<div class="SO_result' + selected + '"' + clear + '><span class="SO_result_title tag">' + item.tag + '</span>' + description + '<div class="SO_result_id" style="display:none;">' + item.id + '</div>');
					
					i++;
				});
				result_object.append('<div' + clear_html + '></div>');
				
				var add_new = false;
				
				// If the user clicks on a tag then add it to the box
				$('.SO_result').click(function() {
					// Check if the tag is already in the list
					if(elem_parent.children('#tag_' + $(this).children('.SO_result_id').html()).length == 0) {
						// It doesn't exist
						// Add the tag
						elem.parent('.inputbox').before('<span class="tag" id="tag_' + $(this).children('.SO_result_id').html() + '">' + $(this).children('.SO_result_title').html() + '<span class="delete-tag">x</span></span>');
						
						// Hide the results box
						var result_object = $('.SO_results');
						result_object.hide();
						result_object.html('');
						
						// Reset the search bar
						$(elem).val('');
						SO_resize_input(SO_calculate_tag_widths(), element_parent);
						$(elem).focus();
					}
					
					// Delete Button
					delete_tag();
				});
				
				// Various keys
				$(elem).keyup(function(e){
					if ( $.inArray( e.keyCode, settings.break_keycodes ) > -1 ){
						// We need to assign this as we didnt click on it
						var new_elem = ($('.SO_results').children(":first"));
							
						// Check if the tag is already in the list					
						if($('#tag_' + $(new_elem).children('.SO_result_id').html()).length == 0) {
							// It doesn't exist
							
							// Add the tag
							elem.prev('.selected_tags').append('<span class="tag" id="tag_' + $(new_elem).children('.SO_result_id').html() + '">' + $(new_elem).children('.SO_result_title').html() + '<span class="delete-tag">x</span></span>');
							
							// Hide the results box
							var result_object = elem.parent().next('.SO_results');
							result_object.hide();
							result_object.html('');
							
							// Reset the search bar
							$(elem).val('');
							SO_resize_input(SO_calculate_tag_widths(), element_parent);
						}
						
						// Delete Button
						delete_tag();
					
					} else if (e.keyCode === 8) {
						// Backspace so remove the last tag
						console.log("Removing");
						elem.prev('.selected_tags:last-child').remove();
						
						SO_resize_input(SO_calculate_tag_widths(), element_parent);
					}
					
				});
			});
		}
		
		var delete_tag = function ()
		{
			// Delete
			$('.delete-tag').click(function() {
				$(this).parent().remove('.tag');
				SO_resize_input(SO_calculate_tag_widths(), element_parent);
			});
		}
		
		this.SO_init = function ()
		{			
			// Widths
			var SO_container_width = element_parent.width();
			var SO_input_width = elem.width();
			
			// Padding for calculation
			var SO_container_padding_left = element_parent.css('padding-left');
			var SO_container_padding_right = element_parent.css('padding-right');
			
			//SO_resize_input(SO_calculate_tag_widths(), element_parent);
			
			var form = $(elem).parents('form');
			var submitted = false;
			$(form).submit(function(e) {
				
				/*## TODO: For each input, create a seperate hidden field 
				// Select all the inputs
				var elements = form.find('input[data-sotag!=""]'); 
				
				// Enter each loop
				elements.each(function()
				{
					
					console.log(1);
				
				
				});
				
				/*
				
				
				var selected_options = [];
				
				form.find('.tag').each(function() { selected_options.push($(this).attr('id')) });
				
				selected_options = selected_options.join(',');

				$(form).append('<input type="hidden" name="' + elem.attr("name") + '" value="' + selected_options + '" />');
				
				if(submitted === false){
					$(form).submit();
				}
				submitted = true;
				
				e.preventDefault();*/
			});
			
			// Now if the user starts typing show results
			elem.bind('keyup', function(e) {
				SO_update_results();
			});
			
			delete_tag();	
		}
		
		this.SO_init();		
	};

	$.fn.sotag = function(options)
	{
		return this.each(function()
		{
			var element = $(this);
			var element_id = element.attr("name");
			var selected_options = [];
			
			// Prepare the html of the input
			element.wrap('<div class="tag_input" />');
			element.addClass('tag_input_text');
			element.wrap('<span class="inputbox" />');	
			
			var element_parent = element.parents('.tag_input');
			element_parent.after('<div class="SO_results" />');
			
			// Submitting forms
			var form = $(this).closest('form');
			$(form).submit(function(e) {
				element.prev('.selected_tags').children('.tag').each(function() { selected_options.push($(this).attr('id')) });				
				selected_options = selected_options.join(',');
				$(form).append('<input type="hidden" name="' + element_id + '" value="' + selected_options + '" />');
				
				// Empty the selected_options for the next one
				selected_options.length = 0;
				$(form).unbind().submit();
				e.preventDefault(); 
			});
			
			// Return early if this element already has a plugin instance
			if (element.data('sotag')) return;
			
			// pass options to plugin constructor
			var sotag = new SoTag(this, element_parent, options);
			
			// Store plugin object in this element's data
			element.data('sotag', sotag);
		});
	};
})(jQuery);