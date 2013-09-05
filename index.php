<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>SOTag</title>

<style type="text/css">
body {
	padding:30px;
	width:960px;
	margin:0 auto;
}

pre {
	border:#ccc 1px solid;
	background:#EFEFEF;
	padding:10px;
}
</style>

<link rel="stylesheet" type="text/css" href="css/so_tag.css?<?php echo rand(0,1000); ?>">
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/so_tag.js?<?php echo rand(0,1000); ?>"></script>
</head>
<body>

<h2>jQuery.SO_Tag</h2>

<p>First a little description about what this plugin is for. This plugin is designed to be used with a backend database full of tags, not to be able to tag whatever you or the user wants to. I may add that feature if people want to but you cannot currently let your users add custom tags using this plugin</p>

<p>It's easy to get started, first include the JavaScript files and the CSS</p>
<pre>
<?php echo htmlentities('<link rel="stylesheet" type="text/css" href="css/so_tag.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/so_tag.js"></script>'); ?>
</pre>

<br />

<p><strong>Simple Example: Start typing some programming words (example: PHP)</strong></p>
<input type="text" value="600_some, 700_example, 800_tags" id="basic_example" />

<br />

<p>You'll notice the default tags are written like this: <em>24_tagname</em>, this is becasue the tags are stored in the database and the first number is relative to the ID of that tag.</p>

<pre>
<?php echo htmlentities('<input type="text" value="1_some, 2_example, 3_tags" id="basic_example" />
<script type="text/javascript">
$(\'#basic_example\').sotag({
	description : true
});
</script>'); ?>
</pre>

<br />

<p><strong>To actually get it to post to the server side just wrap it in a form and add a submit button!</strong></p>
<form action="result.php" method="post">
	<input type="text" value="3_php" name="single_example" id="single_example" />
	<input type="submit" value="Submit" />
</form>

<br />

<pre>
<?php echo htmlentities('<form action="result.php" method="post">
	<input type="text" value="3_php" name="single_example" id="single_example" />
	<input type="submit" value="Submit" />
</form>

<script type="text/javascript">
$(\'#single_example\').sotag({
	description : true
});
</script>'); ?>
</pre>


<br />

<p><strong>Here is an example with multiple tag fields</strong></p>
<form action="result.php" method="post">
	<p>Programming words (example: PHP)</p>
	<input type="text" value="" name="multi_example_programming_tags" class="multi_example_programming_tags" />
	<br />
	<p>People (example: Whitey)</p>
	<input type="text" value="" name="multi_example_people_tags" class="multi_example_people_tags" />
	<input type="submit" value="Submit" />
</form>



<script type="text/javascript">
$('#basic_example').sotag({
	description : true
});

$('#single_example').sotag({
	description : true
});

$('.multi_example_programming_tags').sotag({
	description : true
});

$('.multi_example_people_tags').sotag({
		autocomplete_URL : 'SOTag.php?people'
});
</script>

</body>
</html>