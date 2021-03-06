/*
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
 */
/*jslint browser: true */
/*jslint plusplus: true */
/*global jQuery */
/*global $ */
/*jslint todo: true */

(function ($) {
    'use strict';
    var SoTag = function (element, element_parent, options) {
        /*
         * Merge the new options with defaults
         */
        var elem = $(element),
            elem_parent = $(element_parent),
            //obj = this,
            settings = $.extend(true, {
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
            }, options || {}),

            /*SO_tags_width = 0,

            SO_calculate_tag_widths = function () {
                return elem.prev('.selected_tags').outerWidth();
            },*/

            delete_tag = function () {
                // Delete
                $('.delete-tag').click(function () {
                    $(this).parent().remove('.tag');
                });
            },

            so_update_results = function () {
                $.getJSON(settings.autocomplete_URL, { q: elem.val() }, function (json_data) {
                    var clear_html = ' style="clear:both;"',
                        result_object = elem.parents().next('.SO_results');
                        //add_new = false;
                    result_object.show();

                    if (!json_data) {
                        result_object.html('<strong style="padding:3px; font-size:12px;">There were no results</strong>');
                    } else {
                        result_object.html('');
                    }

                    $.each(json_data, function (index, item) {
                        // Break
                        var clear, selected, description;
                        if (((index + 1) % 4) === 0) {//every fourth result option
                            clear = clear_html;
                        } else {
                            clear = '';
                        }

                        // Selected
                        if (elem_parent.children('#tag_' + item.id).length === 0) {
                            selected = '';
                        } else {
                            selected = ' SO_selected';
                        }

                        if (settings.description) {
                            description = '<div class="SO_result_description">' + item.tag_description + '</div>';
                            result_object.append();
                        } else {
                            description = '';
                        }

                        result_object.append('<div class="SO_result' + selected + '"' + clear + '><span class="SO_result_title tag">' + item.tag + '</span>' + description + '<div class="SO_result_id" style="display:none;">' + item.id + '</div>');
                    });
                    result_object.append('<div' + clear_html + '></div>');
                    // If the user clicks on a tag then add it to the box
                    $('.SO_result').click(function () {
                    // Check if the tag is already in the list
                        if (elem_parent.children('#tag_' + $(this).children('.SO_result_id').html()).length === 0) {
                            // It doesn't exist
                            // Add the tag
                            elem.parent('.inputbox').before('<span class="tag" id="tag_' + $(this).children('.SO_result_id').html() + '">' + $(this).children('.SO_result_title').html() + '<span class="delete-tag">x</span></span>');

                            // Hide the results box
                            result_object = $('.SO_results');
                            result_object.hide();
                            result_object.html('');

                            // Reset the search bar
                            $(elem).val('');
                            $(elem).focus();
                        }

                        // Delete Button
                        delete_tag();
                    });

                // Various keys
                    $(elem).keyup(function (e) {
                        if ($.inArray(e.keyCode, settings.break_keycodes) > -1) {
                            console.log(131);
                            // We need to assign this as we didnt click on it
                            var new_elem = ($('.SO_results').children(":first"));

                            // Check if the tag is already in the list
                            if ($('#tag_' + $(new_elem).children('.SO_result_id').html()).length === 0) {
                                // It doesn't exist

                                // Add the tag
                                elem.prev('.selected_tags').append('<span class="tag" id="tag_' + $(new_elem).children('.SO_result_id').html() + '">' + $(new_elem).children('.SO_result_title').html() + '<span class="delete-tag">x</span></span>');

                                // Hide the results box
                                result_object = elem.parent().next('.SO_results');
                                result_object.hide();
                                result_object.html('');

                                // Reset the search bar
                                $(elem).val('');
                            }

                            // Delete Button
                            delete_tag();
                        } else if (e.keyCode === 8) {
                            // Backspace so remove the last tag
                            if (elem.closest('.tag').hasClass('tag-highlight-delete')) {
                                // Delete the tag
                                elem.closest('.tag').remove();
                            } else {
                                // Add the delete class
                                elem.closest('.tag').addClass('tag-highlight-delete');
                            }
                        }
                    });
                });
            };

        this.SO_init = function () {
            var tags, form,
                submitted = false;
            if (elem.val().length > 0) {
                // Convert default tags to actual tags
                tags = elem.val();

                // Split them up, accounting for all types
                tags = tags.replace(", ", ",");
                tags = tags.replace("; ", ",");
                tags = tags.replace(";", ",");
                tags = tags.replace(" ", "");
                tags = tags.replace("   ", "");

                // CSV to array
                tags = tags.split(",");

                tags.forEach(function (tag) {
                    // Get id and name
                    tag = tag.split("_");

                    var tag_id = tag[0],
                        tag_name = tag[1];

                    // Add the tag
                    elem.parent('.inputbox').before('<span class="tag" id="tag_' + tag_id + '">' + tag_name + '<span class="delete-tag">x</span></span>');
                });

                // Reset the search bar
                $(elem).val('');
            }


            form = $(elem).parents('form');
            $(form).submit(function (e) {

                //## TODO: For each input, create a seperate hidden field
                // Select all the inputs
                var elements = form.find('input[data-sotag!=""]'),
                    // Selected options holds the options while being processed
                    selected_options = [];

                // Enter each loop
                elements.each(function () {
                    elem.parents('.tag_input').children('.tag').each(function () { selected_options.push($(this).attr('id')); });

                    selected_options = selected_options.join(',');

                    $(form).append('<input type="hidden" name="' + elem.attr("name") + '" value="' + selected_options + '" />');

                    // Reset the array
                    selected_options = [];
                });

                // Submit the form
                if (submitted === false) {
                    $(form).submit();
                }
                submitted = true;

                e.preventDefault();
            });

            // Now if the user starts typing show results
            elem.bind('keyup', function () {
                so_update_results();
            });

            delete_tag();
        };

        this.SO_init();
    };

    $.fn.sotag = function (options) {
        return this.each(function () {
            var element = $(this),
                element_id = element.attr("name"),
                selected_options = [],
                element_parent,
                form,
                sotag;

            // Prepare the html of the input
            element.wrap('<div class="tag_input" />');
            element.addClass('tag_input_text');
            element.wrap('<span class="inputbox" />');

            // Default CSS of the element
            element.attr('autocomplete', 'off');

            element_parent = element.parents('.tag_input');
            element_parent.after('<div class="SO_results" />');

            // Submitting forms
            form = $(this).closest('form');
            $(form).submit(function (e) {
                element.children('.tag').each(function () { selected_options.push($(this).attr('id')); });
                selected_options = selected_options.join(',');
                $(form).append('<input type="hidden" name="' + element_id + '" value="' + selected_options + '" />');

                // Empty the selected_options for the next one
                selected_options.length = 0;
                $(form).unbind().submit();
                e.preventDefault();
            });

            // Return early if this element already has a plugin instance
            if (element.data('sotag')) { return; }

            // pass options to plugin constructor
            sotag = new SoTag(this, element_parent, options);

            // Store plugin object in this element's data
            element.data('sotag', sotag);
        });
    };
}(jQuery));
