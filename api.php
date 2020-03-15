<?php
use World\Db;
require_once 'Db.php';
Db::getConnection();

$data = Db::getAllRecords('countries');

/*foreach ($data as $item) {
    echo "<div>";
    echo "<img src='{$item['country_flag_image']}'>";
    echo "<h3>{$item['country_name']}</h3>";
    echo "</div>";
}*/
