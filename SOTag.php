<?php
/*/
 *
 * SOTag - jQuery Plugin
 * This plugin allowed StackOverflow style tags with descriptions from a database
 *
 * Examples and documentation at: https://github.com/iog3/SOTag
 *
 * Copyright (c) 2015 Adam Tester
 *
 * License:
 * This work is licensed under the MIT License
 * http://opensource.org/licenses/MIT
 *
 * @author Adam Tester eMail: adam@genyx.co.uk | iog3.com
 *
 * SO_processor Class for the ajax calls
 *
/*/
class SO_processor {

    /**
     * Set your database login details in here
     * $db_host           = This is your host, e.g. localhost
     * $db_username       = Your username
     * $db_password       = Your password
     * $db_name           = The database name
     * $db_table          = The table that the tags are stored in
     * $search_min_length = The table that the tags are stored in
     * $max_results       = The maximum number of character required before returning a result
     * $db_connection     = The connection handler, leave this NULL!
     */

    var $db_host     = 'localhost';
    var $db_username = 'root';
    var $db_password = '';
    var $db_name     = 'charity';
    var $db_table    = 'tags';

    var $search_min_length = 2;
    var $max_results = 6;

    var $db_connection = NULL;

    /**
     * Performs the actual query based on the keywords using REGEXP
     * Returns json if success or 0 if no records found
     *
     * @param  string  $keywordsß
     * @return Response
     */
    public function return_search($keywords = '')
    {
        if(strlen($keywords) >= $this->search_min_length) {
            try {
                $this->connect_db();
                $keywords = '^.*'.$keywords.'.*$';
                
                $where = " && type = 'programming' ";
                if(isset($_GET['people'])){
                    $where = " && type = 'people' ";
                }

                $statement = $this->db_connection->prepare("SELECT * FROM " . $this->db_table . " WHERE tag REGEXP ? " . $where . " LIMIT " . $this->max_results);
                $statement->execute(array($keywords));
                $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                if(!empty($rows)) {
                    $this->close_db_connection();
                    return json_encode($rows);
                } else {
                    $this->close_db_connection();
                    return 0;
                }
            }
            catch (PDOException $e) {
                echo $e->getMessage();
                $this->close_db_connection();
            }
        } else {
            return 0;
        }
    }

    /**
     * Connect to the database
     *
     * @return Boolean
     */
    private function connect_db()
    {
        try {
            $this->db_connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_username, $this->db_password);
            return true;
        }
        catch (PDOException $e) {
            echo $e->getMessage();
            $this->db_connection = false;
            return false;
        }
    }

    /**
     * Close connection to the database
     *
     * @return Boolean
     */
    private function close_db_connection()
    {
        $this->db_connection = NULL;
        return true;
    }

}

/**
 * Create SO_processor class and search
 */
if(isset($_REQUEST['q'])) {
    $SO_tag = new SO_processor;
    echo $SO_tag->return_search($_REQUEST['q']);
} else {
    echo 0;
}
