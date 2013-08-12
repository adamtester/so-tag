<?php

class SO_processor {
	
	var $db_host     = 'localhost';
	var $db_username = 'root';
	var $db_password = '';
	var $db_name     = 'charity';
	var $db_table    = 'tags';
	
	var $search_min_length = 2;
	var $max_results = 6;
	
	var $db_connection = NULL;
	
	public function return_search ($keywords = '')
	{
		if(strlen($keywords) >= $this->search_min_length) {
			try {
				$this->connect_db();
				$keywords = '^.*'.$keywords.'.*$';
				$statement = $this->db_connection->prepare("SELECT * FROM tags WHERE tag REGEXP ? LIMIT " . $this->max_results);
				$statement->execute(array($keywords));
				$rows = $statement->fetchAll();
				if(!empty($rows)){
					return json_encode($rows);
				}else{
					return 0;
				}
			}
			catch (PDOException $e) {
				echo $e->getMessage();
			}
		}else{
			return 0;
		}
	}
	
	private function connect_db ()
	{
		try {
			$this->db_connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_username, $this->db_password);
		}
		catch (PDOException $e) {
			echo $e->getMessage();
			$this->db_connection = false;
		}
	}
	
	private function close_db_connection ()
	{
		$this->db_connection = NULL;
	}
	
}

$SO_tag = new SO_processor;
if(isset($_REQUEST['q'])){
	echo $SO_tag->return_search($_REQUEST['q']);
}else{
	echo 0;
}
?>