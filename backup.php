<?php

    $cadena = $_POST['cadena'];

    $fp = fopen("myarchivo.json","w+");
    fwrite($fp, $cadena);
    fclose($fp);
?>