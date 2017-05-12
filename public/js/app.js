var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);


jQuery('.room-title').text(room);

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    var momentTimestamp = message.timestamp;
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li')
	var timestampMoment = moment.utc(momentTimestamp);
	var localTimestamp = timestampMoment.local().format('h:mm a');
    console.log('new message: ' + message.text);

    $message.append('<p><strong>' + message.name + ' ' + localTimestamp + '</strong ></p > ');
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
		text: $message.val()
	});

	$message.val('');
});