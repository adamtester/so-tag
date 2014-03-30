[![Build Status](https://travis-ci.org/PacificMorrowind/SOTag.svg?branch=Travis)](https://travis-ci.org/PacificMorrowind/SOTag)
jQuery.SO_Tag
=====

Tagging system based on StackOverflows tags with descriptions.

I found myself in need of a tagging system, so I searched far and wide on the internet for a decent one, and I couldn't find one! The style I was going for was the tagging system used on StackOverflow (hence the name SOTag). And searching StackOverflow there are hundreds of questions asking for tagging systems like it!

So I created SOTag, a simple tagging system that only allows a set of tags hat are stored in a database.

First a little description about what this plugin is for. This plugin is designed to be used with a backend database full of tags, not to be able to tag whatever you or the user wants to. I may add that feature if people want to but you cannot currently let your users add custom tags using this plugin

####Screenshot

![Screenshot](http://i.imgur.com/t1LubGi.png)

Please note the sample data is taken directly off the StackOverflow website and remains their property.

#### Basic Example

It's easy to get started, first include the JavaScript files and the CSS

```html
<link rel="stylesheet" type="text/css" href="css/so_tag.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/so_tag.js"></script>
```

And then assign sotag(). You'll notice the default tags are written like this: <em>24_tagname</em>, this is becasue the tags are stored in the database and the first number is relative to the ID of that tag.

```html
<input type="text" value="1_some, 2_example, 3_tags" id="basic_example" />
<script type="text/javascript">
$('#basic_example').sotag({
	description : true
});
</script>
```

To actually get it to post to the server side just wrap it in a form and add a submit button!

```html
<form action="result.php" method="post">
	<input type="text" value="3_php" name="single_example" id="single_example" />
	<input type="submit" value="Submit" />
</form>

<script type="text/javascript">
$('#single_example').sotag({
	description : true
});
</script>
```
####Development

SOTag is set up as a grunt project to automate build tasks (such as creating minified css/js files). It is not required but it will make your life easier if you use it.
You need:

 - [Node.js](http://nodejs.org/) (It is quite easy to install)
 - [Grunt](http://gruntjs.com/getting-started) - even easier to install: just enter this into your command line: ```npm install -g grunt-cli```
 - Next you just have to (from the project dir) run ```npm install```
 - Then run build task(s) as desired (with the command line syntax of ```grunt [buildtask]```)

The build tasks that are currently defined:

- `build_release`: release build, css/js in minified form only
- `build_dev`: dev build, css/js in original form only
- `build_dual`: dual mode build with both minified and original css/js
- `default`: runs both the `build_dev` and `build_release` tasks

####TODO

 - Load with options
 - Everything with SO_ prefix
 - Max Tags
 - Better styled close button
