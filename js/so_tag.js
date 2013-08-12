
var SO_tags_width = 0;

function SO_calculate_tag_widths ()
{
	return $('.selected_tags').width();
}

function SO_resize_input (combined_tag_widths)
{
	var SO_input_width = $('.tag_input').width();	
	$('.tag_input_text').width(SO_input_width - combined_tag_widths - 5);
}

function SO_update_results ()
{
	$.getJSON("SOTag.php", { q: $('.tag_input_text').val() }, function(json_data){	
		var i = 1;
		var clear_html = ' style="clear:both;"';
		var result_object = $('#SO_results');
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
			$('.selected_tags').append('<span class="tag" id="tag_' + $(this).children('.SO_result_id').html() + '">' + $(this).children('.SO_result_title').html() + '<span class="delete-tag">x</span></span>');
			
			// Hide the results box
			var result_object = $('#SO_results');
			result_object.hide();
			result_object.html('');
			
			// Delete Button
			delete_tag();
			
			// Reset the search bar
			$('.tag_input_text').val('')
			SO_resize_input(SO_calculate_tag_widths());
		});
	})
	
	
}

function delete_tag()
{
	// Delete
	$('.delete-tag').click(function() {
		$(this).parent().remove('.tag');
		SO_resize_input(SO_calculate_tag_widths());
	});
}

function SO_init()
{
	// Widths
    var SO_container_width = $('.tag_input').width();
	var SO_input_width = $('.tag_input_text').width();
	
	// Padding for calculation
	var SO_container_padding_left = $('.tag_input').css('padding-left');
	var SO_container_padding_right = $('.tag_input').css('padding-right');
	
	SO_resize_input(SO_calculate_tag_widths());
	
	$('.SO_submit').click(function() {
		var selected_options = [];
		$('.selected_tags > .tag').each(function() { selected_options.push($(this).attr('id')) });
		
		selected_options = selected_options.join(',');
		$('#tag_form').append('<input type="hidden" name="selected_tags" value="' + selected_options + '" />');
		$('#tag_form').submit();
	});
	
	// Now if the user starts typing show results
	$('.tag_input_text').bind('keyup', function(e) {
		SO_update_results();
	});
	
	delete_tag();	
}
$(document).ready(function() {
	SO_init();
});