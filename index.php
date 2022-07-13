<?php
// // DEBUG ONLY
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

ini_set("error_reporting","E_ALL & ~E_NOTICE");
session_start();
include_once './system/core/controller';
new controller();
