var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	var momentTimestamp = message.timestamp;
	var timestampMoment = moment.utc(momentTimestamp);
	var localTimestamp = timestampMoment.local().format('h:mm a');
	console.log('new message: ' + message.text);
	jQuery('.messages').append('<p><strong>' + localTimestamp + ':</strong> ' + message.text + '</p>');
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});