<?php
namespace World;

use PDO;

class Db
{
    /** @var PDO $db */
    private static $db = null;
    public static $columnNames = [
        'country_name',
        'country_capital',
        'country_continent',
        'country_code',
        'country_flag_image',
    ];

    public static function getConnection()
    {
        self::$db = new PDO('mysql:host=localhost;dbname=world;charset=utf8', 'login', 'password');
        return self::$db;
    }



    public static function insertToTable($table, $columns, $data)
    {
        $columnsString = implode(',', $columns);
        $dataString = implode("','", $data);

        $sql = "INSERT INTO {$table} ({$columnsString}) VALUES ('{$dataString}')";

        $stm = self::$db->prepare($sql);
        $stm->execute();
    }

    public static function deleteFromTable($table, $id = null)
    {
        if ($id) {
            $sql = "DELETE FORM {$table} WHERE id = {$id}";
        } else {
            $sql = "TRUNCATE TABLE {$table}";
        }

        self::$db->query($sql);
    }

    public static function getAllRecords($table, $pdo_style = PDO::FETCH_ASSOC) {
        $sql = "SELECT * FROM {$table}";
        $query = self::$db->query($sql);
        return $query->fetchAll($pdo_style);
    }

    public static function getJSON() {
        $sql = "SELECT id, country_name, country_capital, country_flag_image FROM countries";
        $query = self::$db->query($sql);
        return json_encode($query->fetchAll(PDO::FETCH_ASSOC));
    }



}