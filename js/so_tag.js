/*/
 * SOTag - jQuery Plugin
 * This plugin allowed StackOverflow style tags with descriptions from a database
 *
 * Examples and documentation at: https://github.com/ludatha/SOTag
 *
 * Copyright (c) 2013 Adam Tester
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
			autocomplete_URL: null,
			additional_class: '',
			allow_edit: true,
			allow_delete: true,
			allow_add: true,
			animation: false,
			animation_speed: 200,
			break_keycodes: [ 13, 186, 188, 32 ],
		}, options || {});
		
		var SO_tags_width = 0;
		var elem_parent = null;

		var SO_calculate_tag_widths = function ()
		{
			return $('.selected_tags').width();
		}
		
		var SO_resize_input = function (combined_tag_widths, new_elem)
		{
			var SO_input_width = new_elem.width();
			elem.width(SO_input_width - combined_tag_widths - 5);
		}
		
		var SO_update_results = function ()
		{			
			$.getJSON("SOTag.php", { q: elem.val() }, function(json_data){	
				var i = 1;
				var clear_html = ' style="clear:both;"';
				var result_object = $('.SO_results');
				result_object.show();
				result_object.html('');
				
				$.each(json_data, function(index, item){
					if(i === 4){
						var clear = clear_html;
					}else{
						var clear = '';
					}
					result_object.append('<div class="SO_result"' + clear + '><span class="SO_result_title tag">' + item.tag + '</span><div class="SO_result_description">' + item.tag_description + '</div><div class="SO_result_id" style="display:none;">' + item.id + '</div>');
					i++;
				});
				result_object.append('<div' + clear_html + '></div>');
				
				
				// If the user clicks on a tag then add it to the box
				$('.SO_result').click(function() {
					// Add the tag
					elem.prev('.selected_tags').append('<span class="tag" id="tag_' + $(this).children('.SO_result_id').html() + '">' + $(this).children('.SO_result_title').html() + '<span class="delete-tag">x</span></span>');
					
					// Hide the results box
					var result_object = $('.SO_results');
					result_object.hide();
					result_object.html('');
					
					// Delete Button
					delete_tag();
					
					// Reset the search bar
					$('.tag_input_text').val('');
					SO_resize_input(SO_calculate_tag_widths(), element_parent);
				});
			})
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
			
			SO_resize_input(SO_calculate_tag_widths(), element_parent);
			
			$('.SO_submit').click(function() {
				var selected_options = [];
				$('.selected_tags > .tag').each(function() { selected_options.push($(this).attr('id')) });
				
				selected_options = selected_options.join(',');
				$('#tag_form').append('<input type="hidden" name="selected_tags" value="' + selected_options + '" />');
				$('#tag_form').submit();
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
			
			// Prepare the html of the input
			element.wrap('<div class="tag_input" />');
			element.addClass('tag_input_text');
			element.before('<div class="selected_tags" />');
			
			var element_parent = element.parent('.tag_input');
			element_parent.after('<div class="SO_results" />');
			
			// Return early if this element already has a plugin instance
			if (element.data('sotag')) return;
			
			// pass options to plugin constructor
			var sotag = new SoTag(this, element_parent, options);
			
			// Store plugin object in this element's data
			element.data('sotag', sotag);
       });
   };
})(jQuery);