<?php

if(isset($_POST['selected_tags'])){
	
	echo '<pre>var_dump of selected tags, the number refers to the ID in the database:</pre>';
	
	$tags = $_POST['selected_tags'];
	$tags = str_replace('tag_', '', $tags);
	$tags = explode(',', $tags);
	var_dump($tags);

}else{
	echo 'No tags were submitted';
}
?>