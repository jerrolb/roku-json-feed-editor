<?php
    $authToken = "rxiWSWuP1pRlaG7OGOJBlR6IsojGPejO5ERM2h1xsIHjuoYuNqh3Lpx1cSfrDoxR";
    $userToken = htmlspecialchars($_GET["token"]);

    if ($authToken != $userToken) {
        exit();
    }

    $hostname="107.180.51.242";
    $username="appletvclient";
    $password="D8NbH3XnyF4cx2P";
    $dbname="appletv";
    $con = new mysqli($hostname, $username, $password, $dbname);

    $timestamp = htmlspecialchars($_GET["timestamp"]);
    $uniqueId = htmlspecialchars($_GET["uniqueId"]);
    $type = htmlspecialchars($_GET["type"]);

    if ($type == 'session') {
        $duration = htmlspecialchars($_GET["duration"]);
        $recordSession = "
            INSERT INTO sessions (duration, timestamp, uniqueId)
            VALUES('${duration}', '${timestamp}', '${uniqueId}')
        ";
        $con->query($recordSession);
    } else if ($type == 'view') {
        $id = htmlspecialchars($_GET["id"]);
        $title = htmlspecialchars($_GET["title"]);
        $recordView = "
            INSERT INTO views (id, title, timestamp, uniqueId)
            VALUES(${id}, '${title}', '${timestamp}', '${uniqueId}')
        ";
        $con->query($recordView);
    }

    $con->close();
?> 
