SOTag
=====

Tagging system based on StackOverflows tags with descriptions.

I found myself in need of a tagging system, so I searched far and wide on the internet for a decent one, and I couldn't find one! The style I was going for was the tagging system used on StackOverflow (hence the name SOTag). And searching StackOverflow there are hundreds of questions asking for tagging systems like it!

So I created SOTag, a simple tagging system that only allows a set of tags hat are stored in a database.

####Screenshot

![Screenshot](http://i.imgur.com/t1LubGi.png)

Please note the sample data is taken directly off the StackOverflow website and remains their property.

#### Basic Example

```html
<div class="tag_input">
 <form action="result.php" method="post" id="tag_form">
		<input type="text" value="" name="tag_input_text" id="tag_input_text" class="tag_input_text" />
	</form>
</div>
<input type="button" value="Submit" name="SO_submit" />
```



####TODO

 - Load with options
 - Everything with SO_ prefix
 - Max Tags
 - Better styled close button
 - Newline for lots of tags
