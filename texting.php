<?php
if ( isset( $_REQUEST ) && !empty( $_REQUEST ) ) {
	if (
		isset( $_REQUEST['phoneNumber'], $_REQUEST['carrier'], $_REQUEST['smsMessage'] ) &&
		!empty( $_REQUEST['phoneNumber'] ) &&
		!empty( $_REQUEST['carrier'] )
	) {
		$message = wordwrap( $_REQUEST['smsMessage'], 70 );
		$to = $_REQUEST['phoneNumber'] . '@' . $_REQUEST['carrier'];
		$result = @mail( $to, '', $message );
		print 'Message was sent to ' . $to;
	} else {
		print 'Not all information was submitted.';
	}
}
?>

<!DOCTYPE html>

<head profile="http://www.w3.org/2005/10/profile">

	<meta charset="utf-8" />

	<link rel="icon" 
	type="image/png" 
	href="./logo.png">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="./portfolio.js"></script>
	<link rel="stylesheet" href="./portfolio.css">
	<link rel="stylesheet" href="./texting.css">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Quicksand|Raleway" rel="stylesheet">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

	<meta content="width=device-width, initial-scale=1" name="viewport" />

	<title>Text Me - Anisa Anuar</title>

	<div id="texting">
		<h1>
			<a href="sms:12035071290;?&body=Hi Anisa, this is a test. How're you?">Text Anisa</a>
		</h1>
	</div>
	<div id="texting">
		<h1>
			<a href="sms:17184732220;?&body=Hi Mirai, how are you?">Text Mirai</a>
		</h1>
	</div>

	<div id="text-container">
		<h1>Sending SMS with PHP</h1>
		<form action="" method="post">
			<ul>
				<li>
					<label for="phoneNumber">Phone Number</label>
					<input type="text" name="phoneNumber" id="phoneNumber" placeholder="3855550168" /></li>
					<li>
						<label for="carrier">Carrier</label>
						<input type="text" name="carrier" id="carrier" />
					</li>
					<li>
						<label for="smsMessage">Message</label>
						<textarea name="smsMessage" id="smsMessage" cols="45" rows="15"></textarea>
					</li>
					<li><input type="submit" name="sendMessage" id="sendMessage" value="Send Message" /></li>
				</ul>
			</form>
		</div>

	</body>

</html>
