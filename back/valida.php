<?php
// llamada de clases
require "gump.class.php"; // clase para validar campos
require 'phpmailer/PHPMailerAutoload.php'; // clase para envio de correo

$validator = new GUMP();
$mail      = new PHPMailer;


$_POST = $validator->sanitize($_POST); // You don't have to sanitize, but it's safest to do so.

// Reglas de validación
$rules = array(
	'name'     => 'required|max_len,100',
	'tel'      => 'required|max_len,100',
	'email'    => 'required|valid_email|max_len,100',
	'confirm-email'    => 'required|valid_email|max_len,100',
	'subject'  => 'required|max_len,500',
	'message'  => 'max_len,500'
);


// filtros 
$filters = array(
	'name' 	   => 'trim|sanitize_string',
	'email'    => 'trim|sanitize_email',	
	'message'  => 'trim|sanitize_string',
	'tel'      => 'trim|sanitize_string',
);


$_POST = $validator->filter($_POST, $filters);

$validated = $validator->validate($_POST, $rules);



// Check if validation was successful
if($validated === TRUE)
{
	// construimos el msg, a enviar por email
	$html = '
	<h2>Contacto totalcareautorepair.com</h2>
	<ul>
		<li>Name:     <strong>'.$_POST['name'].'</strong></li>
		<li>Phone:    <strong>'.$_POST['tel'].'</strong></li>
		<li>Email:    <strong>'.$_POST['email'].'</strong></li>
		<li>Subject:  <strong>'.$_POST['subject'].'</strong></li>
		<li>Message:  <strong>'.$_POST['message'].'</strong></li>
	</ul>
	<hr>
	<br>';


	$mail->setFrom($_POST['email'], $_POST['name']);

	$mail->addAddress('contact@totalcareautorepair.com');
	$mail->addAddress('yoana1563@Hotmail.com');

	$mail->Subject = 'Contacto Total Care';
	$mail->msgHTML($html);

	$mail->CharSet = 'UTF-8';
	
	if (!$mail->send()) {
	    echo "fallo";
	}else {

		echo "ok";
	}
	exit;
}
else
{	// si falla la validación, enviamos al cliente los errores
	echo $validator->get_readable_errors(true);	
}

