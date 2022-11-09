<?php 

header("access-control-allow-origin: *");

// Multiple recipients
$senders = [
  'dvdayron@gmail.com', 
  'walter.humphreys@exclusivetravelerclub.com', 
  'miguel.acero@exclusivetravelerclub.com'
];

// Subject
$subject = 'Contact from vacacioneshello.com';

$flyType = $_POST['reservationMode'] === 'Vuelo + Hotel' ? '<p><b>Tipo de vuelo: </b>' . $_POST['flyType'] . '</p>' : '';

// Message
$message = '
<html>
<head>
  <title>Contact data</title>
</head>
<body>
  <p><b>Nombre: </b>' . $_POST['name'] . '</p>
  <p><b>Apellidos: </b>' . $_POST['lastName'] . '</p>
  <p><b>Correo: </b>' . $_POST['email'] . '</p>
  <p><b>Teléfono: </b>' . $_POST['phone'] . '</p>
  <p><b>Modo de reservación: </b>' . $_POST['reservationMode'] . '</p>
  ' . $flyType . '
  <p><b>Origen: </b>' . $_POST['origin'] . '</p>
  <p><b>Destino: </b>' . $_POST['destiny'] . '</p>
  <p><b>Fecha inicio: </b>' . $_POST['startDate'] . '</p>
  <p><b>Fecha fin: </b>' . $_POST['endDate'] . '</p>
  <p><b>Huéspedes: </b>' . $_POST['guests'] . '</p>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';
$headers[] = 'From: vacacioneshello <site@vacacioneshello.com>';

$textHeaders = implode("\r\n", $headers);

// Mail it
foreach($senders as $to) {
    mail($to, $subject, $message, $textHeaders);
}

echo true;
die;

?>