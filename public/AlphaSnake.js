function removeHTMLTag(str) {
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
	//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
	return str;
}
function sendMsg(name, content) {
	data={
		'name': name,
		'content': content,
		'robot': false,
	}
	socket.emit('chat message', data);
}
function onReceiveMsg(msg) {
	msg.name = removeHTMLTag(msg.name);
	msg.content = removeHTMLTag(msg.content);
	
	var t = '<div class="message_box">';
	t += '<div class="username">';
	if (msg.robot) t+= '<span class="label label-success">Robot</span> ';
	t += msg.name + ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	t += '</div>';
	t += '<div class="content">' + msg.content + '</div>';
	t += '</div>';
	var endSig = $('#messages').height() - $('#messagesContainer').height() + 110 < 0 || $("#messagesContainer").scrollTop() >= $('#messages').height() - 2 * $('#messagesContainer').height() + 110;
	$('#messages').append(t);
	if (endSig) $("#messagesContainer").animate({"scrollTop": $('#messages').height() - $('#messagesContainer').height() + 110}, 100);
}
function onReceiveInit(msg){
	var t = '<div class="message_box">';
	t += '<div class="username">';
	t += '<span class="label label-success">Init</span> ';
	t += ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	t += '</div>';
	t += '<div class="content">' + JSON.stringify(msg) + '</div>';
	t += '</div>';
	var endSig = $('#messages').height() - $('#messagesContainer').height() + 110 < 0 || $("#messagesContainer").scrollTop() >= $('#messages').height() - 2 * $('#messagesContainer').height() + 110;
	$('#messages').append(t);
	if (endSig) $("#messagesContainer").animate({"scrollTop": $('#messages').height() - $('#messagesContainer').height() + 110}, 100);
}
function onReceiveJudged(msg){
	var t = '<div class="message_box">';
	t += '<div class="username">';
	t += '<span class="label label-success">judge</span> ';
	t += ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	t += '</div>';
	t += '<div class="content">' + JSON.stringify(msg) + '</div>';
	t += '</div>';
	var endSig = $('#messages').height() - $('#messagesContainer').height() + 110 < 0 || $("#messagesContainer").scrollTop() >= $('#messages').height() - 2 * $('#messagesContainer').height() + 110;
	$('#messages').append(t);
	if (endSig) $("#messagesContainer").animate({"scrollTop": $('#messages').height() - $('#messagesContainer').height() + 110}, 100);
}
function onchangeEdit() {
	if ($('#nameContainer').hasClass('edit')) {
		$('#nameContainer').removeClass('edit');
		setName($('#nameEdit').val());
	} else {
		$('#nameContainer').addClass('edit')
	}
}
function init() {
	socket.on('chat message', onReceiveMsg);
	socket.on('init', onReceiveInit);
	socket.on('judged', onReceiveJudged);
	onReceiveMsg({
		'name': 'AlphaSnake Assistant',
		'content': 'Debug only',
		'robot': true,
	});
}

var name = undefined;
var socket = io();
init();
$('body > div').removeClass('inactive');


function success(pos) {
	var crd = pos.coords;
}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
}