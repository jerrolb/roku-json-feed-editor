<?php
    $authToken = "rxiWSWuP1pRlaG7OGOJBlR6IsojGPejO5ERM2h1xsIHjuoYuNqh3Lpx1cSfrDoxA";
    $userToken = htmlspecialchars($_POST["token"]);

    if ($authToken != $userToken) {
        echo "Missing or invalid token";
        exit();
    }

    $time = time();
    $feed = urldecode(htmlspecialchars($_POST["feed"]));

    copy("feed.json", "feed$time.json");

    $fsfeed = fopen("feed.json", "w");
    fwrite($fsfeed, $feed);
    fclose($fsfeed);
?>
