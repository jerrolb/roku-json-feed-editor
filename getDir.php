<?php
    $authToken = "rxiWSWuP1pRlaG7OGOJBlR6IsojGPejO5ERM2h1xsIHjuoYuNqh3Lpx1cSfrDoxA";
    $userToken = htmlspecialchars($_GET["token"]);

    if ($authToken != $userToken) {
        echo "Missing or invalid token";
        exit();
    }

    $a = scandir("/home/q7d64m7wl4s0/public_html/stream", 1);
    $a = json_encode($a);
    print_r($a);
?> 