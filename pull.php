<?php

// Use in the “Post-Receive URLs” section of your GitHub repo.

if ( $_POST['payload'] ) {
$result = shell_exec( 'cd /var/www/html/proyectos/Super-Bravo-small/ && sudo git pull' );

echo $result;
}

?>

Pull requested 2
