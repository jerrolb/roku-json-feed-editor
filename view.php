<?php
    $authToken = "rxiWSWuP1pRlaG7OGOJBlR6IsojGPejO5ERM2h1xsIHjuoYuNqh3Lpx1cSfrDoxR";
    $userToken = htmlspecialchars($_GET["token"]);

    if ($authToken != $userToken) {
        echo "Missing or invalid token";
        exit();
    }

    $hostname="107.180.51.242";
    $username="appletvclient";
    $password="D8NbH3XnyF4cx2P";
    $dbname="appletv";

    $queryViews = 'SELECT * FROM views';
    $querySessions = 'SELECT * FROM sessions ORDER BY session';
    $con = new mysqli($hostname, $username, $password, $dbname);
    $views = $con->query($queryViews);
    $sessions = $con->query($querySessions);

    function getUnique($id) {
        $simulator = "1B497671-3F20-4782-8E2B-89B7C7829145";
        $jerrol = "511B8D99-A98E-424A-B242-57AFE220B6E9";
        $monte = "61FC9AB4-6689-406B-8048-B56177DEF622";

        switch ($id) {
          case $simulator: return "Simulator";
          case $jerrol: return "Jerrol";
          case $monte: return "Monte";
          default: return $id;
        }
    }

    echo '<pre>';
    echo "<b>VIDEO VIEWS:</b> \n";

    while($row = mysqli_fetch_array($views)) {
        $user = getUnique($row[4]);
        echo "$row[1] <b>$row[2]</b> (Id: $row[0]) (UniqueID: $user)\n";
    }

    echo "\n<b>USER SESSIONS:</b> \n";

    while($row = mysqli_fetch_array($sessions)) {
        $user = getUnique($row[3]);
        echo "$row[0]: <b>$row[1]</b> ($row[2]) (UniqueID: $user)\n";
    }

    $views->close();
    $sessions->close();
    $con->close();
?> 
