<?php
use World\Db;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'simple_html_dom.php';
require_once 'Db.php';

$baseUrl = "https://33tura.ru";
$parseUrl = "https://33tura.ru/strany";

$html = file_get_html($parseUrl);

$countries = $html->find('.tur-article tr');
unset($countries[0]);
unset($countries[1]);
Db::getConnection();
Db::deleteFromTable('countries');
foreach ($countries as $key => $country) {
    $elm = $country->find('td');

    if (empty(trim($elm[3]->plaintext, "\xA0\xC2"))) continue;

    $imgSrc = $elm[0]->find('img')[0]->src;
    $fileName = explode("/", $imgSrc)[2];
    $imgUrl = $baseUrl . $imgSrc;
    $newImgUrl = './images/' . $fileName;
    $data = [];
    $data[] = $elm[1]->plaintext;
    $data[] = $elm[3]->plaintext;
    $data[] = $elm[4]->plaintext;
    $data[] = $elm[5]->plaintext;
    $data[] = $newImgUrl;

    Db::insertToTable('countries', Db::$columnNames, $data);
//    if (!file_exists($newImgUrl)) {
//        copy($imgUrl, $newImgUrl);
//        chmod($newImgUrl, 0777);
//    }
}